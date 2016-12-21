package com.jhipster.mono.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Train.
 */

@Document(collection = "train")
public class Train implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("name")
    private String name;

    @Field("speed")
    private Integer speed;

    @Field("diesel")
    private Boolean diesel;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Train name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getSpeed() {
        return speed;
    }

    public Train speed(Integer speed) {
        this.speed = speed;
        return this;
    }

    public void setSpeed(Integer speed) {
        this.speed = speed;
    }

    public Boolean isDiesel() {
        return diesel;
    }

    public Train diesel(Boolean diesel) {
        this.diesel = diesel;
        return this;
    }

    public void setDiesel(Boolean diesel) {
        this.diesel = diesel;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Train train = (Train) o;
        if (train.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, train.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Train{" +
            "id=" + id +
            ", name='" + name + "'" +
            ", speed='" + speed + "'" +
            ", diesel='" + diesel + "'" +
            '}';
    }
}
