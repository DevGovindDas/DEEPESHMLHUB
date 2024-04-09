import { Component, OnInit, inject } from '@angular/core';
import { Patient } from 'src/model/BHCS.model';
import { PatientService } from '../service/BHCS.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
})
export class PatientComponent implements OnInit {
  patients: Patient[] = [];
  patientService: PatientService = inject(PatientService);
  constructor() {
    this.patients = this.patientService.getAllPatients();
  }

  ngOnInit(): void {}
  updatePatient(patient: Patient) {}
  deletePatient(id?: string) {}
}
