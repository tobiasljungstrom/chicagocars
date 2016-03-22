package com.chicagocars.respositories;

import com.chicagocars.domain.Car;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarRepository extends JpaRepository<Car, Long>{
}
