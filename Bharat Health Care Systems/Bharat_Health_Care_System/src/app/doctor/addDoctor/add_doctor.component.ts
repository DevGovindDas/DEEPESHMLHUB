import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DoctorService, HospitalService } from 'src/app/service/services';
import { Hospital } from 'src/model/BHCS.model';

export function mobileNumberValidator(
  control: AbstractControl
): { [key: string]: any } | null {
  const mobileNumberPattern = /^[0-9]{10}$/;
  if (control.value && !mobileNumberPattern.test(control.value)) {
    return { invalidMobileNumber: true };
  }
  return null;
}

@Component({
  selector: 'add-doctor',
  templateUrl: './add_doctor.component.html',
  styles: [],
})
export class AddDoctorComponent {
  addForm: FormGroup;
  doctorService: DoctorService = inject(DoctorService);
  hospitalService: HospitalService = inject(HospitalService);
  hospitals: Hospital[] = [];
  errorMobile: string = ' ';
  errorEmail: string = ' ';
  errorName: string = ' ';
  errorQual: string = ' ';
  errorSpecialization = ' ';
  errorHospitalId = ' ';
  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.hospitalService.getAllHospitals().subscribe(data=>this.hospitals=data);
    this.addForm = formBuilder.group({
      doctorName: ['', [Validators.required]],
      doctorQual: ['', [Validators.required]],
      doctorSpecialization: ['', [Validators.required]],
      hospitalId: ['', [Validators.required]],
      doctorMobile: ['', [Validators.required, mobileNumberValidator]],
      doctorEmail: ['', [Validators.required, Validators.email]],
    });
  }

  addDoctor() {
    if (this.addForm.controls['doctorName'].invalid) {
      if (
        this.addForm.controls['doctorName'].dirty ||
        this.addForm.controls['doctorName'].touched
      ) {
        this.errorName = 'Name cannot be empty';
      }
    } else {
      this.errorName = '';
    }
    if (this.addForm.controls['doctorQual'].invalid) {
      if (
        this.addForm.controls['doctorQual'].dirty ||
        this.addForm.controls['doctorQual'].touched
      ) {
        this.errorQual = 'Qualification cannot be empty';
      }
    } else {
      this.errorQual = '';
    }
    if (this.addForm.controls['hospitalId'].invalid) {
      if (
        this.addForm.controls['hospitalId'].dirty ||
        this.addForm.controls['hospitalId'].touched
      ) {
        this.errorHospitalId = 'Hospital cannot be empty';
      }
    } else {
      this.errorHospitalId = '';
    }
    if (this.addForm.controls['doctorSpecialization'].invalid) {
      if (
        this.addForm.controls['doctorSpecialization'].dirty ||
        this.addForm.controls['doctorSpecialization'].touched
      ) {
        this.errorSpecialization = 'Specialization cannot be empty';
      }
    } else {
      this.errorSpecialization = '';
    }
    if (this.addForm.controls['doctorMobile'].invalid) {
      if (
        this.addForm.controls['doctorMobile'].dirty ||
        this.addForm.controls['doctorMobile'].touched
      ) {
        this.errorMobile = 'Invalid Mobile';
      }
    } else {
      this.errorMobile = '';
    }
    if (this.addForm.controls['doctorEmail'].invalid) {
      if (
        this.addForm.controls['doctorEmail'].dirty ||
        this.addForm.controls['doctorEmail'].touched
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
        doctorId: '1',
        name: this.addForm.get('doctorName')?.value,
        qualification: this.addForm.get('doctorQual')?.value,
        rating: 0,
        speciality: this.addForm.get('doctorSpecialization')?.value,
        hospitalId: this.addForm.get('hospitalId')?.value,
        mobile: this.addForm.get('doctorMobile')?.value,
        email: this.addForm.get('doctorEmail')?.value,
      };
      console.log(newDoctor, 'Before submitting to service');
      this.doctorService.addDoctor(newDoctor).subscribe(data=>console.log('I am value returned from Backend',data));
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
