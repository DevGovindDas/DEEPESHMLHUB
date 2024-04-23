package com.metlife.service;

import com.metlife.dto.HospitalDTO;
import com.metlife.entity.Hospital;
import com.metlife.exceptions.HospitalNotFoundException;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface HospitalService {
    public List<HospitalDTO> getAllHospitals();
    public HospitalDTO getHospital(String id) throws HospitalNotFoundException ;
    public HospitalDTO addHospital(@RequestBody Hospital hospital);
    public HospitalDTO updateHospital(Hospital hospital) throws HospitalNotFoundException ;
    public void deleteHospital(@PathVariable String id) throws HospitalNotFoundException;
}
