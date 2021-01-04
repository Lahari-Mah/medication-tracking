import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, NavigationExtras, Router } from '@angular/router';
import { IntegerDataType } from 'sequelize/types';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  currentPatient = null;
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
           this.getPatient(this.detidQ,this.usernameQ);
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
    this.getPatient(id,username); //Get id from Url
    //this.router.navigate(["/patient",{id: id,username: username}],{ queryParamsHandling: "preserve" });
  }

  public onTap(id,username) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
          detid: id,
          username: username            
      }
    }
  this.router.navigate(["patient"], navigationExtras);
}

  getPatient(detid,username) {
    this.patientService.getPatient(detid,username)
      .subscribe(
        data => {
          this.currentPatient = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
}
