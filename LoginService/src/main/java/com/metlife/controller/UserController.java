package com.metlife.controller;

import com.metlife.dto.UserDTO;
import com.metlife.entity.User;
import com.metlife.exception.UserAlreadyExistsException;
import com.metlife.exception.UserNotFoundException;
import com.metlife.repository.UserRepository;
import com.metlife.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.UUID;

@RestController
@RequestMapping("authenticate")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
    @Autowired
    private LoginService loginService;

    @PostMapping("login")
    public ResponseEntity<UserDTO> login(@RequestBody User user) {
        return ResponseEntity.ok().body(loginService.login(user));
    }

    @GetMapping("logout/{userName}")
    public void logout(@PathVariable String userName) {
        loginService.logout(userName);
    }

    @PostMapping("addUser")
    public ResponseEntity<UserDTO> addUser(@RequestBody User user) throws UserAlreadyExistsException {
        return ResponseEntity.ok().body(loginService.addUser(user));
    }

    @GetMapping("isLoggedIn/{userName}/{sessionId}")
    public boolean isLoggedIn(@PathVariable String userName, @PathVariable String sessionId) throws UserNotFoundException {
        return loginService.isLoggedIn(userName,sessionId);
    }
}
