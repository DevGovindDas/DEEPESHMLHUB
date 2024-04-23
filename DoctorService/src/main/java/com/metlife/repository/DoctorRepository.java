package com.metlife.repository;

import com.metlife.entity.Doctor;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface DoctorRepository extends JpaRepository<Doctor,Long> {
     Optional<Doctor> findByDoctorId(String doctorId);

     List<Doctor> findByHospitalId(String hospitalId);

     @Modifying
     @Transactional
     @Query("DELETE FROM Doctor d WHERE d.hospitalId=:hospitalId")
     void deleteByHospitalId(String hospitalId);
}
