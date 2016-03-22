package com.chicagocars.controllers;

import com.chicagocars.domain.Customer;
import com.chicagocars.services.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @RequestMapping(value = "/customers/", method = RequestMethod.POST)
    public void createCustomer(@RequestBody Customer customer) {
        customerService.saveCustomer(customer);
    }

    @RequestMapping(value = "/customers/{id}", method = RequestMethod.GET)
    public ResponseEntity<Customer> readCustomer(@PathVariable Long id) {
        return new ResponseEntity<Customer>(customerService.loadCustomer(id), HttpStatus.OK);
    }

    @RequestMapping(value = "/customers/all", method = RequestMethod.GET)
    public ResponseEntity<List<Customer>> readAllCustomers() {
        return new ResponseEntity<List<Customer>>(customerService.loadAllCustomers(), HttpStatus.OK);
    }

    @RequestMapping(value = "/customers/{id}", method = RequestMethod.PUT)
    public void updateCustomer(@RequestBody Customer customer, @PathVariable Long id) {
        customerService.saveCustomer(customer);
    }

    @RequestMapping(value = "/customers/{id}")
    public void deleteCustomer(Long id) {
        customerService.deleteCustomer(id);
    }

}
