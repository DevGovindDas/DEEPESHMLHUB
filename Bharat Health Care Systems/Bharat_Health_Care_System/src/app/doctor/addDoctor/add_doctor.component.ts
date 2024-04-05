import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DoctorService } from 'src/app/service/BHCS.service';

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
  errorMobile: string = '';
  errorEmail: string = '';
  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.addForm = formBuilder.group({
      doctorName: ['', [Validators.required]],
      doctorQual: ['', [Validators.required]],
      doctorSpecialization: ['', [Validators.required]],
      doctorMobile: ['', [Validators.required, mobileNumberValidator]],
      doctorEmail: ['', [Validators.required, Validators.email]],
    });
  }

  addDoctor() {
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
    if (this.errorEmail === '' && this.errorMobile === '') {
      const newDoctor = {
        id: 1,
        name: this.addForm.get('doctorName')?.value,
        qualification: this.addForm.get('doctorQual')?.value,
        rating: 0,
        speciality: this.addForm.get('doctorSpecialization')?.value,
        mobile: this.addForm.get('doctorMobile')?.value,
        email: this.addForm.get('doctorEmail')?.value,
      };
      this.doctorService.addDoctor(newDoctor);
      this.router.navigate(['doctor']);
    }
  }
}
