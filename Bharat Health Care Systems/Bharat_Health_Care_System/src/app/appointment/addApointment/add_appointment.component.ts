import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { min } from 'rxjs';
import {
  AppointmentService,
  DoctorService,
  HospitalService,
  PatientService,
} from 'src/app/service/BHCS.service';
import { Doctor, Hospital, Patient, Slot } from 'src/model/BHCS.model';

@Component({
  selector: 'add-appointment',
  templateUrl: './add_appointment.component.html',
  styles: [],
})
export class AddAppointmentComponent {
  addForm: FormGroup;
  appointmentService: AppointmentService = inject(AppointmentService);
  doctorService: DoctorService = inject(DoctorService);
  patientService: PatientService = inject(PatientService);
  slotMap: Slot[] = [];
  doctors: Doctor[] = [];
  patients: Patient[] = [];
  errorDoctorId: string = ' ';
  errorDate: string = ' ';
  errorPatientId: string = ' ';
  errorSlot: string = ' ';
  minDate: string;
  maxDate: string;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.doctors = this.doctorService.getSearchedDoctors();
    this.patients = this.patientService.getAllPatients();
    this.slotMap = this.appointmentService.getSlotTimeMap();
    this.addForm = formBuilder.group({
      doctorId: ['', [Validators.required]],
      patientId: ['', [Validators.required]],
      date: ['', [Validators.required]],
      slotNumber: ['', [Validators.required]],
    });
    const today = new Date();
    const thirtyDaysLater = new Date();
    thirtyDaysLater.setDate(today.getDate() + 30);
    this.minDate = this.formatDate(today);
    this.maxDate = this.formatDate(thirtyDaysLater);
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  addAppointment() {
    if (this.addForm.controls['doctorId'].invalid) {
      if (
        this.addForm.controls['doctorId'].dirty ||
        this.addForm.controls['doctorId'].touched
      ) {
        this.errorDoctorId = 'Doctot Id cannot be empty';
      }
    } else {
      this.errorDoctorId = '';
    }
    if (this.addForm.controls['patientId'].invalid) {
      if (
        this.addForm.controls['patientId'].dirty ||
        this.addForm.controls['patientId'].touched
      ) {
        this.errorPatientId = 'Patient Id cannot be empty';
      }
    } else {
      this.errorPatientId = '';
    }
    if (this.addForm.controls['date'].invalid) {
      if (
        this.addForm.controls['date'].dirty ||
        this.addForm.controls['date'].touched
      ) {
        this.errorDate = 'Date cannot be empty';
      }
    } else {
      this.errorDate = '';
    }
    if (this.addForm.controls['slotNumber'].invalid) {
      if (
        this.addForm.controls['slotNumber'].dirty ||
        this.addForm.controls['slotNumber'].touched
      ) {
        this.errorSlot = 'Slot cannot be empty';
      }
    } else {
      this.errorSlot = '';
    }

    if (
      this.errorDate === '' &&
      this.errorDoctorId === '' &&
      this.errorPatientId === '' &&
      this.errorSlot === ''
    ) {
      const newAppointment = {
        appointmentId: '1',
        patientId: this.addForm.get('patientId')?.value,
        doctorId: this.addForm.get('doctorId')?.value,
        slotNumber: Number(this.addForm.get('slotNumber')?.value),
        date: new Date(this.addForm.get('date')?.value),
      };
      console.log(newAppointment);
      this.appointmentService.addAppointment(newAppointment);
      this.router.navigate(['appointment']);
    } else if (
      this.errorDate === ' ' &&
      this.errorDoctorId === ' ' &&
      this.errorPatientId === ' ' &&
      this.errorSlot === ' '
    ) {
      this.errorDate = 'Please Fill this field';
      this.errorDoctorId = 'Please Fill this field';
      this.errorPatientId = 'Please Fill this field';
      this.errorSlot = 'Please Fill this field';
    }
  }
  filterRemaining() {
    const patientId = this.addForm.get('patientId')?.value;
  }
}
