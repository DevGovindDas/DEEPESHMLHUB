package com.metlife.controller;

import com.metlife.entity.Hospital;
import com.metlife.repository.HospitalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/hospital")
@CrossOrigin(origins ="http://localhost:4200")
public class HospitalController {

    @Autowired
    public HospitalRepository hospitalRepository;

    @GetMapping
    public List<Hospital> getAllHospitals(){
        return hospitalRepository.findAll();
    }

    @GetMapping("/{id}")
    public Hospital getHospital(@PathVariable String id){
        return hospitalRepository.findByHospitalId(id);
    }

    @PostMapping
    public Hospital addHospital(@RequestBody Hospital hospital){
        return hospitalRepository.save(hospital);
    }

    @PutMapping
    public Hospital updateHospital(@RequestBody Hospital hospital){
        System.out.println("I am in updateHospital()****************************");
        Hospital hospital1=hospitalRepository.findByHospitalId(hospital.getHospitalId());
        hospital1.setName(hospital.getName());
        hospital1.setAddress(hospital.getAddress());
        hospital1.setAdmitCapacity(hospital.getAdmitCapacity());
        hospitalRepository.save(hospital1);
        return hospital1;
    }

    @DeleteMapping("/{id}")
    public Hospital deleteHospital(@PathVariable String id){
        Hospital hospital=hospitalRepository.findByHospitalId(id);
        hospitalRepository.deleteById(hospital.getId());
        return hospital;
    }

}
