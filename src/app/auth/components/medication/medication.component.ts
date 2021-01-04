import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MedicationService } from '../../services/medication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medication',
  templateUrl: './medication.component.html',
  styleUrls: ['./medication.component.css']
})
export class MedicationComponent implements OnInit {

  public username: string
  public detid: any;
  medicForm: FormGroup;
  currentMedicine = null;
  options: any = []
  patientid: any;
  mediv: any;
  nodata: any;
  id: any;
  isSelected: any;

  constructor(
    private route: ActivatedRoute,
    private medicationService: MedicationService
  ) {
    this.route.paramMap.subscribe(params => {
      if (params['params']["id"] != undefined && params['params']["username"] != undefined) {
        //When you come first time
        this.detid = params['params']['id'];
        this.username = params['params']['username'];
      }
      else {
        // when reverse back. 
        this.detid = this.detid;
        this.username = this.username;
      }
    });
  }

  ngOnInit(): void {
    this.medicForm = this.medicFormGroup();
  }

  medicFormGroup(): FormGroup {
    return new FormGroup({
      startdate: new FormControl("", [Validators.required]),
      enddate: new FormControl("", [Validators.required])
    });
  }

  medicList(): void {
    this.mediv = false;
    this.nodata = false;
    this.id = this.route.snapshot.paramMap.get('id');

    this.medicationService
      .getMedicine(this.medicForm.value.startdate, this.medicForm.value.enddate, this.detid)
      .subscribe(data => {
        this.currentMedicine = data;
        if (typeof data !== 'undefined' && JSON.stringify(data) != JSON.stringify([]))
          this.mediv = true;
        else
          this.nodata = true;
        console.log(data);
      },
        error => {
          console.log(error);
        });
  }

  getProduct(isSelected, mediid, patid) {

    if (isSelected) {
      this.options.push(mediid);
      this.patientid = patid;
      this.isSelected = isSelected;
    } else {
      const index: number = this.options.indexOf(mediid);
      this.options.splice(index, 1);
      this.isSelected=false;
    }

  }

  shareFlag(): void {

    this.medicationService
      .updateFlag(this.patientid, this.options)
      .subscribe(data => {
        console.log(data)
      },
        error => {
          console.log(error);
        });
  }

  successNotification(){
    
    if(this.isSelected){
      Swal.fire('Patient Medication', 'Data been shared successfully!', 'success'); 
      this.medicList();
      this.isSelected=false;
    }
    else{
      Swal.fire('Please select medications that to be shared...')
    }
  }

}
