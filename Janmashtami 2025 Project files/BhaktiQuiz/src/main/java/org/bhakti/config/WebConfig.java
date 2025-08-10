package org.bhakti.config;

import lombok.RequiredArgsConstructor;
import org.bhakti.filter.JwtFilter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@RequiredArgsConstructor
@Configuration
public class WebConfig implements WebMvcConfigurer {

    private final JwtFilter jwtFilter;

    @Value("${bhakti.frontend.url}")
    private String FRONT_END_URL;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(jwtFilter)
                .addPathPatterns("/questions/**", "/quiz/getPin", "/quiz/resetPin", "/quiz/winInRange","/quiz/dispatchPrize/*", "/admin/create");
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5173",FRONT_END_URL) // Replace with your frontend's URL
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}