import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HospitalService } from 'src/app/service/BHCS.service';
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
  errorCapacity = '';
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.paramMap.subscribe(() => {
      this.hospital = history.state.myObject;
      this.updateForm = this.formBuilder.group({
        hospitalId: [this.hospital.id],
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
    if (this.errorCapacity == '') {
      const newHospital = {
        id: this.updateForm.get('hospitalId')?.value,
        name: this.updateForm.get('hospitalName')?.value,
        address: this.updateForm.get('hospitalAddress')?.value,
        admitCapacity: this.updateForm.get('hospitalCapacity')?.value,
      };
      console.log(newHospital, 'Before Service Call');
      this.hospitalService.updateHospital(newHospital);
      this.router.navigate(['hospital']);
    }
  }
}
