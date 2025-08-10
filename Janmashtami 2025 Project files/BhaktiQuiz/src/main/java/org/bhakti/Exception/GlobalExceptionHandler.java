package org.bhakti.Exception;

import org.bhakti.entity.ErrorResponse;
import org.bhakti.entity.LoginResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(PinNotSetException.class)
    public ResponseEntity<ErrorResponse> handlePinNotSetException(PinNotSetException ex) {
        ErrorResponse errorResponse = new ErrorResponse(false, ex.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InvalidUserNamePasswordException.class)
    public ResponseEntity<LoginResponse> handleInvalidUserNamePasswordException(InvalidUserNamePasswordException ex) {
        LoginResponse loginResponse = new LoginResponse("USER", ex.getMessage(), null);
        return new ResponseEntity<>(loginResponse, HttpStatus.ACCEPTED);
    }

    @ExceptionHandler(QuestionWithIdExistException.class)
    public ResponseEntity<ErrorResponse> handleQuestionWithIdExistException(QuestionWithIdExistException ex) {
        ErrorResponse errorResponse = new ErrorResponse(true, ex.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(IdDataInvalidException.class)
    public ResponseEntity<ErrorResponse> handleIdDataInvalidException(IdDataInvalidException ex) {
        ErrorResponse errorResponse = new ErrorResponse(true, ex.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(QuestionWithIdNotExistException.class)
    public ResponseEntity<ErrorResponse> handleQuestionWithIdNotExistException(QuestionWithIdNotExistException ex) {
        ErrorResponse errorResponse = new ErrorResponse(true, ex.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(SessionExpiredException.class)
    public ResponseEntity<ErrorResponse> handleSessionExpiredException(SessionExpiredException ex) {
        ErrorResponse errorResponse = new ErrorResponse(false, ex.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
    }
}