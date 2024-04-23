package com.metlife.service;

import com.metlife.dto.DoctorDTO;
import com.metlife.entity.Doctor;
import com.metlife.exceptions.DoctorNotFoundException;
import com.metlife.repository.DoctorRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Transactional
public class DoctorServiceImpl implements DoctorService {
    @Autowired
    public DoctorRepository doctorRepository;

    private static final Logger LOGGER= LoggerFactory.getLogger(DoctorServiceImpl.class);

    private final RestTemplate restTemplate;

    public DoctorServiceImpl(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }


    public List<DoctorDTO> getAllDoctors(){
        LOGGER.info("**********getAllDoctors() invoked*********");
        List<Doctor> doctors= doctorRepository.findAll();
        List<DoctorDTO> doctorDTOList=new ArrayList<>();
        doctors.forEach(doctor -> doctorDTOList.add(new DoctorDTO(doctor)));
        return doctorDTOList;
    }


    public DoctorDTO getDoctor(String id)throws DoctorNotFoundException{
        LOGGER.info("**********getDoctor() invoked*********");
        Doctor doctor=doctorRepository.findByDoctorId(id).orElseThrow(()->  new DoctorNotFoundException("Doctor with id "+id+" does not exist"));
        return new DoctorDTO(doctor);
    }


    public DoctorDTO addDoctor(Doctor doctor){
        LOGGER.info("**********addDoctor() invoked*********");
        Doctor doctor1=doctorRepository.save(doctor);
        return new DoctorDTO(doctor1);
    }


    public DoctorDTO updateDoctor(Doctor doctor) throws DoctorNotFoundException {
        LOGGER.info("**********updateDoctor() invoked*********");
        Optional<Doctor> doctor1=doctorRepository.findByDoctorId(doctor.getDoctorId());
        doctor1.orElseThrow(()->new DoctorNotFoundException("Doctor with id "+doctor.getDoctorId()+" does not exist"));

        doctor1.get().setName(doctor.getName());
        doctor1.get().setEmail(doctor.getEmail());
        doctor1.get().setRating(doctor.getRating());
        doctor1.get().setMobile(doctor.getMobile());
        doctor1.get().setQualification(doctor.getQualification());
        doctor1.get().setSpeciality(doctor.getSpeciality());
        doctorRepository.save(doctor1.get());
        return new DoctorDTO(doctor1.get());
    }


    public DoctorDTO deleteDoctor(String id) throws DoctorNotFoundException {
        LOGGER.info("**********deleteDoctor() invoked*********");
        Optional<Doctor> doctor=doctorRepository.findByDoctorId(id);
        doctor.orElseThrow(()->new DoctorNotFoundException("Doctor with id "+id+" does not exist"));
        doctorRepository.deleteById(doctor.get().getId());
        restTemplate.delete("http://localhost:8076/appointment/deleteByDoctor/"+id);
        return new DoctorDTO(doctor.get());
    }

    public void deleteDoctorByHospitalId(String hospitalId){
        List<Doctor> doctors=doctorRepository.findByHospitalId(hospitalId);
        doctorRepository.deleteByHospitalId(hospitalId);
        for(Doctor doctor:doctors) {
            restTemplate.delete("http://localhost:8076/appointment/deleteByDoctor/"+doctor.getDoctorId());
        }
    }
}
