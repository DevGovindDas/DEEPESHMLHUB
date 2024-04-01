package com.metlife.exception;

import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus
public class CourseNotFoundException extends Exception{
    public CourseNotFoundException(String message){
        super(message);
    }
}
