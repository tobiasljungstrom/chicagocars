package com.chicagocars.services;

import com.chicagocars.domain.Car;
import com.chicagocars.respositories.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarService {

    @Autowired
    private CarRepository carRepository;

    public void saveCar(Car car) {
        carRepository.saveAndFlush(car);
    }

    public Car loadCar(Long id) {
        return carRepository.getOne(id);
    }

    public List<Car> loadAllCars() {
        return carRepository.findAll();
    }

    public void deleteCar(Long id) {
        carRepository.delete(id);
    }
}
