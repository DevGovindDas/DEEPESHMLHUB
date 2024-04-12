import { Component, OnInit, inject } from '@angular/core';
import { Patient } from 'src/model/BHCS.model';
import { PatientService } from '../service/services';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
})
export class PatientComponent implements OnInit {
  patients: Patient[] = [];
  patientService: PatientService = inject(PatientService);
  constructor() {
    this.patientService.getAllPatients().subscribe(data=>this.patients=data);
  }

  ngOnInit(): void {}
  updatePatient(patient: Patient) {}
  deletePatient(id?: string) {}
}
