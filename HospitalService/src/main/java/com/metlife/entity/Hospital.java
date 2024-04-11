package com.metlife.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Hospital {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column
    private String hospitalId;

    @Column
    private String name;

    @Column
    private String address;

    @Column
    private int admitCapacity;

    @PrePersist
    public void generateDoctorId(){
        this.hospitalId= "H"+String.format("%05d", this.id);
    }
}
