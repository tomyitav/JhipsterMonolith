package com.jhipster.mono.service;

import com.jhipster.mono.domain.Train;
import java.util.List;

/**
 * Service Interface for managing Train.
 */
public interface TrainService {

    /**
     * Save a train.
     *
     * @param train the entity to save
     * @return the persisted entity
     */
    Train save(Train train);

    /**
     *  Get all the trains.
     *  
     *  @return the list of entities
     */
    List<Train> findAll();

    /**
     *  Get the "id" train.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    Train findOne(String id);

    /**
     *  Delete the "id" train.
     *
     *  @param id the id of the entity
     */
    void delete(String id);
}
