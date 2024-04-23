import { ChangeDetectorRef, Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HospitalService } from 'src/app/service/services';

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
  errorCapacity = ' ';
  errorName = ' ';
  errorAddress = ' ';
  addForm: FormGroup;
  hospitalService: HospitalService = inject(HospitalService);
  constructor(private formBuilder: FormBuilder, private router: Router,private cdr:ChangeDetectorRef) {
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
    if (this.addForm.controls['hospitalName'].invalid) {
      if (
        this.addForm.controls['hospitalName'].dirty ||
        this.addForm.controls['hospitalName'].touched
      ) {
        this.errorName = 'Name cannot be empty';
      }
    } else {
      this.errorName = '';
    }
    if (this.addForm.controls['hospitalAddress'].invalid) {
      if (
        this.addForm.controls['hospitalAddress'].dirty ||
        this.addForm.controls['hospitalAddress'].touched
      ) {
        this.errorAddress = 'Address cannot be empty';
      }
    } else {
      this.errorAddress = '';
    }
    if (
      this.errorCapacity === '' &&
      this.errorAddress === '' &&
      this.errorName === ''
    ) {
      const newHospital = {
        hospitalId: '1',
        name: this.addForm.get('hospitalName')?.value,
        address: this.addForm.get('hospitalAddress')?.value,
        admitCapacity: this.addForm.get('hospitalCapacity')?.value,
      };
      this.hospitalService.addHospital(newHospital).subscribe(a=>{
        console.log(a)
        this.cdr.detectChanges();
        this.router.navigate(['hospital']);
      });
      
    } else if (
      this.errorCapacity === ' ' &&
      this.errorAddress === ' ' &&
      this.errorName === ' '
    ) {
      this.errorName = 'Please fill this field';
      this.errorAddress = 'Please fill this field';
      this.errorCapacity = 'Please fill this field';
    }
  }
}
