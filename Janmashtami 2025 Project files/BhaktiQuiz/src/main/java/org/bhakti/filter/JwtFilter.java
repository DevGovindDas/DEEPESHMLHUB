package org.bhakti.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.benmanes.caffeine.cache.Cache;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.bhakti.util.JwtUtil;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@Component
public class JwtFilter implements HandlerInterceptor {

    private final JwtUtil jwtUtil;
    private final Cache<String, String> caffeineCache;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // Allow preflight OPTIONS requests
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
            return true;
        }

        // Get the Authorization header
        String authorizationHeader = request.getHeader("Authorization");
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            sendErrorResponse(response, "Missing or invalid Authorization header.");
            return false;
        }

        // Extract the token
        String token = authorizationHeader.substring(7); // Remove "Bearer " prefix
        String username = jwtUtil.extractUsername(token);

        // Validate the token
        if (username == null || !jwtUtil.validateToken(token, caffeineCache.getIfPresent(username))) {
            sendErrorResponse(response, "Token authentication failed or session expired. Please provide a valid token.");
            return false;
        }

        return true;
    }

    private void sendErrorResponse(HttpServletResponse response, String message) throws Exception {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json");

        Map<String, Object> errorResponse = new HashMap<>();
        errorResponse.put("matchStatus", "FAILURE");
        errorResponse.put("message", message);

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.writeValue(response.getOutputStream(), errorResponse);
    }
}