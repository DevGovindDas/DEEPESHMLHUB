import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Doctor, Hospital } from 'src/model/BHCS.model';
import { DoctorService, HospitalService } from '../service/BHCS.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css'],
})
export class DoctorComponent implements OnInit {
  doctors: Doctor[] = [];
  hospitals: Hospital[] = [];
  doctorService: DoctorService = inject(DoctorService);
  hospitalService: HospitalService = inject(HospitalService);
  searchDoctor: FormGroup;

  constructor(formBuilder: FormBuilder, private router: Router) {
    this.searchDoctor = formBuilder.group({
      searchKey: [''],
    });
    this.doctorService.getSearchedDoctors().subscribe(data=>this.doctors=data);
    this.hospitals = this.hospitalService.getAllHospitals();
  }

  ngOnInit(): void {}

  searchDoctors() {
    var key=this.searchDoctor.get('searchKey')?.value;
    this.doctors= this.doctors.filter(
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
  updateDoctor(doctor?: Doctor) {
    const navigationExtras: NavigationExtras = { state: { myObject: doctor } };
    this.router.navigate(['updateDoctor'], navigationExtras);
  }
  deleteDoctor(id?: string) {
    console.log(id);
    this.doctorService.deleteDoctor(id);
    this.doctorService.getSearchedDoctors().subscribe(data=>this.doctors=data);
  }
  addDoctor() {
    this.router.navigate(['addDoctor']);
  }
  getHospitalName(id?: string): string | undefined {
    console.log(id, 'test');
    return this.hospitals.filter((h) => h.hospitalId === id)[0].name;
  }
}
