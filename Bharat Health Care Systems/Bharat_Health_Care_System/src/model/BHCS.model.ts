import { Timestamp } from "rxjs";

export class User {
  name?: string;
  userName?: string;
  password?: string;
  role?:string;
  errorMessage?:string;
  isLoggedIn?:boolean;
  sessionId?:string;
}

export class Doctor {
  doctorId?: string;
  name?: string;
  qualification?: string;
  rating?: number;
  speciality?: string;
  mobile?: number;
  email?: string;
  hospitalId?: string;
}

export class Hospital {
  hospitalId?: string;
  name?: string;
  address?: string;
  admitCapacity?: number;
}

export class Patient {
  patientId?: string;
  name?: string;
  mobile?: number;
  email?: string;
}

export class Review{
  reviewId?:string;
  name?:string;
  review?:string;
}

export class Appointment {
  appointmentId?: string;
  patientId?: string;
  date?: Date;
  doctorId?: string;
  slotNumber?: number;
}

export class Slot {
  slotNumber?: number;
  time?: string;
}
