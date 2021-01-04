import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { Details } from '../models/Details';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private url = "http://localhost:3000/details";

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };
  
  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private router: Router
  ) { }

  getPatient(
    detid: Pick<Details, "detid">,
    username: Pick<Details, "username">
    ) {
    return this.http.get(`${this.url}/patient/?detid=${detid}&username=${username}`);
  }

  getDoctor(
    detid: Pick<Details, "detid">,
    username: Pick<Details, "username">
    ) {
    return this.http.get(`${this.url}/doctor/?detid=${detid}&username=${username}`
    );
  }
}
