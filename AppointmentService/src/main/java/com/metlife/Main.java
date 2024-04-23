package com.metlife;


import com.metlife.service.AppointmentService;
import com.metlife.service.AppointmentServiceImpl;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class Main {
    public static void main(String[] args) {
        SpringApplication.run(Main.class);
    }
    @Bean
    AppointmentService appointmentService(){
        return new AppointmentServiceImpl();
    }
}