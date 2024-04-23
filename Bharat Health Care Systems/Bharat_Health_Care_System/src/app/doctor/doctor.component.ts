import { Component, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Doctor, Hospital } from 'src/model/BHCS.model';
import { DoctorService, HospitalService } from '../service/services';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css'],
})
export class DoctorComponent implements OnInit,OnChanges {
  doctors: Doctor[] = [];
  searchedDoctors:Doctor[]=[];
  hospitals: Hospital[] = [];
  doctorService: DoctorService = inject(DoctorService);
  hospitalService: HospitalService = inject(HospitalService);
  searchDoctor: FormGroup;

  constructor(formBuilder: FormBuilder, private router: Router) {
    this.searchDoctor = formBuilder.group({
      searchKey: [''],
    });
    this.doctorService.getAllDoctors().subscribe(data=>{
      this.doctors=data;
      this.searchedDoctors=data;
    });
    this.hospitalService.getAllHospitals().subscribe(data=>this.hospitals=data);
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.doctorService.getAllDoctors().subscribe(data=>this.doctors=data);
  }

  ngOnInit(): void {
    this.doctorService.getAllDoctors().subscribe(data=>this.doctors=data);
  }

  searchDoctors() {
    var key=this.searchDoctor.get('searchKey')?.value;
    this.searchedDoctors= this.doctors.filter(
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
    var res: { doctorId: string };
    this.doctorService.deleteDoctor(id).subscribe(data=>{
      res=data;
      if(res){
        this.doctors=this.doctors.filter(d=>d.doctorId!==res.doctorId)
      }
    });
  }
  addDoctor() {
    this.router.navigate(['addDoctor']);
  }
  getHospitalName(id?: string): string | undefined {
    console.log(id, 'test');
    return this.hospitals.filter((h) => h.hospitalId === id)[0].name;
  }
}

