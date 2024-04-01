package com.metlife;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;


@SpringBootApplication
@EnableFeignClients("com.metlife.proxy")
@EnableDiscoveryClient
public class App1 {
    public static void main(String[] args) {
        SpringApplication.run(App1.class);
    }
}
