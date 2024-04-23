package com.metlife.service;

import com.metlife.dto.PatientDTO;
import com.metlife.entity.Patient;
import com.metlife.exceptions.PatientNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

public interface PatientService {
    public List<PatientDTO> getAllPatients();

    public PatientDTO getPatient(String id) throws PatientNotFoundException;
    public PatientDTO addPatient(Patient patient);
    public PatientDTO updatePatient(Patient patient) throws PatientNotFoundException;
    public void deletePatient(String id) throws PatientNotFoundException;

}
