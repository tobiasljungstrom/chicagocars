package com.chicagocars.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@SuppressWarnings("serial")
@Entity
@Table(name = "customers")
public class Customer implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "email", nullable = false)
    private String email;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE}) //Creates an address when a Customer is created
    @JoinColumn(name = "address_id", nullable = false)
    private Address address;

    @OneToMany(mappedBy = "owner", cascade = CascadeType.REMOVE) //Removes all cars owned by customer when they are removed
    private Set<Car> cars;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.REMOVE) //Removes all appoinments related to customer when they are removed
    private Set<Appointment> appointments;

    public Customer() {
    }

    public Customer(String firstName, String lastName, String email, Address address) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.address = address;
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

    public List<String> getCars() {

        List<String> carNames = new ArrayList<String>();

        for (Car car : cars
                ) {
            carNames.add(car.toString());
        }

        return carNames;
    }

    public void setCars(Set<Car> cars) {
        this.cars = cars;
    }

    public List<String> getAppointments() {
        List<String> appointmentNames = new ArrayList<String>();

        for (Appointment appointment : appointments
                ) {
            appointmentNames.add(appointment.toString());
        }

        return appointmentNames;
    }

    public void setAppointments(Set<Appointment> appointments) {
        this.appointments = appointments;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address.toString();
    }

    public void setAddress(Address address) {
        this.address = address;
    }
}
