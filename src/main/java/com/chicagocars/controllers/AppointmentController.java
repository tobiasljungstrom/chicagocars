package com.chicagocars.controllers;

import com.chicagocars.domain.Appointment;
import com.chicagocars.services.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @CrossOrigin
    @RequestMapping(value = "/appointments/", method = RequestMethod.POST)
    public void createAppointment(@RequestBody Appointment appointment) {
        appointmentService.saveAppointment(appointment);
    }

    @CrossOrigin
    @RequestMapping(value = "/appointments/{id}", method = RequestMethod.GET)
    public ResponseEntity<Appointment> readAppointment(@PathVariable Long id) {
        return new ResponseEntity<Appointment>(appointmentService.loadAppointment(id), HttpStatus.OK);
    }

    @CrossOrigin
    @RequestMapping(value = "/appointments/all", method = RequestMethod.GET)
    public ResponseEntity<List<Appointment>> readAllAppointments() {
        return new ResponseEntity<List<Appointment>>(appointmentService.loadAllAppointments(), HttpStatus.OK);
    }

    @CrossOrigin
    @RequestMapping(value = "/appointments/{id}", method = RequestMethod.PUT)
    public void updateAppointment(@RequestBody Appointment appointment, @PathVariable Long id) {
        appointmentService.saveAppointment(appointment);
    }

    @CrossOrigin
    @RequestMapping(value = "/appointments/{id}", method = RequestMethod.DELETE)
    public void deleteAppointment(Long id) {
        appointmentService.deleteAppointment(id);
    }
}
