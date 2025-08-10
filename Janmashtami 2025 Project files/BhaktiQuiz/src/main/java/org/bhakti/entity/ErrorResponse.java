package org.bhakti.entity;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ErrorResponse {
    private boolean matchStatus;
    private String message;


}
