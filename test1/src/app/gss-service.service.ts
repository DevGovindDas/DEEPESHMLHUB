import { Injectable } from '@angular/core';
import { component_buttons, department, journey } from './interfaces/GssInterfaces';

@Injectable({
  providedIn: 'root'
})
export class GssServiceService {
  button_array:component_buttons[]=[
    {
      navigation_address:'#',
      parent:'facilities',
      icon:'../assets/Risk.jpg',
      label:'Risk Management'
    },
    {
      navigation_address:'#',
      parent:'facilities',
      icon:'../assets/Transport.jpg',
      label:'e-TMS'
    },
    {
      navigation_address:'#',
      parent:'facilities',
      icon:'../assets/Visitor.jpg',
      label:'VIsitor Permit'
    },
    {
      navigation_address:'#',
      parent:'finance',
      icon:'../assets/Capacity.jpg',
      label:'Capacity Management'
    },
    {
      navigation_address:'#',
      parent:'governance',
      icon:'../assets/Vaccination.jpg',
      label:'Vaccination Tracker'
    },
    {
      navigation_address:'#',
      parent:'governance',
      icon:'../assets/Record.jpg',
      label:'Record Management System'
    },
    {
      navigation_address:'#',
      parent:'governance',
      icon:'../assets/MADAD.jpg',
      label:'MADAD Advisory Support'
    },
    {
      navigation_address:'#',
      parent:'governance',
      icon:'../assets/Empower.jpg',
      label:'Empower'
    },
    {
      navigation_address:'#',
      parent:'hr',
      icon:'../assets/Leave.png',
      label:'Leave & Attendance'
    },
    {
      navigation_address:'#',
      parent:'hr',
      icon:'../assets/employee_movement.jpg',
      label:'Employee Movement'
    },
    {
      navigation_address:'#',
      parent:'hr',
      icon:'../assets/seperation_module.png',
      label:'Sepration Module'
    },
    {
      navigation_address:'#',
      parent:'hr',
      icon:'../assets/training.jpeg',
      label:'Training'
    },
    {
      navigation_address:'#',
      parent:'hr',
      icon:'../assets/ijp.jpg',
      label:'IJP'
    },
    {
      navigation_address:'/p4p',
      parent:'hr',
      icon:'../assets/p4p.jpg',
      label:'P4P'
    },
    
    {
      navigation_address:'#',
      parent:'hr',
      icon:'../assets/yourjourney.png',
      label:'Your Journey'
    },
    {
      navigation_address:'#',
      parent:'hr',
      icon:'../assets/resolve.webp',
      label:'I-RESOLVE'
    },
    {
      navigation_address:'#',
      parent:'hr',
      icon:'../assets/HrEmployee.png',
      label:'HR Employee Letters'
    },
    {
      navigation_address:'#',
      parent:'hr',
      icon:'../assets/employeecertificate.jpg',
      label:'Employee Certificate'
    },
    {
      navigation_address:'#',
      parent:'hr',
      icon:'../assets/employeebenefits.jpg',
      label:'Employee Benefits'
    },
    {
      navigation_address:'#',
      parent:'hr',
      icon:'../assets/personalinformation.jpg',
      label:'Personal Information'
    },
    {
      navigation_address:'#',
      parent:'hr',
      icon:'../assets/questionmark.jpg',
      label:'Question Mark'
    },
    {
      navigation_address:'#',
      parent:'hr',
      icon:'../assets/onepeopleplace.jpg',
      label:'One People Place'
    },
    {
      navigation_address:'#',
      parent:'hr',
      icon:'../assets/center stage.jpg',
      label:'Center Stage'
    },
    {
      navigation_address:'#',
      parent:'hr',
      icon:'../assets/ascenthr.jpg',
      label:'Ascent HR'
    },
    {
      navigation_address:'#',
      parent:'hr',
      icon:'../assets/lettergeneration.jpg',
      label:'Letter Generation'
    },
    {
      navigation_address:'#',
      parent:'it',
      icon:'../assets/Empower.jpg',
      label:'Team Enablement Tracking'
    },
    {
      navigation_address:'#',
      parent:'it',
      icon:'fa-thermometer',
      label:'Surveys'
    },
    {
      navigation_address:'#',
      parent:'it',
      icon:'fa-thermometer',
      label:'IT Security Group'
    },
    {
      navigation_address:'#',
      parent:'migrations',
      icon:'fa-thermometer',
      label:'EDS'
    },
    {
      navigation_address:'#',
      parent:'quality',
      icon:'fa-thermometer',
      label:'Assurance & Reporting Tool(ART)'
    },
    {
      navigation_address:'#',
      parent:'quality',
      icon:'fa-thermometer',
      label:'CMMI SVC 2.0'
    },
    {
      navigation_address:'#',
      parent:'quality',
      icon:'fa-thermometer',
      label:'QA Form Dashboard'
    },
    {
      navigation_address:'#',
      parent:'favourite',
      icon:'fa-thermometer',
      label:'Vaccination Tracker'
    },
    {
      navigation_address:'#',
      parent:'favourite',
      icon:'fa-thermometer',
      label:'Record Management System'
    },
    {
      navigation_address:'#',
      parent:'favourite',
      icon:'fa-thermometer',
      label:'Leave & Attendance'
    },
  ];

  all_departments:department[]=[
    {
      icon:'../assets/facility.jpg',
      label:'Facilities'
    },
    {
      icon:'../assets/finance.jpg',
      label:'Finance'
    },
    {
      icon:'../assets/Governance.jpg',
      label:'Governance'
    },
    {
      icon:'../assets/Hr.jpg',
      label:'HR'
    },
    {
      icon:'../assets/It.jpg',
      label:'IT'
    },
    {
      icon:'../assets/Migrations.jpg',
      label:'Migrations'
    },
    {
      icon:'../assets/Quality.webp',
      label:'Quality'
    },
    {
      icon:'../assets/favorite.png',
      label:'Favourite'
    }
  ];
  all_journeys:journey[]=[
    {
      image:"../assets/amitabh.jpg",
      name:'Vyom Vasishth',
      experience:5
    },
    {
      image:'',
      name:'Amit Kumar',
      experience:5
    },
    {
      image:'',
      name:'Ramanujam',
      experience:5
    },
    {
      image:'../assets/Suraj-Sharma.jpg',
      name:'Naveen Kumar',
      experience:5
    },
    {
      image:'../assets/Lion.jpg',
      name:'Ekta Kumari',
      experience:5
    },
  ]

  constructor() { }
  get_all_buttons():component_buttons[]{
    return this.button_array;
  }
  get_all_departments():department[]{
    return this.all_departments;
  }
  get_all_journeys():journey[]{
    return this.all_journeys;
  }
}
