package com.chicagocars.services;

import com.chicagocars.domain.Customer;
import com.chicagocars.respositories.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    public void saveCustomer(Customer customer) {
        customerRepository.saveAndFlush(customer);
    }

    public Customer loadCustomer(Long id) {
        return customerRepository.getOne(id);
    }

    public List<Customer> loadAllCustomers() {
        return customerRepository.findAll();
    }

    public void deleteCustomer(Long id) {
        customerRepository.delete(id);
    }

}
