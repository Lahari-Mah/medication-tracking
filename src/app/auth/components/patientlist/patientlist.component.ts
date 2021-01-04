import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isEmpty } from 'rxjs/operators';
import { DoctorService } from '../../services/doctor.service';
import { MedicationService } from '../../services/medication.service';

@Component({
  selector: 'app-patientlist',
  templateUrl: './patientlist.component.html',
  styleUrls: ['./patientlist.component.css']
})
export class PatientlistComponent implements OnInit {

  patients: any;
  medicines: any;
  patient = '';
  currentPatient = null;
  currentIndex = -1;
  key: any = 0;
  patmediv: any;
  nodata: any;
  nopatient;
  pat:any = "{}";
  detidQ: any;
  usernameQ: any;

  constructor(
    private doctorService: DoctorService,
    private router:Router,
    private route: ActivatedRoute,
    private medicationService: MedicationService
  ) { 
    this.route.paramMap.subscribe(params => {
      if (params['params']["id"] != undefined && params['params']["username"] != undefined) 
      {
           //When you come first time
           this.detidQ = params['params']['id'];
           this.usernameQ = params['params']['username'];
      }
      else 
     {
        // when reverse back. 
        this.detidQ = this.detidQ;
        this.usernameQ = this.usernameQ;
      }
    });
  }

  ngOnInit(): void {
  }

  searchPatient() {

    this.patmediv = false;
    this.nodata = false;

    if((JSON.stringify(this.patient)!=JSON.stringify(""))){          
       this.doctorService.findByPatient(this.patient,this.detidQ).subscribe(
      data => {
        this.patients = Object.values(data);
        if(JSON.stringify(this.patients)==JSON.stringify([]))
            this.nodata = true;
        console.log(data);
      },
      error => {
        console.log(error);
      });
    }
    else{
      this.patients = [];
      this.nodata = true;
    }
  }

  setActivePatient(patient, index) {
    this.currentPatient = patient;
    this.currentIndex = index;
    this.patmediv = false;
    this.nodata = false;
    this.medicationService.sharedMedicine(this.currentPatient['patid'])
    .subscribe(
      data => {
        this.medicines = data;
        if(typeof data !== 'undefined' && JSON.stringify(data)!=JSON.stringify([]))
            this.patmediv = true;
        else
            this.nodata = true;
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }
}
