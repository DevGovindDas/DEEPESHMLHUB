package com.metlife.controller;

import com.metlife.dto.DoctorDTO;
import com.metlife.entity.Doctor;
import com.metlife.exceptions.DoctorNotFoundException;
import com.metlife.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class DoctorController{

    @Autowired
    private DoctorService doctorService;


    @GetMapping("doctor")
    public List<DoctorDTO> getAllDoctors(){
        return doctorService.getAllDoctors();
    }

    @GetMapping("doctor/{id}")
    public ResponseEntity<DoctorDTO> getDoctor(@PathVariable String id) throws DoctorNotFoundException {
        return ResponseEntity.ok().body(doctorService.getDoctor(id));
    }

    @PostMapping("doctor")
    public ResponseEntity<DoctorDTO> addDoctor(@RequestBody Doctor doctor){
        return ResponseEntity.ok().body(doctorService.addDoctor(doctor));
    }

    @PutMapping("doctor")
    public ResponseEntity<DoctorDTO> updateDoctor(@RequestBody Doctor doctor) throws DoctorNotFoundException {
        return ResponseEntity.ok().body(doctorService.updateDoctor(doctor));
    }

    @DeleteMapping("doctor/{id}")
    public ResponseEntity<DoctorDTO> deleteDoctor(@PathVariable String id) throws DoctorNotFoundException {
        return ResponseEntity.ok().body(doctorService.deleteDoctor(id));
    }

    @DeleteMapping("/deleteByHospitalId/{hospitalId}")
    public void deleteDoctorByHospitalId(@PathVariable String hospitalId){
        doctorService.deleteDoctorByHospitalId(hospitalId);
    }
}
