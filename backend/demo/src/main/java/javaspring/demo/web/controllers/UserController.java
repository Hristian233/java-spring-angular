package javaspring.demo.web.controllers;

import javaspring.demo.domain.models.binding.UserRegisterBindingModel;
import javaspring.demo.domain.models.service.UserServiceModel;
import javaspring.demo.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(value = "/users")
public class UserController {
    private final UserService userService;

    private final ModelMapper modelMapper;

    @Autowired
    public UserController(UserService userService, ModelMapper modelMapper) {
        this.userService = userService;
        this.modelMapper = modelMapper;
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody UserRegisterBindingModel userRegisterBindingModel) throws URISyntaxException {
        if(!userRegisterBindingModel.getPassword().equals(userRegisterBindingModel.getConfirmPassword())){
            return ResponseEntity.badRequest().body("Password mismatch");
        }

        boolean result = this.userService
                .createUser(this.modelMapper
                        .map(userRegisterBindingModel, UserServiceModel.class));

        return ResponseEntity.created(new URI("/users/register")).body(result);
    }
}
