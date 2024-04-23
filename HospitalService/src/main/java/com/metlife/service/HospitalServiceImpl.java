package com.metlife.service;

import com.metlife.dto.HospitalDTO;
import com.metlife.entity.Hospital;
import com.metlife.exceptions.HospitalNotFoundException;
import com.metlife.repository.HospitalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;

public class HospitalServiceImpl implements HospitalService {
    @Autowired
    public HospitalRepository hospitalRepository;


    private final RestTemplate restTemplate=new RestTemplate();
    public List<HospitalDTO> getAllHospitals(){
        return hospitalRepository.findAll().stream().map(HospitalDTO::new).toList();
    }
    public HospitalDTO getHospital(String id) throws HospitalNotFoundException {
        return new HospitalDTO(hospitalRepository.findByHospitalId(id).orElseThrow(()->new HospitalNotFoundException("Hospital with id "+id+" does not exist")));
    }

    public HospitalDTO addHospital(@RequestBody Hospital hospital){
        return new HospitalDTO(hospitalRepository.save(hospital));
    }

    public HospitalDTO updateHospital(Hospital hospital) throws HospitalNotFoundException {
        Hospital hospital1=hospitalRepository.findByHospitalId(hospital.getHospitalId()).orElseThrow(()->new HospitalNotFoundException("Hospital with id "+hospital.getHospitalId()+ " does not exist"));
        hospital1.setName(hospital.getName());
        hospital1.setAddress(hospital.getAddress());
        hospital1.setAdmitCapacity(hospital.getAdmitCapacity());
        return new HospitalDTO(hospitalRepository.save(hospital1));
    }

    @DeleteMapping("/{id}")
    public void deleteHospital(@PathVariable String id) throws HospitalNotFoundException {
        Hospital hospital=hospitalRepository.findByHospitalId(id).orElseThrow(()->new HospitalNotFoundException("Hospital with id "+id+" does not exist"));
        hospitalRepository.deleteById(hospital.getId());
        restTemplate.delete("http://localhost:8090/doctor/deleteByHospitalId/"+id);
    }
}
