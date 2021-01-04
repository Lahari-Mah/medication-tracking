import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  currentDoctor = null;
  public detidQ: string;
  public usernameQ: string;

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService,
    private router: Router
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
    const id = this.route.snapshot.paramMap.get('id');
    const username =  this.route.snapshot.paramMap.get('username');
    this.getDoctor(id,username); //Get id from Url
  }

  getDoctor(detid,username) {
    this.patientService.getDoctor(detid,username)
      .subscribe(
        data => {
          this.currentDoctor = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

}
