package com.metlife.controller;

import com.metlife.entity.Doctor;
import com.metlife.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class DoctorController {

    @Autowired
    public DoctorRepository doctorRepository;


    @GetMapping("doctor")
    public List<Doctor> getAllDoctors(){
        System.out.println("I reached getAllDoctors()********************");
        return doctorRepository.findAll();
    }

    @GetMapping("doctor/{id}")
    public Doctor getDoctor(@PathVariable String id){
        System.out.println("I reached GetById********************");
        return doctorRepository.findByDoctorId(id);
    }

    @PostMapping("doctor")
    public Doctor addDoctor(@RequestBody Doctor doctor){
        System.out.println("I reached addDoctor()********************");
        return doctorRepository.save(doctor);
    }

    @PutMapping("doctor")
    public Doctor updateDoctor(@RequestBody Doctor doctor){
        System.out.println("I reached UPDATE********************");
        Doctor doctor1=doctorRepository.findByDoctorId(doctor.getDoctorId());
        doctor1.setName(doctor.getName());
        doctor1.setEmail(doctor.getEmail());
        doctor1.setRating(doctor.getRating());
        doctor1.setMobile(doctor.getMobile());
        doctor1.setQualification(doctor.getQualification());
        doctor1.setSpeciality(doctor.getSpeciality());
        doctorRepository.save(doctor1);
        return doctor1;
    }

    @DeleteMapping("doctor/{id}")
    public Doctor deleteDoctor(@PathVariable String id){
        System.out.println("I reached DELETE********************");
       Doctor doctor=doctorRepository.findByDoctorId(id);
       doctorRepository.deleteById(doctor.getId());
       return doctor;
    }

}
