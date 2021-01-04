import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private url = "http://localhost:3000/patientlist";

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };
  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    ) { }


  findByPatient(
    patname: any,
    doctid: any
    ) {
    return this.http.get(`${this.url}/doctor/?patname=${patname}&doctid=${doctid}`);
  }
}
