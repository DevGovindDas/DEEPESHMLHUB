package com.metlife.controller;

import com.metlife.dto.AppointmentDTO;
import com.metlife.entity.Appointment;
import com.metlife.exceptions.AppointmentNotFoundException;
import com.metlife.repository.AppointmentRepository;
import com.metlife.service.AppointmentService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("appointment")
@CrossOrigin(origins = "http://localhost:4200")
public class AppointmentController {
    @Autowired
    private AppointmentService appointmentService;

    @GetMapping
    public List<AppointmentDTO> getAllAppointments(){
        return appointmentService.getAllAppointments();
    }

    @GetMapping("/{id}")
    public ResponseEntity<AppointmentDTO> getAppointment(@PathVariable String id) throws AppointmentNotFoundException {
        return ResponseEntity.ok().body(appointmentService.getAppointment(id));
    }

    @PostMapping
    public ResponseEntity<AppointmentDTO> addAppointment(@RequestBody Appointment appointment){
        return ResponseEntity.ok().body(appointmentService.addAppointment(appointment));
    }

    @DeleteMapping("/{id}")
    public void deleteAppointment(@PathVariable String id){
        appointmentService.deleteAppointment(id);
    }

    @DeleteMapping("/deleteByDoctor/{doctorId}")
    public void deleteAppointmentByDoctorId(@PathVariable String doctorId){
        appointmentService.deleteAppointmentByDoctorId(doctorId);
    }

    @DeleteMapping("/deleteByPatient/{patientId}")
    public void deleteAppointmentByPatientId(@PathVariable String patientId){
        appointmentService.deleteAppointmentByPatientId(patientId);
    }

}
