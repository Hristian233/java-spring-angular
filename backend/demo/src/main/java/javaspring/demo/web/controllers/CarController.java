package javaspring.demo.web.controllers;

import javaspring.demo.domain.models.binding.CarCreateBindingModel;
import javaspring.demo.domain.models.service.CarServiceModel;
import javaspring.demo.domain.models.view.AllCarsCarViewModel;
import javaspring.demo.domain.models.view.CarDetailsViewModel;
import javaspring.demo.domain.models.view.TopCarsCarViewModel;
import javaspring.demo.service.CarService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.LinkedHashSet;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:8081")
@RequestMapping("/cars")
public class CarController {
    private final CarService carService;

    private final ModelMapper modelMapper;

    @Autowired
    public CarController(CarService carService, ModelMapper modelMapper){
        this.carService = carService;
        this.modelMapper = modelMapper;
    }

    @GetMapping(value = "/top", produces = "application/json")
    public Set<?> top4Cars() {
        return this
                .carService
                .getTop4CarsByViews()
                .stream()
                .map(x -> this.modelMapper.map(x, TopCarsCarViewModel.class))
                .collect(Collectors.toCollection(
                        LinkedHashSet::new
                ));
    }

    @GetMapping(value = "/all", produces = "application/json")
    public Set<AllCarsCarViewModel> allCars(){
        return this
                .carService
                .allCars()
                .stream()
                .map(x -> this.modelMapper.map(x, AllCarsCarViewModel.class))
                .collect(Collectors.toSet());
    }

    @GetMapping(value = "/cars/details", produces = "application/json")
    public CarDetailsViewModel carDetails(@RequestParam(name = "id") String id){
        return this.modelMapper.map(
                this.carService
                        .getCarById(id), CarDetailsViewModel.class);
    }

    @PostMapping("/create")
    public ResponseEntity createCar(@ModelAttribute CarCreateBindingModel carCreateBindingModel) throws URISyntaxException {
        boolean result = this.carService.createCar(
                this.modelMapper
                        .map(carCreateBindingModel, CarServiceModel.class));

        return ResponseEntity.created(new URI("/cars/create")).body(result);
    }
}


















