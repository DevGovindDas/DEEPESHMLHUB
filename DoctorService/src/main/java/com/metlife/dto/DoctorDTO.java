package com.metlife.dto;

import com.metlife.entity.Doctor;
import jakarta.persistence.Column;
import lombok.Data;

@Data
public class DoctorDTO {
    private String doctorId;
    private String name;
    private String qualification;
    private float rating;
    private String speciality;
    private long mobile;
    private String email;
    private String hospitalId;
    public DoctorDTO(Doctor doctor){
        this.doctorId=doctor.getDoctorId();
        this.name=doctor.getName();
        this.qualification=doctor.getQualification();
        this.rating= doctor.getRating();
        this.speciality=doctor.getSpeciality();
        this.mobile=doctor.getMobile();
        this.email=doctor.getEmail();
        this.hospitalId=doctor.getHospitalId();
    }

}
