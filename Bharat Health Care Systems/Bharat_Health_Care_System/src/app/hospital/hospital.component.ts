import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Doctor, Hospital } from 'src/model/BHCS.model';
import { HospitalService } from '../service/BHCS.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.css'],
})
export class HospitalComponent implements OnInit {
  hospitals: Hospital[] = [];
  hospitalService: HospitalService = inject(HospitalService);
  searchHospital: FormGroup;

  constructor(formBuilder: FormBuilder, private router: Router) {
    this.searchHospital = formBuilder.group({
      searchKey: [''],
    });
    this.hospitals = this.hospitalService.getAllHospitals();
  }

  ngOnInit(): void {}

  searchHospitals() {
    this.hospitals = this.hospitalService.searchHospital(
      this.searchHospital.get('searchKey')?.value
    );
  }
  updateHospital(hospital?: Hospital) {
    const navigationExtras: NavigationExtras = {
      state: { myObject: hospital },
    };
    this.router.navigate(['updateHospital'], navigationExtras);
  }
  deleteHospital(id?: string) {
    console.log(id);
    this.hospitalService.deleteHospital(id);
    this.hospitals = this.hospitalService.getAllHospitals();
  }
  addHospital() {
    this.router.navigate(['addHospital']);
  }
}
