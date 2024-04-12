import { Component, OnInit, inject } from '@angular/core';
import { Appointment, Slot } from 'src/model/BHCS.model';
import { AppointmentService } from '../service/services';
import { NavigationExtras, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css'],
})
export class AppointmentComponent implements OnInit {
  appointments: Appointment[] = [];
  filteredAppointments: Appointment[] = [];
  slotTimeMap: Slot[] = [];
  appointmentService: AppointmentService = inject(AppointmentService);
  searchAppointment: FormGroup;
  constructor(private router: Router, private formBuilder: FormBuilder) {
    this.searchAppointment = this.formBuilder.group({
      searchKey: [''],
    });
    this.appointmentService.getAllAppointments().subscribe(data=>{
      this.appointments=data;
      this.filteredAppointments=data;
    });
    this.slotTimeMap = this.appointmentService.getSlotTimeMap();
  }

  ngOnInit(): void {}
  updateAppointment(appointment?: Appointment) {
    const navigationExtras: NavigationExtras = {
      state: { myObject: appointment },
    };
    this.router.navigate(['updateAppointment'], navigationExtras);
  }
  deleteAppointment(id?: string) {
    this.appointmentService.deleteAppointment(id).subscribe(data=>{
      if(data){
        this.appointments=this.appointments.filter(a=>a.appointmentId!==id);
      }
    });
  }
  getSlotTime(sno?: number) {
    return this.slotTimeMap.filter((s) => s.slotNumber === sno)[0].time;
  }
  addAppointment() {
    this.router.navigate(['addAppointment']);
  }
  searchAppointments() {
    const key = this.searchAppointment.get('searchKey')?.value;
    this.filteredAppointments = this.appointments.filter(
      (a) =>
        a.appointmentId?.toLowerCase().includes(key.toLowerCase()) ||
        a.doctorId?.toLowerCase().includes(key.toLowerCase()) ||
        a.patientId?.toLowerCase().includes(key.toLowerCase())
    );
  }
}
