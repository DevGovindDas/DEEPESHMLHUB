import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HospitalService } from 'src/app/service/services';
import { Hospital } from 'src/model/BHCS.model';
import { ActivatedRoute, Router } from '@angular/router';
import { numberValidator } from '../addHospital/add_hospital.component';

@Component({
  selector: 'update-hospital',
  templateUrl: './update_hospital.component.html',
  styles: [],
})
export class UpdateHospitalComponent implements OnInit {
  updateForm!: FormGroup;
  hospital!: Hospital;
  hospitalService: HospitalService = inject(HospitalService);
  errorCapacity = ' ';
  errorName = ' ';
  errorAddress = ' ';
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.paramMap.subscribe(() => {
      this.hospital = history.state.myObject;
      this.updateForm = this.formBuilder.group({
        hospitalId: [this.hospital.hospitalId],
        hospitalName: [this.hospital.name, [Validators.required]],
        hospitalAddress: [this.hospital.address, [Validators.required]],
        hospitalCapacity: [
          this.hospital.admitCapacity,
          [Validators.required, numberValidator],
        ],
      });
    });
  }
  ngOnInit(): void {}

  updateHospital() {
    if (this.updateForm.controls['hospitalCapacity'].invalid) {
      if (
        this.updateForm.controls['hospitalCapacity'].dirty ||
        this.updateForm.controls['hospitalCapacity'].touched
      ) {
        if (
          this.updateForm.controls['hospitalCapacity'].errors &&
          this.updateForm.controls['hospitalCapacity'].errors['numberError']
        ) {
          this.errorCapacity = 'Not a valid Number';
        }
      }
    } else {
      this.errorCapacity = '';
    }
    if (this.updateForm.controls['hospitalName'].invalid) {
      if (
        this.updateForm.controls['hospitalName'].dirty ||
        this.updateForm.controls['hospitalName'].touched
      ) {
        this.errorName = 'Name cannot be empty';
      }
    } else {
      this.errorName = '';
    }
    if (this.updateForm.controls['hospitalAddress'].invalid) {
      if (
        this.updateForm.controls['hospitalAddress'].dirty ||
        this.updateForm.controls['hospitalAddress'].touched
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
        hospitalId: this.updateForm.get('hospitalId')?.value,
        name: this.updateForm.get('hospitalName')?.value,
        address: this.updateForm.get('hospitalAddress')?.value,
        admitCapacity: this.updateForm.get('hospitalCapacity')?.value,
      };
      console.log(newHospital, 'Before Service Call');
      this.hospitalService.updateHospital(newHospital).subscribe(d=>console.log(d));
      this.router.navigate(['hospital']);
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
