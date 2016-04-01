package com.chicagocars.controllers;

import com.chicagocars.domain.Car;
import com.chicagocars.services.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CarController {

    @Autowired
    private CarService carService;

    @CrossOrigin
    @RequestMapping(value = "/cars/", method = RequestMethod.POST)
    public void createCar(@RequestBody Car car) {
        carService.saveCar(car);
    }

    @CrossOrigin
    @RequestMapping(value = "/cars/{id}", method = RequestMethod.GET)
    public ResponseEntity<Car> readCar(@PathVariable Long id) {
        return new ResponseEntity<Car>(carService.loadCar(id), HttpStatus.OK);
    }

    @CrossOrigin
    @RequestMapping(value = "/cars/all", method = RequestMethod.GET)
    public ResponseEntity<List<Car>> readAllCars() {
        return new ResponseEntity<List<Car>>(carService.loadAllCars(), HttpStatus.OK);
    }

    @CrossOrigin
    @RequestMapping(value = "/cars/{id}", method = RequestMethod.PUT)
    public void updateCar(@RequestBody Car car, @PathVariable Long id) {
        carService.saveCar(car);
    }

    @CrossOrigin
    @RequestMapping(value = "/cars/{id}", method = RequestMethod.DELETE)
    public void deleteCar(Long id) {
        carService.deleteCar(id);
    }

}
