import { Component, OnInit, inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BHCSService } from "src/app/service/BHCS.service";
import { mobileNumberValidator } from "../addDoctor/add_doctor.component";
import { Doctor } from "src/model/BHCS.model";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector:'update-doctor',
    templateUrl:'./update_doctor.component.html',
    styles:[]
})export class UpdateDoctorComponent implements OnInit{
    updateForm!: FormGroup;
    doctor!: Doctor;
    bhcsService:BHCSService=inject(BHCSService);
    constructor(private formBuilder:FormBuilder,private route:ActivatedRoute,private router:Router){ 
        this.route.paramMap.subscribe(()=>{
            this.doctor=history.state.myObject;
            this.updateForm=this.formBuilder.group({
                doctorId:[this.doctor.id],
                doctorName:[this.doctor.name,[Validators.required]],
                doctorQual:[this.doctor.qualification,[Validators.required]],
                doctorSpecialization:[this.doctor.speciality,[Validators.required]],
                doctorMobile:[this.doctor.mobile,[Validators.required,mobileNumberValidator]],
                doctorEmail:[this.doctor.email,[Validators.required,Validators.email]]
            });
            }) 
        
    }
    ngOnInit(): void {
        
    }

    updateDoctor(){
        console.log('reached here')
        const newDoctor={
            id:this.updateForm.get('doctorId')?.value,
            name:this.updateForm.get('doctorName')?.value,
            qualification:this.updateForm.get('doctorQual')?.value,
            rating:this.doctor.rating,
            speciality:this.updateForm.get('doctorSpecialization')?.value,
            mobile:this.updateForm.get('doctorMobile')?.value,
            email:this.updateForm.get('doctorEmail')?.value,
        }
        this.bhcsService.updateDoctor(newDoctor);
        this.router.navigate(['doctor']);
    }
}