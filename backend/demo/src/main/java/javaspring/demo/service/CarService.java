package javaspring.demo.service;

import javaspring.demo.domain.models.service.CarServiceModel;
import org.springframework.stereotype.Service;

import java.util.Set;

public interface CarService {
    boolean createCar(CarServiceModel carServiceModel);

    Set<CarServiceModel> getTop4CarsByViews();

    Set<CarServiceModel> allCars();

    CarServiceModel getCarById(String id);
}
