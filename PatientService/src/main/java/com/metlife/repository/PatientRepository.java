package com.metlife.repository;

import com.metlife.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PatientRepository extends JpaRepository<Patient,Long> {
     Optional<Patient> findByPatientId(String patientId);

}
