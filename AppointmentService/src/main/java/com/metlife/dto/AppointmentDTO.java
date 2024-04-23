package com.metlife.dto;

import com.metlife.entity.Appointment;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
public class AppointmentDTO {
    private String appointmentId;
    private String patientId;
    private LocalDate date;
    private String doctorId;
    private int slotNumber;
    public AppointmentDTO(Appointment appointment){
        this.appointmentId=appointment.getAppointmentId();
        this.patientId=appointment.getPatientId();
        this.date=appointment.getDate();
        this.doctorId=appointment.getDoctorId();
        this.slotNumber=appointment.getSlotNumber();
    }
}
