import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DoctorService, HospitalService } from 'src/app/service/BHCS.service';
import { mobileNumberValidator } from '../addDoctor/add_doctor.component';
import { Doctor, Hospital } from 'src/model/BHCS.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'update-doctor',
  templateUrl: './update_doctor.component.html',
  styles: [],
})
export class UpdateDoctorComponent implements OnInit {
  updateForm!: FormGroup;
  doctor!: Doctor;
  doctorService: DoctorService = inject(DoctorService);
  hospitalService: HospitalService = inject(HospitalService);
  hospitals: Hospital[] = [];
  errorMobile: string = ' ';
  errorEmail: string = ' ';
  errorName: string = ' ';
  errorQual: string = ' ';
  errorSpecialization = ' ';
  errorHospitalId = ' ';
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.hospitals = this.hospitalService.getAllHospitals();
    this.route.paramMap.subscribe(() => {
      this.doctor = history.state.myObject;
      this.updateForm = this.formBuilder.group({
        doctorId: [this.doctor.doctorId],
        doctorName: [this.doctor.name, [Validators.required]],
        doctorQual: [this.doctor.qualification, [Validators.required]],
        doctorSpecialization: [this.doctor.speciality, [Validators.required]],
        hospitalId: [this.doctor.hospitalId, [Validators.required]],
        doctorMobile: [
          this.doctor.mobile,
          [Validators.required, mobileNumberValidator],
        ],
        doctorEmail: [
          this.doctor.email,
          [Validators.required, Validators.email],
        ],
      });
    });
  }
  ngOnInit(): void {}

  updateDoctor() {
    if (this.updateForm.controls['doctorName'].invalid) {
      if (
        this.updateForm.controls['doctorName'].dirty ||
        this.updateForm.controls['doctorName'].touched
      ) {
        this.errorName = 'Name cannot be empty';
      }
    } else {
      this.errorName = '';
    }
    if (this.updateForm.controls['doctorQual'].invalid) {
      if (
        this.updateForm.controls['doctorQual'].dirty ||
        this.updateForm.controls['doctorQual'].touched
      ) {
        this.errorQual = 'Qualification cannot be empty';
      }
    } else {
      this.errorQual = '';
    }
    if (this.updateForm.controls['hospitalId'].invalid) {
      if (
        this.updateForm.controls['hospitalId'].dirty ||
        this.updateForm.controls['hospitalId'].touched
      ) {
        this.errorHospitalId = 'Hospital cannot be empty';
      }
    } else {
      this.errorHospitalId = '';
    }
    if (this.updateForm.controls['doctorSpecialization'].invalid) {
      if (
        this.updateForm.controls['doctorSpecialization'].dirty ||
        this.updateForm.controls['doctorSpecialization'].touched
      ) {
        this.errorSpecialization = 'Specialization cannot be empty';
      }
    } else {
      this.errorSpecialization = '';
    }
    if (this.updateForm.controls['doctorMobile'].invalid) {
      if (
        this.updateForm.controls['doctorMobile'].dirty ||
        this.updateForm.controls['doctorMobile'].touched
      ) {
        this.errorMobile = 'Invalid Mobile';
      }
    } else {
      this.errorMobile = '';
    }
    if (this.updateForm.controls['doctorEmail'].invalid) {
      if (
        this.updateForm.controls['doctorEmail'].dirty ||
        this.updateForm.controls['doctorEmail'].touched
      ) {
        this.errorEmail = 'Invalid Email';
      }
    } else {
      this.errorEmail = '';
    }
    if (
      this.errorEmail === '' &&
      this.errorMobile === '' &&
      this.errorName === '' &&
      this.errorQual === '' &&
      this.errorSpecialization === '' &&
      this.errorHospitalId === ''
    ) {
      const newDoctor = {
        doctorId: this.updateForm.get('doctorId')?.value,
        name: this.updateForm.get('doctorName')?.value,
        qualification: this.updateForm.get('doctorQual')?.value,
        rating: this.doctor.rating,
        speciality: this.updateForm.get('doctorSpecialization')?.value,
        hospitalId: '101',
        mobile: this.updateForm.get('doctorMobile')?.value,
        email: this.updateForm.get('doctorEmail')?.value,
      };
      this.doctorService.updateDoctor(newDoctor);
      this.router.navigate(['doctor']);
    } else if (
      this.errorEmail === ' ' &&
      this.errorMobile === ' ' &&
      this.errorName === ' ' &&
      this.errorQual === ' ' &&
      this.errorSpecialization === ' ' &&
      this.errorHospitalId === ' '
    ) {
      this.errorMobile = 'Please Fill this field';
      this.errorEmail = 'Please Fill this field';
      this.errorName = 'Please Fill this field';
      this.errorQual = 'Please Fill this field';
      this.errorSpecialization = 'Please Fill this field';
      this.errorHospitalId = 'Please Fill this field';
    }
  }
}
