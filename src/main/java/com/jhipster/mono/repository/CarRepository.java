package com.jhipster.mono.repository;

import java.util.List;

import com.jhipster.mono.domain.Car;

import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Spring Data MongoDB repository for the Car entity.
 */
@SuppressWarnings("unused")
public interface CarRepository extends MongoRepository<Car,String> {
	List<Car> findByUserid(String userid);
}
