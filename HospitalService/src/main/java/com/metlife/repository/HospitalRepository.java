package com.metlife.repository;

import com.metlife.entity.Hospital;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface HospitalRepository extends JpaRepository<Hospital,Long> {
     Optional<Hospital> findByHospitalId(String hospitalId);
}
