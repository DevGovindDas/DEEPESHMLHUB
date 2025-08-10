package org.bhakti.controller;

import lombok.RequiredArgsConstructor;
import org.bhakti.Exception.InvalidUserNamePasswordException;
import org.bhakti.Exception.SessionExpiredException;
import org.bhakti.entity.Admin;
import org.bhakti.entity.LoginResponse;
import org.bhakti.repository.AdminRepository;
import org.bhakti.service.AuthService;
import org.bhakti.util.JwtUtil;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin")
public class AdminController {

    private final AuthService authService;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody Admin admin) throws InvalidUserNamePasswordException {
        // Use AuthService to authenticate and generate token
        String token = authService.authenticateAndGenerateToken(admin.getName(), admin.getPassword());
        return new LoginResponse("ADMIN", admin.getName(), token);
    }



    @PostMapping("/update")
    public Admin updateUser(@RequestBody Admin admin) {
        // Validate the session using the JWT token
        return authService.updateUser(admin);
    }

    @GetMapping("/getAll")
    public Iterable<Admin> getAllUsers(@RequestHeader("Authorization") String authHeader) throws SessionExpiredException {
        // Validate the session using the JWT token
        return authService.getAllUsers();
    }

    @GetMapping("/validateToken")
    public boolean validateToken(@RequestHeader("Authorization") String authHeader) {
        // Extract the token from the Authorization header
        String token = authHeader.replace("Bearer ", "");
        // Use JwtUtil to validate the token
        return authService.isTokenValid(token);
    }
}