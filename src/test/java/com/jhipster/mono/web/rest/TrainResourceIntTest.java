package com.jhipster.mono.web.rest;

import com.jhipster.mono.JhipstermonolithApp;

import com.jhipster.mono.domain.Train;
import com.jhipster.mono.repository.TrainRepository;
import com.jhipster.mono.service.TrainService;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import javax.inject.Inject;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the TrainResource REST controller.
 *
 * @see TrainResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipstermonolithApp.class)
public class TrainResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_SPEED = 1;
    private static final Integer UPDATED_SPEED = 2;

    private static final Boolean DEFAULT_DIESEL = false;
    private static final Boolean UPDATED_DIESEL = true;

    private static final String DEFAULT_USERID = "AAAAAAAAAA";
    private static final String UPDATED_USERID = "BBBBBBBBBB";

    private static final Double DEFAULT_LONGITUDE = 1D;
    private static final Double UPDATED_LONGITUDE = 2D;

    private static final Double DEFAULT_LATITUDE = 1D;
    private static final Double UPDATED_LATITUDE = 2D;

    @Inject
    private TrainRepository trainRepository;

    @Inject
    private TrainService trainService;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    private MockMvc restTrainMockMvc;

    private Train train;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        TrainResource trainResource = new TrainResource();
        ReflectionTestUtils.setField(trainResource, "trainService", trainService);
        this.restTrainMockMvc = MockMvcBuilders.standaloneSetup(trainResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Train createEntity() {
        Train train = new Train()
                .name(DEFAULT_NAME)
                .speed(DEFAULT_SPEED)
                .diesel(DEFAULT_DIESEL)
                .userid(DEFAULT_USERID)
                .longitude(DEFAULT_LONGITUDE)
                .latitude(DEFAULT_LATITUDE);
        return train;
    }

    @Before
    public void initTest() {
        trainRepository.deleteAll();
        train = createEntity();
    }

    @Test
    public void createTrain() throws Exception {
        int databaseSizeBeforeCreate = trainRepository.findAll().size();

        // Create the Train

        restTrainMockMvc.perform(post("/api/trains")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(train)))
            .andExpect(status().isCreated());

        // Validate the Train in the database
        List<Train> trainList = trainRepository.findAll();
        assertThat(trainList).hasSize(databaseSizeBeforeCreate + 1);
        Train testTrain = trainList.get(trainList.size() - 1);
        assertThat(testTrain.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testTrain.getSpeed()).isEqualTo(DEFAULT_SPEED);
        assertThat(testTrain.isDiesel()).isEqualTo(DEFAULT_DIESEL);
        assertThat(testTrain.getUserid()).isEqualTo(DEFAULT_USERID);
        assertThat(testTrain.getLongitude()).isEqualTo(DEFAULT_LONGITUDE);
        assertThat(testTrain.getLatitude()).isEqualTo(DEFAULT_LATITUDE);
    }

    @Test
    public void createTrainWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = trainRepository.findAll().size();

        // Create the Train with an existing ID
        Train existingTrain = new Train();
        existingTrain.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restTrainMockMvc.perform(post("/api/trains")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(existingTrain)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Train> trainList = trainRepository.findAll();
        assertThat(trainList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllTrains() throws Exception {
        // Initialize the database
        trainRepository.save(train);

        // Get all the trainList
        restTrainMockMvc.perform(get("/api/trains?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(train.getId())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].speed").value(hasItem(DEFAULT_SPEED)))
            .andExpect(jsonPath("$.[*].diesel").value(hasItem(DEFAULT_DIESEL.booleanValue())))
            .andExpect(jsonPath("$.[*].userid").value(hasItem(DEFAULT_USERID.toString())))
            .andExpect(jsonPath("$.[*].longitude").value(hasItem(DEFAULT_LONGITUDE.doubleValue())))
            .andExpect(jsonPath("$.[*].latitude").value(hasItem(DEFAULT_LATITUDE.doubleValue())));
    }

    @Test
    public void getTrain() throws Exception {
        // Initialize the database
        trainRepository.save(train);

        // Get the train
        restTrainMockMvc.perform(get("/api/trains/{id}", train.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(train.getId()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.speed").value(DEFAULT_SPEED))
            .andExpect(jsonPath("$.diesel").value(DEFAULT_DIESEL.booleanValue()))
            .andExpect(jsonPath("$.userid").value(DEFAULT_USERID.toString()))
            .andExpect(jsonPath("$.longitude").value(DEFAULT_LONGITUDE.doubleValue()))
            .andExpect(jsonPath("$.latitude").value(DEFAULT_LATITUDE.doubleValue()));
    }

    @Test
    public void getNonExistingTrain() throws Exception {
        // Get the train
        restTrainMockMvc.perform(get("/api/trains/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateTrain() throws Exception {
        // Initialize the database
        trainService.save(train);

        int databaseSizeBeforeUpdate = trainRepository.findAll().size();

        // Update the train
        Train updatedTrain = trainRepository.findOne(train.getId());
        updatedTrain
                .name(UPDATED_NAME)
                .speed(UPDATED_SPEED)
                .diesel(UPDATED_DIESEL)
                .userid(UPDATED_USERID)
                .longitude(UPDATED_LONGITUDE)
                .latitude(UPDATED_LATITUDE);

        restTrainMockMvc.perform(put("/api/trains")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTrain)))
            .andExpect(status().isOk());

        // Validate the Train in the database
        List<Train> trainList = trainRepository.findAll();
        assertThat(trainList).hasSize(databaseSizeBeforeUpdate);
        Train testTrain = trainList.get(trainList.size() - 1);
        assertThat(testTrain.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testTrain.getSpeed()).isEqualTo(UPDATED_SPEED);
        assertThat(testTrain.isDiesel()).isEqualTo(UPDATED_DIESEL);
        assertThat(testTrain.getUserid()).isEqualTo(UPDATED_USERID);
        assertThat(testTrain.getLongitude()).isEqualTo(UPDATED_LONGITUDE);
        assertThat(testTrain.getLatitude()).isEqualTo(UPDATED_LATITUDE);
    }

    @Test
    public void updateNonExistingTrain() throws Exception {
        int databaseSizeBeforeUpdate = trainRepository.findAll().size();

        // Create the Train

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTrainMockMvc.perform(put("/api/trains")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(train)))
            .andExpect(status().isCreated());

        // Validate the Train in the database
        List<Train> trainList = trainRepository.findAll();
        assertThat(trainList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    public void deleteTrain() throws Exception {
        // Initialize the database
        trainService.save(train);

        int databaseSizeBeforeDelete = trainRepository.findAll().size();

        // Get the train
        restTrainMockMvc.perform(delete("/api/trains/{id}", train.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Train> trainList = trainRepository.findAll();
        assertThat(trainList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
