package org.bhakti.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Base64;
import java.util.Date;
import javax.crypto.spec.SecretKeySpec;

@Component
public class JwtUtil {

    @Value("${jwtUtil.secret}")
    private String SECRET_KEY;

    private Key getSigningKey() {
        byte[] decodedKey = Base64.getDecoder().decode(SECRET_KEY);
        return new SecretKeySpec(decodedKey, SignatureAlgorithm.HS256.getJcaName());
    }

    public String generateToken(String username, String sessionId) {
        return Jwts.builder()
                .setSubject(username)
                .claim("sessionId", sessionId) // Add sessionId as a claim
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10 hours
                .signWith(getSigningKey())
                .compact();
    }

    public Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }

    public boolean validateToken(String token, String sessionIdFromRedis) {
        try {
            Claims claims = extractAllClaims(token);
            String sessionId = claims.get("sessionId", String.class);

            // Check if sessionId matches the one in Redis
            if (!sessionId.equals(sessionIdFromRedis)) {
                System.out.println("Session ID mismatch.");
                return false;
            }

            // Check expiration
            if (claims.getExpiration().before(new Date())) {
                System.out.println("Token has expired.");
                return false;
            }

            return true; // Token is valid
        } catch (Exception e) {
            System.out.println("Token validation error: " + e.getMessage());
            return false; // Token is invalid
        }
    }
}