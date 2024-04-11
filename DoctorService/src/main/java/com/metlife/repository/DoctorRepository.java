package com.metlife.repository;

import com.metlife.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DoctorRepository extends JpaRepository<Doctor,Long> {
     Doctor findByDoctorId(String doctorId);
}
