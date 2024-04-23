package com.metlife.service;

import com.metlife.dto.AppointmentDTO;
import com.metlife.entity.Appointment;
import com.metlife.exceptions.AppointmentNotFoundException;

import java.util.List;

public interface AppointmentService {
    public List<AppointmentDTO> getAllAppointments();
    public AppointmentDTO getAppointment(String id) throws AppointmentNotFoundException;

    public AppointmentDTO addAppointment(Appointment appointment);


    public void deleteAppointment(String id) ;


    public void deleteAppointmentByDoctorId(String doctorId);


    public void deleteAppointmentByPatientId(String patientId);

}
