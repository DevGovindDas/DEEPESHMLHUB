package com.metlife.dto;

import com.metlife.entity.User;
import lombok.Data;

@Data
public class UserDTO {
    private String name;
    private String userName;
    private String role;
    private boolean isLoggedIn;
    private String sessionId;
    private String errorMessage;
    public UserDTO(User user){
        this.name=user.getName();
        this.userName=user.getUserName();
        this.role=user.getRole();
        this.isLoggedIn=user.isLoggedIn();
        this.sessionId=user.getSessionId();
        this.errorMessage="";
    }
}
