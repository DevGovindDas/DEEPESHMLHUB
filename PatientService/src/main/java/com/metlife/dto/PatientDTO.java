package com.metlife.dto;

import com.metlife.entity.Patient;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class PatientDTO {
    private String patientId;

    private String name;

    private Long mobile;

    private String email;
    public PatientDTO(Patient patient){
        patientId=patient.getPatientId();
        name=patient.getName();
        mobile= patient.getMobile();
        email=patient.getEmail();
    }

}
