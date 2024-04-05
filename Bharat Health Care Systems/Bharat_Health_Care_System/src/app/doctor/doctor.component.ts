import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Doctor } from 'src/model/BHCS.model';
import { DoctorService } from '../service/BHCS.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css'],
})
export class DoctorComponent implements OnInit {
  doctors: Doctor[] = [];
  doctorService: DoctorService = inject(DoctorService);
  searchDoctor: FormGroup;

  constructor(formBuilder: FormBuilder, private router: Router) {
    this.searchDoctor = formBuilder.group({
      searchKey: [''],
    });
    this.doctors = this.doctorService.getSearchedDoctors();
  }

  ngOnInit(): void {}

  searchDoctors() {
    this.doctors = this.doctorService.searchDoctor(
      this.searchDoctor.get('searchKey')?.value
    );
  }
  updateDoctor(doctor?: Doctor) {
    const navigationExtras: NavigationExtras = { state: { myObject: doctor } };
    this.router.navigate(['updateDoctor'], navigationExtras);
  }
  deleteDoctor(id?: number) {
    console.log(id);
    this.doctorService.deleteDoctor(id);
    this.doctors = this.doctorService.getSearchedDoctors();
  }
  addDoctor() {
    this.router.navigate(['addDoctor']);
  }
}
