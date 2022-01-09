package javaspring.demo.service.implementation;

import javaspring.demo.domain.entities.Car;
import javaspring.demo.domain.models.service.CarServiceModel;
import javaspring.demo.repository.CarRepository;
import javaspring.demo.service.CarService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedHashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CarServiceImpl implements CarService {

    private final CarRepository carRepository;

    private final ModelMapper modelMapper;

    @Autowired
    public CarServiceImpl(CarRepository carRepository, ModelMapper modelMapper){
        this.carRepository = carRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public boolean createCar(CarServiceModel carServiceModel) {
        Car carEntity = this.modelMapper.map(carServiceModel, Car.class);

        try{
            this.carRepository.save(carEntity);
        } catch (Exception exception){
            throw exception;
        }
        return true;
    }

    @Override
    public Set<CarServiceModel> getTop4CarsByViews() {
        return this.carRepository.findTop4ByOrderByViews()
                .stream()
                .map(x -> modelMapper.map(x, CarServiceModel.class))
                .collect(Collectors.toCollection(
                        LinkedHashSet::new
                ));
    }

    @Override
    public Set<CarServiceModel> allCars() {
        return this
                .carRepository
                .findAll()
                .stream()
                .map(x -> modelMapper
                .map(x, CarServiceModel.class))
                .collect(Collectors.toUnmodifiableSet());
    }

    @Override
    public CarServiceModel getCarById(String id) {
        Car carEntity = this.carRepository.findById(id).orElse(null);

        if (carEntity == null) return null;

        return this.modelMapper.map(carEntity, CarServiceModel.class);
    }

    @Override
    public void viewCar(String id){
        Car car = this.carRepository
                .findById(id)
                .orElse(null);

        if(car == null) return;

        car.setViews(car.getViews() + 1);

        this.carRepository.save(car);
    }
}
