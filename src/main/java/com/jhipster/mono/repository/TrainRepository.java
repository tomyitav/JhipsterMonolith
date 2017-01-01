package com.jhipster.mono.repository;

import java.util.List;

import com.jhipster.mono.domain.Train;

import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Spring Data MongoDB repository for the Train entity.
 */
@SuppressWarnings("unused")
public interface TrainRepository extends MongoRepository<Train,String> {
	List<Train> findByUserid(String userid);
}
