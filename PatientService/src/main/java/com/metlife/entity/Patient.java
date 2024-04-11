package com.metlife.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column
    private String patientId;

    @Column
    private String name;

    @Column
    private Long mobile;

    @Column
    private String email;


    @PrePersist
    public void generatePatientId(){
        this.patientId= "P"+String.format("%05d", this.id);
    }
}
