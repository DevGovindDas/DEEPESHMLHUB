import { Injectable } from '@angular/core';
import { Doctor, Hospital } from 'src/model/BHCS.model';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  constructor() {}
  doctors: Doctor[] = [
    {
      id: 1,
      name: 'doctor1',
      qualification: 'qual1',
      rating: 3,
      speciality: 'Heart',
      mobile: 8955405625,
      email: 'abc@xyz.com',
    },
    {
      id: 2,
      name: 'doctor2',
      qualification: 'qual2',
      rating: 4,
      speciality: 'Kidney',
      mobile: 8955405624,
      email: 'abc1@xyz.com',
    },
  ];

  getSearchedDoctors(): Doctor[] {
    return this.doctors;
  }

  addDoctor(doctor: Doctor): Doctor {
    doctor.id = Date.now();
    doctor.rating = 0;
    this.doctors = [...this.doctors, doctor];
    return doctor;
  }
  updateDoctor(doctor: Doctor): string {
    const result = this.doctors.filter(
      (doctor1) => doctor.id === doctor1.id
    )[0];
    if (result === null) return 'doctor with this id does not exist';
    this.doctors = this.doctors.map((doctor1) =>
      doctor1.id === doctor.id ? doctor : doctor1
    );
    return 'updated succesfully';
  }

  deleteDoctor(id?: number): string {
    const result = this.doctors.filter((doctor1) => id === doctor1.id)[0];
    if (result === null) return 'doctor with this id does not exist';
    this.doctors = this.doctors.filter((doctor1) => doctor1.id !== id);
    return 'deleted succesfully';
  }
  searchDoctor(key: string): Doctor[] {
    return this.doctors.filter(
      (doc) =>
        doc.id
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
      id: 1,
      name: 'Hospital1',
      address: 'Jaipur',
      admitCapacity: 55,
    },
    {
      id: 2,
      name: 'Hospital2',
      address: 'Jaipur',
      admitCapacity: 66,
    },
  ];

  getAllHospitals(): Hospital[] {
    return this.hospitals;
  }

  addHospital(hospital: Hospital): Hospital {
    hospital.id = Date.now();
    this.hospitals = [...this.hospitals, hospital];
    return hospital;
  }
  updateHospital(hospital: Hospital): string {
    const result = this.hospitals.filter(
      (hospital1) => hospital.id === hospital1.id
    )[0];
    if (result === null) return 'hospital with this id does not exist';
    this.hospitals = this.hospitals.map((hospital1) =>
      hospital1.id === hospital.id ? hospital : hospital1
    );
    console.log(result, 'Searched Value');
    return 'updated succesfully';
  }

  deleteHospital(id?: number): string {
    const result = this.hospitals.filter((hospital1) => id === hospital1.id)[0];
    if (result === null) return 'doctor with this id does not exist';
    this.hospitals = this.hospitals.filter((hospital1) => hospital1.id !== id);
    return 'deleted succesfully';
  }
  searchHospital(key: string): Hospital[] {
    return this.hospitals.filter(
      (hosp) =>
        hosp.id
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
