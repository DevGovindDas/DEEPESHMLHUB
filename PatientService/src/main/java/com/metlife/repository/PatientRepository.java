package com.metlife.repository;

import com.metlife.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository extends JpaRepository<Patient,Long> {
     Patient findByPatientId(String patientId);
}
