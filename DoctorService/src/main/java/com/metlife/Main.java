package com.metlife;


import com.metlife.service.DoctorService;
import com.metlife.service.DoctorServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
@EnableDiscoveryClient
public class Main {
    public static void main(String[] args) {
        SpringApplication.run(Main.class);
    }


    @Bean
    DoctorService doctorService(){
        RestTemplate restTemplate=new RestTemplate();
        return new DoctorServiceImpl(restTemplate);
    }
}