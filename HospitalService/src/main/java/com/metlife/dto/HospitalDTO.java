package com.metlife.dto;

import com.metlife.entity.Hospital;
import jakarta.persistence.Column;
import lombok.Data;

@Data
public class HospitalDTO {

    private String hospitalId;


    private String name;


    private String address;


    private int admitCapacity;

    public HospitalDTO(Hospital hospital){
        this.hospitalId=hospital.getHospitalId();
        this.address=hospital.getAddress();
        this.name=hospital.getName();
        this.admitCapacity=hospital.getAdmitCapacity();
    }
}
