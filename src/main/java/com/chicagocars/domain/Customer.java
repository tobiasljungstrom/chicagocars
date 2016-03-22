package com.chicagocars.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

@SuppressWarnings("serial")
@Entity
@Table(name = "customers")
public class Customer implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @OneToMany(mappedBy = "owner")
    private Set<Car> cars;

    @OneToMany(mappedBy = "customer")
    private Set<Appointment> appointments;

    public Customer() {
    }

    public Customer(String firstName, String lastName, Set<Car> cars, Set<Appointment> appointments) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.cars = cars;
        this.appointments = appointments;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Set<Car> getCars() {
        return cars;
    }

    public void setCars(Set<Car> cars) {
        this.cars = cars;
    }

    public Set<Appointment> getAppointments() {
        return appointments;
    }

    public void setAppointments(Set<Appointment> appointments) {
        this.appointments = appointments;
    }
}
