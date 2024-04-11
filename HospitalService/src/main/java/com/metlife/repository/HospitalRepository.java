package com.metlife.repository;

import com.metlife.entity.Hospital;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HospitalRepository extends JpaRepository<Hospital,Long> {
     Hospital findByHospitalId(String hospitalId);
}
