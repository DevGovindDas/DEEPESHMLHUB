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
} from 'src/app/service/services';
import { Appointment, Doctor, Hospital, Patient, Slot } from 'src/model/BHCS.model';

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
  avalibleDoctors:Doctor[]=[];
  avalibleSlots:Slot[]=[];
  patients: Patient[] = [];
  appointments:Appointment[]=[];
  filteredAppointments:Appointment[]=[];
  errorDoctorId: string = ' ';
  errorDate: string = ' ';
  errorPatientId: string = ' ';
  errorSlot: string = ' ';
  minDate: string;
  maxDate: string;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.doctorService.getAllDoctors().subscribe(data=>this.doctors=data);
    this.patientService.getAllPatients().subscribe(data=>this.patients=data);
    this.slotMap = this.appointmentService.getSlotTimeMap();
    this.appointmentService.getAllAppointments().subscribe(data=>this.appointments=data);
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
      this.appointmentService.addAppointment(newAppointment).subscribe(data=>{
        this.router.navigate(['appointment']);
      });
      
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
  filterRemaining4() {
    const patientId = this.addForm.get('patientId')?.value;
    const doctorId=this.addForm.get('doctorId')?.value;
    const date=this.addForm.get('date')?.value;
    if(patientId===''){
      this.doctors=[];
      this.errorPatientId='Please select patientId First';
      this.addForm.get('doctorId')?.setValue('');
      this.addForm.get('date')?.setValue('');
      this.addForm.get('slotNumber')?.setValue('');
    }else if(doctorId===''){
      this.doctorService.getAllDoctors().subscribe(data=>this.doctors=data);
      this.errorPatientId='';
      this.errorDoctorId='Please select doctorId First';
      this.addForm.get('date')?.setValue('');
      this.addForm.get('slotNumber')?.setValue('');
    }else if(date===''){
      this.errorPatientId='';
      this.errorDoctorId='';
      this.errorDate='Please select date First';
      this.addForm.get('date')?.setValue('');
      this.addForm.get('slotNumber')?.setValue('');
    }else{
      this.errorDate='';
      this.errorDoctorId='';
      this.errorPatientId='';
    }
  }
  filterRemaining3() {
    const patientId = this.addForm.get('patientId')?.value;
    const doctorId=this.addForm.get('doctorId')?.value;
    const date=this.addForm.get('date')?.value;
    if(patientId===''){
      this.doctors=[];
      this.errorPatientId='Please select patientId First';
      this.addForm.get('doctorId')?.setValue('');
      this.addForm.get('date')?.setValue('');
      this.addForm.get('slotNumber')?.setValue('');
    }else if(doctorId===''){
      this.doctorService.getAllDoctors().subscribe(data=>this.doctors=data);
      this.errorPatientId='';
      this.errorDoctorId='Please select doctorId First';
      this.addForm.get('date')?.setValue('');
      this.addForm.get('slotNumber')?.setValue('');
    }else{
      this.errorDate='';
      this.errorDoctorId='';
      this.errorPatientId='';
      this.avalibleSlots=[];
      var patientAppointments=this.appointments.filter(a=>(a.patientId===patientId)&&(a.doctorId===doctorId)&&(a.date===date));
      for(var i=0;i<this.slotMap.length;i++){
        if(patientAppointments.filter(a=>a.slotNumber===this.slotMap[i].slotNumber).length===0){
          this.avalibleSlots.push(this.slotMap[i])
        }
      }
      if(this.avalibleSlots.length===0){
        this.errorSlot='Patient has all slots with this doctor on this date booked'
      }else{
        this.errorSlot='';
      }
    }
  }
    
    filterRemaining2() {
      const patientId = this.addForm.get('patientId')?.value;
      const doctorId=this.addForm.get('doctorId')?.value;
      const date=this.addForm.get('date')?.value;
      if(patientId===''){
        this.doctors=[];
        this.errorPatientId='Please select patientId First';
        this.addForm.get('doctorId')?.setValue('');
        this.addForm.get('date')?.setValue('');
        this.addForm.get('slotNumber')?.setValue('');
      }else{
        this.errorDate='';
        this.errorDoctorId='';
        this.errorPatientId='';
      }
  }
  filterRemaining1() {
    const patientId = this.addForm.get('patientId')?.value;
    const doctorId=this.addForm.get('doctorId')?.value;
    const date=this.addForm.get('date')?.value;
      this.errorDate='';
      this.errorDoctorId='';
      this.errorPatientId='';
      this.doctorService.getAllDoctors().subscribe(data=>this.doctors=data);
      var patientAppointments=this.appointments.filter(a=>a.patientId===patientId);
      this.avalibleDoctors=[];
      for(var i=0;i<this.doctors.length;i++){
        if(patientAppointments.filter(a=>a.doctorId===this.doctors[i].doctorId).length<240){
          this.avalibleDoctors.push(this.doctors[i])
        }else{
          this.avalibleDoctors=[];
          this.errorDoctorId='Patient need to cancel one appointment to book one more';
          break;
        }
      }      
  }
}
