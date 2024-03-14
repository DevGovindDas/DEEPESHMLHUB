package com.example.controller;

import com.example.configuration.ConfigurationAll;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ConfigurationController {
    @Autowired
    ConfigurationAll configurationAll;
    @GetMapping("/config")
    public ConfigurationAll getConfiguration(){
        return configurationAll;
    }
}
