package com.metlife.controller;

import com.metlife.dto.PatientDTO;
import com.metlife.entity.Patient;
import com.metlife.exceptions.PatientNotFoundException;
import com.metlife.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("patient")
@CrossOrigin(origins = "http://localhost:4200")
public class PatientController {

    @Autowired
    PatientService patientService;

    @GetMapping
    public List<PatientDTO> getAllPatients(){
        return patientService.getAllPatients();
    }

    @GetMapping("/{id}")
    public PatientDTO getPatient(@PathVariable String id) throws PatientNotFoundException {
        return patientService.getPatient(id);
    }

    @PostMapping
    public PatientDTO addPatient(@RequestBody Patient patient){
        return patientService.addPatient(patient);
    }

    @PutMapping
    public PatientDTO updatePatient(@RequestBody Patient patient) throws PatientNotFoundException {

        return patientService.updatePatient(patient);
    }

    @DeleteMapping("/{id}")
    public void deletePatient(@PathVariable String id) throws PatientNotFoundException {
       patientService.deletePatient(id);
    }

}
