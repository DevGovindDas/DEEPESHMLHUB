package com.metlife.controller;

import com.metlife.entity.Appointment;
import com.metlife.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/appointment")
@CrossOrigin(origins = "http://localhost:4200")
public class AppointmentController {

    @Autowired
    public AppointmentRepository appointmentRepository;

    @GetMapping
    public List<Appointment> getAllAppointments(){
        return appointmentRepository.findAll();
    }

    @GetMapping("/{id}")
    public Appointment getAppointment(@PathVariable String id){
        return appointmentRepository.findByAppointmentId(id);
    }

    @PostMapping
    public Appointment addAppointment(@RequestBody Appointment appointment){
        return appointmentRepository.save(appointment);
    }

    @PutMapping
    public Appointment updateAppointment(@RequestBody Appointment appointment){
        Appointment appointment1=appointmentRepository.findByAppointmentId(appointment.getAppointmentId());
        appointment1.setPatientId(appointment.getPatientId());
        appointment1.setDoctorId(appointment.getDoctorId());
        appointment1.setDate(appointment.getDate());
        appointment1.setSlotNumber(appointment.getSlotNumber());

        appointmentRepository.save(appointment1);
        return appointment1;
    }

    @DeleteMapping("/{id}")
    public void deleteAppointment(@PathVariable String id){
       appointmentRepository.deleteById(appointmentRepository.findByAppointmentId(id).getId());
    }

}
