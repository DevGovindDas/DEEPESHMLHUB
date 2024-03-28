package com.example.springclouddemouser.configuration;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
@NoArgsConstructor
@ConfigurationProperties("software-profile")
public class ConfigurationAll {
    @Getter
    @Setter
    private String subject1;
    @Getter
    @Setter
    private String subject2;
    @Getter
    @Setter
    private String subject3;
}
