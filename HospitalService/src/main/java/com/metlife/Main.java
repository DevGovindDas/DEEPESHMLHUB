package com.metlife;


import com.metlife.service.HospitalService;
import com.metlife.service.HospitalServiceImpl;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class Main {
    public static void main(String[] args) {
        SpringApplication.run(Main.class);
    }
    @Bean
    HospitalService hospitalService(){
        return new HospitalServiceImpl();
    }
}