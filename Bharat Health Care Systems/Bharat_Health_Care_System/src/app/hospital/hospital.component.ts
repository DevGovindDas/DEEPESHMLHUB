import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Doctor, Hospital } from 'src/model/BHCS.model';
import { HospitalService } from '../service/services';
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
    this.hospitalService.getAllHospitals().subscribe(d=>this.hospitals=d);
  }

  ngOnInit(): void {}


  searchHospitals(): Hospital[] {
    const key= this.searchHospital.get('searchKey')?.value;
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
  updateHospital(hospital?: Hospital) {
    const navigationExtras: NavigationExtras = {
      state: { myObject: hospital },
    };
    this.router.navigate(['updateHospital'], navigationExtras);
  }
  deleteHospital(id?: string) {
    console.log(id);
    this.hospitalService.deleteHospital(id).subscribe(d=>{console.log(d);
      this.hospitals=this.hospitals.filter(h=>h.hospitalId!==d.hospitalId)
    });
  }
  addHospital() {
    this.router.navigate(['addHospital']);
  }
}
