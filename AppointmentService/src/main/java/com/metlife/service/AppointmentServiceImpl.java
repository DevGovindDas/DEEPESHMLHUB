package com.metlife.service;
import com.metlife.dto.AppointmentDTO;
import com.metlife.entity.Appointment;
import com.metlife.exceptions.AppointmentNotFoundException;
import com.metlife.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

public class AppointmentServiceImpl implements AppointmentService{
    @Autowired
    public AppointmentRepository appointmentRepository;
    public List<AppointmentDTO> getAllAppointments(){
        return appointmentRepository.findAll().stream().map(AppointmentDTO::new).toList();
    }

    public AppointmentDTO getAppointment(String id) throws AppointmentNotFoundException {
        Appointment appointment=appointmentRepository.findByAppointmentId(id).orElseThrow(()->new AppointmentNotFoundException("Appointment with id "+id+" does not exist"));
        return new AppointmentDTO(appointment);
    }

    public AppointmentDTO addAppointment(Appointment appointment){
        return new AppointmentDTO(appointmentRepository.save(appointment));
    }

    public void deleteAppointment(String id) {
        appointmentRepository.deleteByAppointmentId(id);
    }

    public void deleteAppointmentByDoctorId(String doctorId){
        appointmentRepository.deleteByDoctorId(doctorId);
    }

    public void deleteAppointmentByPatientId(String patientId){
        appointmentRepository.deleteByPatientId(patientId);
    }
}
