package com.metlife.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
@AllArgsConstructor
public class ErrorDetails {
    private String errorMessage;
    private HttpStatus status;
    private Long timeStamp;
}
