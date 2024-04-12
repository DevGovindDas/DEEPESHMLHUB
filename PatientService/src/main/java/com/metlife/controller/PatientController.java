package com.metlife.controller;

import com.metlife.entity.Patient;
import com.metlife.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("patient")
@CrossOrigin(origins = "http://localhost:4200")
public class PatientController {

    @Autowired
    public PatientRepository patientRepository;

    @GetMapping
    public List<Patient> getAllPatients(){
        return patientRepository.findAll();
    }

    @GetMapping("/{id}")
    public Patient getPatient(@PathVariable String id){
        return patientRepository.findByPatientId(id);
    }

    @PostMapping
    public Patient addPatient(@RequestBody Patient patient){
        return patientRepository.save(patient);
    }

    @PutMapping
    public Patient updatePatient(@RequestBody Patient patient){
        Patient patient1=patientRepository.findByPatientId(patient.getPatientId());
        patient1.setName(patient.getName());
        patient1.setEmail(patient.getEmail());
        patient1.setMobile(patient.getMobile());
        patientRepository.save(patient1);
        return patient1;
    }

    @DeleteMapping("/{id}")
    public void deletePatient(@PathVariable String id){
        Patient patient=patientRepository.findByPatientId(id);
        patientRepository.deleteById(patient.getId());
    }

}
