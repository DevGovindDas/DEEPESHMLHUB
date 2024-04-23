package com.metlife.repository;

import com.metlife.entity.Appointment;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface AppointmentRepository extends JpaRepository<Appointment,Long> {
     Optional<Appointment> findByAppointmentId(String appointmentId);
     @Modifying
     @Transactional
     @Query("DELETE FROM Appointment a where a.doctorId=:doctorId")
     void deleteByDoctorId(String doctorId);
     @Modifying
     @Transactional
     @Query("DELETE FROM Appointment a where a.patientId=:patientId")
     void deleteByPatientId(String patientId);
     @Modifying
     @Transactional
     @Query("DELETE FROM Appointment a where a.appointmentId=:appointmentId")
     void deleteByAppointmentId(String appointmentId);

}
