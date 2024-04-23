package com.metlife.service;

import com.metlife.dto.DoctorDTO;
import com.metlife.entity.Doctor;
import com.metlife.exceptions.DoctorNotFoundException;

import java.util.List;

public interface DoctorService {
    public DoctorDTO deleteDoctor(String id) throws DoctorNotFoundException;
    public void deleteDoctorByHospitalId(String hospitalId);
    public DoctorDTO updateDoctor(Doctor doctor) throws DoctorNotFoundException;
    public DoctorDTO addDoctor(Doctor doctor);
    public DoctorDTO getDoctor(String id) throws DoctorNotFoundException;
    public List<DoctorDTO> getAllDoctors();
}
