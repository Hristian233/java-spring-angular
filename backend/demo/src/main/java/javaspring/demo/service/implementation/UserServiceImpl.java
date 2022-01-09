package javaspring.demo.service.implementation;

import javaspring.demo.domain.entities.User;
import javaspring.demo.domain.entities.UserRole;
import javaspring.demo.domain.models.service.UserServiceModel;
import javaspring.demo.repository.RoleRepository;
import javaspring.demo.repository.UserRepository;
import javaspring.demo.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    private final ModelMapper modelMapper;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private final RoleRepository roleRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, ModelMapper modelMapper, BCryptPasswordEncoder bCryptPasswordEncoder, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.roleRepository = roleRepository;
    }

    private Set<UserRole> getAuthorities(String authority){
        Set<UserRole> userAuthorities = new HashSet<>();

        userAuthorities.add(this.roleRepository.getByAuthority(authority));

        return userAuthorities;
    }

    @Override
    public boolean createUser(UserServiceModel userServiceModel) {
        User userEntity = this.modelMapper.map(userServiceModel, User.class);

        userEntity.setPassword(this.bCryptPasswordEncoder.encode(
                userEntity.getPassword()
        ));

        if(this.userRepository.findAll().isEmpty()){
            userEntity.setAuthorities(this.getAuthorities("ADMIN"));
        } else {
            userEntity.setAuthorities(this.getAuthorities("USER"));
        }

        try{
            this.userRepository.save(userEntity);
        } catch (Exception e){
            throw e;
        }

        return true;
    }

    @Override
    public Set<UserServiceModel> getAll() {
        return this.userRepository
                .findAll()
                .stream()
                .map(x -> modelMapper
                .map(x, UserServiceModel.class))
                .collect(Collectors.toUnmodifiableSet());
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = this.userRepository.findByUsername(username).orElse(null);

        if(user == null) throw new UsernameNotFoundException("User not found");

        return (UserDetails) user;
    }
}
