package org.bhakti.entity;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponse {
    private String loginType;
    private String userName;
    private String token;
}
