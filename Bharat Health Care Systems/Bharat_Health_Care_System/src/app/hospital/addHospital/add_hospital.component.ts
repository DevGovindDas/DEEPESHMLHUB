import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HospitalService } from 'src/app/service/BHCS.service';

export function numberValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const value = control.value;
  if (isNaN(value)) {
    return { numberError: true };
  }
  return null;
}

@Component({
  selector: 'add-hospital',
  templateUrl: './add_hospital.component.html',
  styles: [],
})
export class AddHospitalComponent {
  errorCapacity = '';
  addForm: FormGroup;
  hospitalService: HospitalService = inject(HospitalService);
  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.addForm = formBuilder.group({
      hospitalName: ['', [Validators.required]],
      hospitalAddress: ['', [Validators.required]],
      hospitalCapacity: ['', [Validators.required, numberValidator]],
    });
  }

  addHospital() {
    if (this.addForm.controls['hospitalCapacity'].invalid) {
      if (
        this.addForm.controls['hospitalCapacity'].dirty ||
        this.addForm.controls['hospitalCapacity'].touched
      ) {
        if (
          this.addForm.controls['hospitalCapacity'].errors &&
          this.addForm.controls['hospitalCapacity'].errors['numberError']
        ) {
          this.errorCapacity = 'Not a valid Number';
        }
      }
    } else {
      this.errorCapacity = '';
    }
    if (this.errorCapacity == '') {
      const newHospital = {
        id: 1,
        name: this.addForm.get('hospitalName')?.value,
        address: this.addForm.get('hospitalAddress')?.value,
        admitCapacity: this.addForm.get('hospitalCapacity')?.value,
      };
      this.hospitalService.addHospital(newHospital);
      this.router.navigate(['hospital']);
    }
  }
}
