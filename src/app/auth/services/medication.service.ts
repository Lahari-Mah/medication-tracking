import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Details } from '../models/Details';
import { Medicine } from '../models/Medicine';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class MedicationService {

  private url = "http://localhost:3000/medicine";

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) { }

  getMedicine(
    startdate: Pick<Medicine, "startdate">,
    enddate: Pick<Medicine, "enddate">,
    patid: Pick<Medicine, "patid">
    ) {
    return this.http.get(`${this.url}/medication/?startdate=${startdate}&enddate=${enddate}&patid=${patid}`);
  }

  updateFlag(
    patid: number,
    options: any = []
  ) {
    console.log(options);
    return this.http.get(`${this.url}/medication/flag/?patid=${patid}&mediid=[${options}]`);
  }

  sharedMedicine(
    patid: Pick<Medicine, "patid">
    ) {
    return this.http.get(`${this.url}/medication/data/?patid=${patid}`);
  }
}
