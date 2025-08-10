package org.bhakti.config;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CacheConfig {

    @Bean
    public Cache<String, String> caffeineCache() {
        return Caffeine.newBuilder()
                .maximumSize(1000) // Set max size
                .build();
    }
}