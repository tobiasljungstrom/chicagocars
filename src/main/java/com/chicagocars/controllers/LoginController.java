package com.chicagocars.controllers;

import com.chicagocars.domain.Verification;
import com.chicagocars.domain.VerificationRequest;
import com.chicagocars.services.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class LoginController {

    @Autowired
    private LoginService loginService;

    @CrossOrigin
    @RequestMapping(value = "/login/", method = RequestMethod.POST)
    public void verify (@RequestBody VerificationRequest verificationRequest) {
        loginService.verify(verificationRequest);
    }

    @CrossOrigin
    @RequestMapping(value = "/login/", method = RequestMethod.GET)
    public ResponseEntity<Verification> getCurrentUser () {
        return new ResponseEntity<Verification>(loginService.getCurrentUser(), HttpStatus.OK);
    }
}
