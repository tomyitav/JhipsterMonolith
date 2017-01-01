package com.jhipster.mono.service.impl;

import com.jhipster.mono.security.SecurityUtils;
import com.jhipster.mono.service.TrainService;
import com.jhipster.mono.domain.Car;
import com.jhipster.mono.domain.Train;
import com.jhipster.mono.repository.TrainRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.inject.Inject;

import java.util.List;

/**
 * Service Implementation for managing Train.
 */
@Service
public class TrainServiceImpl implements TrainService{

    private final Logger log = LoggerFactory.getLogger(TrainServiceImpl.class);
    
    @Inject
    private TrainRepository trainRepository;

    /**
     * Save a train.
     *
     * @param train the entity to save
     * @return the persisted entity
     */
    public Train save(Train train) {
        log.debug("Request to save Train : {}", train);
        Train result = trainRepository.save(train);
        return result;
    }

    /**
     *  Get all the trains.
     *  
     *  @return the list of entities
     */
    public List<Train> findAll() {
        log.debug("Request to get all Trains");
        String currentUser = SecurityUtils.getCurrentUserLogin();
        List<Train> result;
        if(currentUser.equals("admin")) {
        	return trainRepository.findAll();
        }
        
        result = trainRepository.findByUserid(currentUser);
        return result;
    }

    /**
     *  Get one train by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    public Train findOne(String id) {
        log.debug("Request to get Train : {}", id);
        Train train = trainRepository.findOne(id);
        return train;
    }

    /**
     *  Delete the  train by id.
     *
     *  @param id the id of the entity
     */
    public void delete(String id) {
        log.debug("Request to delete Train : {}", id);
        trainRepository.delete(id);
    }
}
