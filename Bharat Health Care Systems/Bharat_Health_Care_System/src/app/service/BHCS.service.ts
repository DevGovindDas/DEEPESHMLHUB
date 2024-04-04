import { Injectable } from "@angular/core";
import { User } from "../BHCSInterface";
import { Doctor } from "src/model/BHCS.model";

@Injectable({
    providedIn:'root' 
})export class BHCSService{
    constructor(){   
    }
    doctors:Doctor[]=[{
        id:1,name:"doctor1",qualification:"qual1",rating:3,speciality:"Heart",mobile:8955405625,email:"abc@xyz.com"
    },
    {
        id:2,name:"doctor2",qualification:"qual2",rating:4,speciality:"Kidney",mobile:8955405624,email:"abc1@xyz.com"
    }]
    private registeredUsers:User[]=[{userName:"user1@x.com",password:"Pwd1!"},{userName:"user2@y.com",password:"Pwd2!"}];
    userLogin(userName:string,password:string):string{
        for(var i=0;i<this.registeredUsers.length;i++){
            if(this.registeredUsers[i].userName===userName){
                if(this.registeredUsers[i].password!==password) return 'IP';else return 'Success'
            }
        }
        return 'UDE';
    }
    private registeredAdmins:User[]=[{userName:"user1@x.com",password:"Pwd1!"},{userName:"user2@y.com",password:"Pwd2!"}];
    adminLogin(userName:string,password:string):string{
        for(var i=0;i<this.registeredAdmins.length;i++){
            if(this.registeredAdmins[i].userName===userName){
                if(this.registeredAdmins[i].password!==password) return 'IP';else return 'Success'
            }
        }
        return 'UDE';
    }
    getSearchedDoctors():Doctor[]{
        return this.doctors;
    }

    addDoctor(doctor:Doctor):Doctor{
        doctor.id=Date.now();
        doctor.rating=0;
        this.doctors=[...this.doctors,doctor]
        return doctor;
    }
    updateDoctor(doctor:Doctor):string{
        const result=this.doctors.filter((doctor1)=>doctor.id===doctor1.id)[0];
        if(result===null) return 'doctor with this id does not exist';
        this.doctors=this.doctors.map((doctor1)=>doctor1.id===doctor.id?doctor:doctor1)
        return 'updated succesfully';
    }

    deleteDoctor(id?:number):string{
        const result=this.doctors.filter((doctor1)=>id===doctor1.id)[0];
        if(result===null) return 'doctor with this id does not exist';
        this.doctors=this.doctors.filter((doctor1)=>doctor1.id!==id)
        return 'deleted succesfully';
    }
    searchDoctor(key:string):Doctor[]{
        return this.doctors.filter((doc)=>(doc.id?.toLocaleString().toLocaleLowerCase().includes(key)||doc.name?.toLocaleString().toLocaleLowerCase().includes(key)||doc.mobile?.toLocaleString().toLocaleLowerCase().includes(key)||doc.speciality?.toLocaleString().toLocaleLowerCase().includes(key)||doc.qualification?.toLocaleString().toLocaleLowerCase().includes(key)))
    }
}