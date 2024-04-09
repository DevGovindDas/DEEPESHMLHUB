import { Injectable } from '@angular/core';
import {
  Appointment,
  Doctor,
  Hospital,
  Patient,
  Slot,
} from 'src/model/BHCS.model';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  constructor() {}
  doctors: Doctor[] = [
    {
      doctorId: 'D00001',
      name: 'doctor1',
      qualification: 'qual1',
      rating: 3,
      speciality: 'Heart',
      mobile: 8955405625,
      email: 'abc@xyz.com',
      hospitalId: 'H00001',
    },
    {
      doctorId: 'D00002',
      name: 'doctor2',
      qualification: 'qual2',
      rating: 4,
      speciality: 'Kidney',
      mobile: 8955405624,
      email: 'abc1@xyz.com',
      hospitalId: 'H00002',
    },
  ];

  getSearchedDoctors(): Doctor[] {
    return this.doctors;
  }

  addDoctor(doctor: Doctor): Doctor {
    console.log(doctor, 'Inside addDoctor');
    doctor.doctorId = String(Date.now());
    doctor.rating = 0;
    this.doctors = [...this.doctors, doctor];
    console.log(this.doctors, 'All Doctors Inside addDoctor');
    return doctor;
  }
  updateDoctor(doctor: Doctor): string {
    const result = this.doctors.filter(
      (doctor1) => doctor.doctorId === doctor1.doctorId
    )[0];
    if (result === null) return 'doctor with this id does not exist';
    this.doctors = this.doctors.map((doctor1) =>
      doctor1.doctorId === doctor.doctorId ? doctor : doctor1
    );
    return 'updated succesfully';
  }

  deleteDoctor(id?: string): string {
    const result = this.doctors.filter((doctor1) => id === doctor1.doctorId)[0];
    if (result === null) return 'doctor with this id does not exist';
    this.doctors = this.doctors.filter((doctor1) => doctor1.doctorId !== id);
    return 'deleted succesfully';
  }
  searchDoctor(key: string): Doctor[] {
    return this.doctors.filter(
      (doc) =>
        doc.doctorId
          ?.toLocaleString()
          .toLocaleLowerCase()
          .includes(key.toLocaleLowerCase()) ||
        doc.name
          ?.toLocaleString()
          .toLocaleLowerCase()
          .includes(key.toLocaleLowerCase()) ||
        doc.mobile
          ?.toLocaleString()
          .toLocaleLowerCase()
          .includes(key.toLocaleLowerCase()) ||
        doc.speciality
          ?.toLocaleString()
          .toLocaleLowerCase()
          .includes(key.toLocaleLowerCase()) ||
        doc.qualification
          ?.toLocaleString()
          .toLocaleLowerCase()
          .includes(key.toLocaleLowerCase())
    );
  }
}

@Injectable({
  providedIn: 'root',
})
export class HospitalService {
  constructor() {}
  hospitals: Hospital[] = [
    {
      hospitalId: 'H00001',
      name: 'Hospital1',
      address: 'Jaipur',
      admitCapacity: 55,
    },
    {
      hospitalId: 'H00002',
      name: 'Hospital2',
      address: 'Jaipur',
      admitCapacity: 66,
    },
  ];

  getAllHospitals(): Hospital[] {
    return this.hospitals;
  }

  addHospital(hospital: Hospital): Hospital {
    hospital.hospitalId = String(Date.now());
    this.hospitals = [...this.hospitals, hospital];
    return hospital;
  }
  updateHospital(hospital: Hospital): string {
    const result = this.hospitals.filter(
      (hospital1) => hospital.hospitalId === hospital1.hospitalId
    )[0];
    if (result === null) return 'hospital with this id does not exist';
    this.hospitals = this.hospitals.map((hospital1) =>
      hospital1.hospitalId === hospital.hospitalId ? hospital : hospital1
    );
    console.log(result, 'Searched Value');
    return 'updated succesfully';
  }

  deleteHospital(id?: string): string {
    const result = this.hospitals.filter(
      (hospital1) => id === hospital1.hospitalId
    )[0];
    if (result === null) return 'doctor with this id does not exist';
    this.hospitals = this.hospitals.filter(
      (hospital1) => hospital1.hospitalId !== id
    );
    return 'deleted succesfully';
  }
  searchHospital(key: string): Hospital[] {
    return this.hospitals.filter(
      (hosp) =>
        hosp.hospitalId
          ?.toLocaleString()
          .toLocaleLowerCase()
          .includes(key.toLocaleLowerCase()) ||
        hosp.name
          ?.toLocaleString()
          .toLocaleLowerCase()
          .includes(key.toLocaleLowerCase()) ||
        hosp.address
          ?.toLocaleString()
          .toLocaleLowerCase()
          .includes(key.toLocaleLowerCase())
    );
  }
}

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor() {}
  patients: Patient[] = [
    {
      patientId: 'P00001',
      name: 'Person1',
      mobile: 9988908976,
      email: 'abc@yahoo.com',
    },
    {
      patientId: 'P00002',
      name: 'Person1',
      mobile: 9988908976,
      email: 'abc@yahoo.com',
    },
  ];
  getAllPatients() {
    return this.patients;
  }
}

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  constructor() {}
  appointments: Appointment[] = [
    {
      appointmentId: 'A00001',
      date: new Date('1994-04-24'),
      doctorId: 'D00001',
      patientId: 'P00001',
      slotNumber: 1,
    },
    {
      appointmentId: 'A00002',
      date: new Date('1994-04-25'),
      doctorId: 'D00002',
      patientId: 'P00002',
      slotNumber: 1,
    },
  ];
  slotTimeMap: Slot[] = [
    {
      slotNumber: 1,
      time: '10:00-10:30 hrs',
    },
    {
      slotNumber: 2,
      time: '10:30-11:00 hrs',
    },
    {
      slotNumber: 3,
      time: '11:00-11:30 hrs',
    },
    {
      slotNumber: 4,
      time: '11:30-12:00 hrs',
    },
    {
      slotNumber: 5,
      time: '12:00-12:30 hrs',
    },
    {
      slotNumber: 6,
      time: '12:30-13:00 hrs',
    },
    {
      slotNumber: 7,
      time: '13:00-13:30 hrs',
    },
    {
      slotNumber: 8,
      time: '13:30-14:00 hrs',
    },
  ];
  getAllAppointments() {
    return this.appointments;
  }
  getSlotTimeMap() {
    return this.slotTimeMap;
  }
  deleteAppointment(id?: string) {
    this.appointments = this.appointments.filter((a) => a.appointmentId !== id);
  }
  addAppointment(appointment: Appointment) {
    appointment.appointmentId = String(Date.now());
    this.appointments = [...this.appointments, appointment];
  }
  updateAppointment(appointment: Appointment) {
    this.appointments = this.appointments.map((a) =>
      a.appointmentId === appointment.appointmentId ? appointment : a
    );
  }
}
