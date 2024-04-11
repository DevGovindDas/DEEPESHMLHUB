package com.metlife.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column
    private String doctorId;

    @Column
    private String name;

    @Column
    private String qualification;

    @Column
    private float rating;

    @Column
    private String speciality;

    @Column
    private long mobile;

    @Column
    private String email;

    @Column
    private String hospitalId;

    @PrePersist
    public void generateDoctorId(){
        this.doctorId= "D"+String.format("%05d", this.id);
    }
}
