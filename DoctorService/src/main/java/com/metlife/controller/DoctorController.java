package com.metlife.controller;

import com.metlife.entity.Doctor;
import com.metlife.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.print.Doc;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/doctor")
public class DoctorController {

    @Autowired
    public DoctorRepository doctorRepository;

    @GetMapping
    public List<Doctor> getAllDoctors(){
        return doctorRepository.findAll();
    }

    @GetMapping("/{id}")
    public Doctor getDoctor(@PathVariable String id){
        return doctorRepository.findByDoctorId(id);
    }

    @PostMapping
    public Doctor addDoctor(@RequestBody Doctor doctor){
        return doctorRepository.save(doctor);
    }

    @PutMapping
    public Doctor updateDoctor(@RequestBody Doctor doctor){
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

    @DeleteMapping("/{id}")
    public void deleteDoctor(@PathVariable String id){
       Doctor doctor=doctorRepository.findByDoctorId(id);
       doctorRepository.deleteById(doctor.getId());
    }

}
