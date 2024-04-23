package com.metlife;


import com.metlife.service.PatientService;
import com.metlife.service.PatientServiceImpl;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
public class Main {
    public static void main(String[] args) {
        SpringApplication.run(Main.class);
    }
    @Bean
    PatientService patientService(){
        RestTemplate restTemplate=new RestTemplate();
        return new PatientServiceImpl(restTemplate);
    }
}