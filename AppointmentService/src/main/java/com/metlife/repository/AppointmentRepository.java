package com.metlife.repository;

import com.metlife.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppointmentRepository extends JpaRepository<Appointment,Long> {
     Appointment findByAppointmentId(String appointmentId);

}
