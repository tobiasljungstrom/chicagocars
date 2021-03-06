package com.chicagocars.services;

import com.chicagocars.domain.Customer;
import com.chicagocars.domain.VerificationResponse;
import com.chicagocars.domain.VerificationRequest;
import com.chicagocars.respositories.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpSession;
import java.util.List;

@Service
public class LoginService {

    @Autowired
    private CustomerRepository customerRepository;

    public final String ADMIN_NAME = "admin";
    public final String ADMIN_PASSWORD = "galaxy";

    public HttpSession session;

    public void verify(VerificationRequest verificationRequest) {

        VerificationResponse verificationResponseResult = new VerificationResponse();
        session = getSessionObject();

        String currentPassword = verificationRequest.getPassword();
        String currentUsername = verificationRequest.getUsername();

        System.out.println("Recieved: " + currentUsername + " + " + currentPassword);

        if (currentUsername.equals(ADMIN_NAME) && currentPassword.equals(ADMIN_PASSWORD)) {
            verificationResponseResult.setUserId(-1);
        } else {
            long userId = findUserId(currentUsername);
            verificationResponseResult.setUserId(userId);
        }

        session.setAttribute("user", verificationResponseResult);
        System.out.println("Set user to: " + session.getAttribute("user").toString());
    }

    private long findUserId(String username) {
        System.out.println("Looking for " + username);
        List<Customer> customers = customerRepository.findAll();

        for (Customer customer :
                customers) {
            if (customer.getEmail().equals(username)) {
                System.out.println("Match!");
                return customer.getId();
            }
        }
        return 0;
    }

    private HttpSession getSessionObject () {
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        return attributes.getRequest().getSession(true);
    }

    public VerificationResponse getCurrentUser() {

        System.out.println("Returning: " + session.getAttribute("user").toString());
        return (VerificationResponse) session.getAttribute("user");
    }
}
