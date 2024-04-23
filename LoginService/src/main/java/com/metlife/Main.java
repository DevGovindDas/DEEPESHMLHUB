package com.metlife;

import com.metlife.service.LoginService;
import com.metlife.service.LoginServiceImpl;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class Main {
    public static void main(String[] args) {
        SpringApplication.run(Main.class);
    }
    @Bean
    LoginService loginService(){
        return new LoginServiceImpl();
    }
}