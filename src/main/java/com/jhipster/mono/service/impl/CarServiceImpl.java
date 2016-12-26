package com.jhipster.mono.service.impl;

import com.jhipster.mono.security.SecurityUtils;
import com.jhipster.mono.service.CarService;
import com.jhipster.mono.domain.Car;
import com.jhipster.mono.repository.CarRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.inject.Inject;

import java.util.List;

/**
 * Service Implementation for managing Car.
 */
@Service
public class CarServiceImpl implements CarService{

    private final Logger log = LoggerFactory.getLogger(CarServiceImpl.class);
    
    @Inject
    private CarRepository carRepository;

    /**
     * Save a car.
     *
     * @param car the entity to save
     * @return the persisted entity
     */
    public Car save(Car car) {
        log.debug("Request to save Car : {}", car);
        Car result = carRepository.save(car);
        return result;
    }

    /**
     *  Get all the cars.
     *  
     *  @return the list of entities
     */
    public List<Car> findAll() {
        log.debug("Request to get all Cars");
//        List<Car> result = carRepository.findAll();
        String currentUser = SecurityUtils.getCurrentUserLogin();
        List<Car> result = carRepository.findByUserid(currentUser);

        return result;
    }

    /**
     *  Get one car by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    public Car findOne(String id) {
        log.debug("Request to get Car : {}", id);
        Car car = carRepository.findOne(id);
        return car;
    }

    /**
     *  Delete the  car by id.
     *
     *  @param id the id of the entity
     */
    public void delete(String id) {
        log.debug("Request to delete Car : {}", id);
        carRepository.delete(id);
    }
}
