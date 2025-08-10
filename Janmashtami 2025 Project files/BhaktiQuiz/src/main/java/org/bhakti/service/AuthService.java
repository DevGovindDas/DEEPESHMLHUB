package org.bhakti.service;

import com.github.benmanes.caffeine.cache.Cache;
import lombok.RequiredArgsConstructor;
import org.bhakti.Exception.InvalidUserNamePasswordException;
import org.bhakti.entity.Admin;
import org.bhakti.repository.AdminRepository;
import org.bhakti.util.JwtUtil;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AdminRepository adminRepository;
    private final JwtUtil jwtUtil;
    private final Cache<String, String> caffeineCache;

    public String authenticateAndGenerateToken(String username, String password) throws InvalidUserNamePasswordException {
        // Verify username and password
        Admin admin = adminRepository.findByNameAndPassword(username, password)
                .orElseThrow(() -> new InvalidUserNamePasswordException(username));

        // Generate session ID
        String sessionId = UUID.randomUUID().toString();

        // Generate JWT token
        String token = jwtUtil.generateToken(admin.getName(), sessionId);

        // Save session ID in the Caffeine cache
        caffeineCache.put(admin.getName(), sessionId);

        return token;
    }

    public String getSession(String username) {
        return caffeineCache.getIfPresent(username);
    }
    public Admin updateUser(Admin admin) {
        Admin admin1=adminRepository.findByName(admin.getName()).orElseGet(null);
        if (admin1!=null){
            admin.setId(admin1.getId());
        }
        return adminRepository.save(admin);
    }

    public Iterable<Admin> getAllUsers() {
        // Retrieve all users from the repository
        return adminRepository.findAll().stream().map(user-> {
            user.setPassword(null); // Clear password before returning
            return user;
        }).toList();
    }

    public boolean isTokenValid(String token) {
        try {
            // Use JwtUtil to validate the token
            return jwtUtil.validateToken(token, caffeineCache.getIfPresent(jwtUtil.extractUsername(token)));
        } catch (Exception e) {
            return false; // Return false if the token is invalid
        }
    }
}