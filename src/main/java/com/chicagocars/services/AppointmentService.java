package com.chicagocars.services;

import com.chicagocars.domain.Appointment;
import com.chicagocars.respositories.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    public void saveAppointment(Appointment appointment) {
        appointmentRepository.saveAndFlush(appointment);
    }

    public Appointment loadAppointment(Long id) {
        return appointmentRepository.getOne(id);
    }

    public List<Appointment> loadAllAppointments() {
        return appointmentRepository.findAll();
    }

    public void deleteAppointment(Long id) {
        appointmentRepository.delete(id);
    }
}
