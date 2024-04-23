package com.metlife.exceptionhandler;

import com.metlife.dto.ErrorDetails;
import com.metlife.exceptions.ReviewNotFoundException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.Instant;

@ControllerAdvice
public class CustomExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(ReviewNotFoundException.class)
    public final ResponseEntity<Object> handleDoctorNotFoundException(ReviewNotFoundException ex){
        ErrorDetails errorDetails=new ErrorDetails(ex.getMessage(), HttpStatus.NOT_FOUND, Instant.now().getEpochSecond());
        return new ResponseEntity<>(errorDetails,HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(Exception.class)
    public final ResponseEntity<Object> handleAllExceptions(Exception ex){
        ErrorDetails errorDetails=new ErrorDetails(ex.getMessage(), HttpStatus.NOT_FOUND, Instant.now().getEpochSecond());
        return new ResponseEntity<>(errorDetails,HttpStatus.NOT_FOUND);
    }

    @Override
    protected ResponseEntity<Object> handleExceptionInternal(Exception ex, Object body, HttpHeaders headers, HttpStatusCode statusCode, WebRequest request) {
        ErrorDetails errorDetails=new ErrorDetails("Internal Server Error",HttpStatus.INTERNAL_SERVER_ERROR,Instant.now().getEpochSecond());
        return new ResponseEntity<>(errorDetails,HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
