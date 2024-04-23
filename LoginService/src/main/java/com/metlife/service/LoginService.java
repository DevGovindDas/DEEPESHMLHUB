package com.metlife.service;

import com.metlife.dto.UserDTO;
import com.metlife.entity.User;
import com.metlife.exception.UserAlreadyExistsException;
import com.metlife.exception.UserNotFoundException;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

public interface LoginService {
    public UserDTO login(User user);


    public void logout(String userName);


    public UserDTO addUser(User user) throws UserAlreadyExistsException;


    public boolean isLoggedIn(String userName,String sessionId) throws UserNotFoundException;
}
