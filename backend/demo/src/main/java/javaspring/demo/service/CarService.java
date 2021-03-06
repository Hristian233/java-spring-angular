package javaspring.demo.service;

import javaspring.demo.domain.models.service.CarServiceModel;

import java.util.Set;

public interface CarService {
    boolean createCar(CarServiceModel carServiceModel);

    Set<CarServiceModel> getTop4CarsByViews();

    Set<CarServiceModel> allCars();

    CarServiceModel getCarById(String id);

    void viewCar(String id);
}
