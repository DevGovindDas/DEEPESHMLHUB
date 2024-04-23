import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { Appointment, Slot } from 'src/model/BHCS.model';
import { AppointmentService } from '../service/services';
import { NavigationExtras, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css'],
})
export class AppointmentComponent implements OnInit,OnChanges {
  appointments: Appointment[] = [];
  filteredAppointments: Appointment[] = [];
  slotTimeMap: Slot[] = [];
  appointmentService: AppointmentService = inject(AppointmentService);
  searchAppointment: FormGroup;
  constructor(private router: Router, private formBuilder: FormBuilder,private cdr:ChangeDetectorRef) {
    this.searchAppointment = this.formBuilder.group({
      searchKey: [''],
    });
    this.appointmentService.getAllAppointments().subscribe(data=>{
      this.appointments=data;
      this.filteredAppointments=data;
    });
    this.slotTimeMap = this.appointmentService.getSlotTimeMap();
  }
  ngOnChanges(changes: SimpleChanges): void {
   
  }

  ngOnInit(): void {

  }
 
  deleteAppointment(id?: string) {
    this.appointmentService.deleteAppointment(id).subscribe(data=>{
      if(data){
        this.filteredAppointments=this.appointments.filter(a=>a.appointmentId!==id);
      }
      this.cdr.detectChanges();
    },error=>{console.log('Error Deleting Row',error)});
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
