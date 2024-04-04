import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Doctor } from 'src/model/BHCS.model';
import { BHCSService } from '../service/BHCS.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  doctors:Doctor[]=[];
  bhcsService:BHCSService=inject(BHCSService);
  searchDoctor:FormGroup;
  
  constructor(formBuilder:FormBuilder,private router:Router) {
    this.searchDoctor=formBuilder.group({
      searchKey:['']
    });
    this.doctors=this.bhcsService.getSearchedDoctors();
   }

  ngOnInit(): void {
  }

  searchDoctors(){
    this.doctors=this.bhcsService.searchDoctor(this.searchDoctor.get('searchKey')?.value);
  }
  updateDoctor(doctor?:Doctor){
    const navigationExtras:NavigationExtras={state:{myObject:doctor}}
    this.router.navigate(['updateDoctor'],navigationExtras);
  }
  deleteDoctor(id?:number){
    console.log(id)
    this.bhcsService.deleteDoctor(id);
    this.doctors=this.bhcsService.getSearchedDoctors();
  }
  addDoctor(){
    this.router.navigate(['addDoctor']);
  }

}
