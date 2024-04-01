package com.metlife.exceptions;

import org.apache.catalina.User;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus
public class AuthorNotFoundException extends Exception{
    public AuthorNotFoundException(String message){
        super(message);
    }
}
