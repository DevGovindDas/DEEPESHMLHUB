package com.metlife.controller;

import com.metlife.dto.HospitalDTO;
import com.metlife.entity.Hospital;
import com.metlife.exceptions.HospitalNotFoundException;
import com.metlife.repository.HospitalRepository;
import com.metlife.service.HospitalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@RestController
@RequestMapping("/hospital")
@CrossOrigin(origins ="http://localhost:4200")
public class HospitalController {

    @Autowired
    private HospitalService hospitalService;


    private final RestTemplate restTemplate=new RestTemplate();

    @GetMapping
    public List<HospitalDTO> getAllHospitals(){
        return hospitalService.getAllHospitals();
    }

    @GetMapping("/{id}")
    public ResponseEntity<HospitalDTO> getHospital(@PathVariable String id) throws HospitalNotFoundException {
        return ResponseEntity.ok().body(hospitalService.getHospital(id));
    }

    @PostMapping
    public ResponseEntity<HospitalDTO> addHospital(@RequestBody Hospital hospital){
        return ResponseEntity.ok().body(hospitalService.addHospital(hospital));
    }

    @PutMapping
    public ResponseEntity<HospitalDTO> updateHospital(@RequestBody Hospital hospital) throws HospitalNotFoundException {
        return ResponseEntity.ok().body(hospitalService.updateHospital(hospital));

    }

    @DeleteMapping("/{id}")
    public void deleteHospital(@PathVariable String id) throws HospitalNotFoundException {
        hospitalService.deleteHospital(id);
    }

}
