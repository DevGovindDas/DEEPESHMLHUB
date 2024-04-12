import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Appointment,
  Doctor,
  Hospital,
  Patient,
  Slot,
} from 'src/model/BHCS.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  constructor(private httpClient:HttpClient) {}
    
  getAllDoctors(): Observable<any>{
    return this.httpClient.get("http://localhost:8090/doctor");
  }

  addDoctor(doctor: any):Observable<any> {
    console.log('I am in addDoctor',doctor)
    return this.httpClient.post("http://localhost:8090/doctor",doctor);
  }
  updateDoctor(doctor: Doctor):Observable<any> {
    return this.httpClient.put("http://localhost:8090/doctor",doctor);
  }

  deleteDoctor(id?: string):Observable<any>{
    const url="http://localhost:8090/doctor/"+id;
    console.log('control reached here',url);
    return this.httpClient.delete(url);
    
  }
  
}

@Injectable({
  providedIn: 'root',
})
export class HospitalService {
  constructor(private httpClient:HttpClient) {}
  

  getAllHospitals(): Observable<any> {
    return this.httpClient.get("http://localhost:8072/hospital");
  }

  addHospital(hospital: Hospital): Observable<Hospital> {
    return this.httpClient.post("http://localhost:8072/hospital",hospital);
  }
  updateHospital(hospital: Hospital):Observable<any> {
    return this.httpClient.put("http://localhost:8072/hospital",hospital);
  }

  deleteHospital(id?: string): Observable<any> {
    return this.httpClient.delete("http://localhost:8072/hospital"+'/'+id)
  }

 
}

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor(private httpClient:HttpClient) {}
  
  getAllPatients():Observable<any> {
    return this.httpClient.get("http://localhost:8074/patient");
  }
}

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  constructor(private httpClient:HttpClient) {}
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
  getAllAppointments():Observable<any> {
    return this.httpClient.get("http://localhost:8076/appointment");
  }
  getSlotTimeMap() {
    return this.slotTimeMap;
  }
  deleteAppointment(id?: string):Observable<any> {
    return this.httpClient.delete("http://localhost:8076/appointment/"+id)
  }
  addAppointment(appointment: Appointment):Observable<any> {
    return this.httpClient.post("http://localhost:8076/appointment",appointment);
  }
  updateAppointment(appointment: Appointment):Observable<any> {
    return this.httpClient.put("http://localhost:8076/appointment",appointment);
  }
}
