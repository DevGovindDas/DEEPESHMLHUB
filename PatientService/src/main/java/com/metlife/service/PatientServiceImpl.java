package com.metlife.service;

import com.metlife.dto.PatientDTO;
import com.metlife.entity.Patient;
import com.metlife.exceptions.PatientNotFoundException;
import com.metlife.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;

public class PatientServiceImpl implements PatientService{
    @Autowired
    private PatientRepository patientRepository;

    private final RestTemplate restTemplate;

    public PatientServiceImpl(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public List<PatientDTO> getAllPatients(){
        return patientRepository.findAll().stream().map(PatientDTO::new).toList();
    }

    public PatientDTO getPatient(String id) throws PatientNotFoundException {
        return new PatientDTO(patientRepository.findByPatientId(id).orElseThrow(()->new PatientNotFoundException("PatientDoes not exist")));
    }
    public PatientDTO addPatient(Patient patient){
        return new PatientDTO(patientRepository.save(patient));
    }

    public PatientDTO updatePatient(Patient patient) throws PatientNotFoundException {
        Patient patient1=patientRepository.findByPatientId(patient.getPatientId()).orElseThrow(()->new PatientNotFoundException("Patient does not exist"));
        patient1.setName(patient.getName());
        patient1.setEmail(patient.getEmail());
        patient1.setMobile(patient.getMobile());
        patientRepository.save(patient1);
        return new PatientDTO(patient1);
    }
    public void deletePatient(String id) throws PatientNotFoundException {
        Patient patient=patientRepository.findByPatientId(id).orElseThrow(()->new PatientNotFoundException("Patient does not exist"));
        patientRepository.deleteById(patient.getId());
        restTemplate.delete("http://localhost:8076/appointment/deleteByPatient/"+patient.getId());
    }

}
