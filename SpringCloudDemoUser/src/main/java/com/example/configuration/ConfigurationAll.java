package com.example.configuration;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties("software-profile")
public class ConfigurationAll {
    @Getter
    @Setter
    private String Subject1;
    @Getter
    @Setter
    private String Subject2;
    @Getter
    @Setter
    private String Subject3;
}
