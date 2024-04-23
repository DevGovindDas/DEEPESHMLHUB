package com.metlife.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;


public class DoctorNotFoundException extends Exception{
    public DoctorNotFoundException(String message) {
        super(message);
    }
}
