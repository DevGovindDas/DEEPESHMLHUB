package com.metlife.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column
    private String appointmentId;

    @Column
    private String patientId;

    @Column
    private LocalDate date;

    @Column
    private String doctorId;

    @Column
    private int slotNumber;

    @PrePersist
    public void generateAppointmentId(){
        this.appointmentId= "A"+String.format("%05d", this.id);
    }
}
