import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { PatientComponent } from './components/patient/patient.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MedicationComponent } from './components/medication/medication.component';
import { DoctorComponent } from './components/doctor/doctor.component';
import { PatientlistComponent } from './components/patientlist/patientlist.component';
import { DemoComponent } from './components/demo/demo.component';

@NgModule({
  declarations: [
    LoginComponent, PatientComponent, MedicationComponent,
    DoctorComponent, PatientlistComponent,DemoComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    LoginComponent,
    PatientComponent,
    DoctorComponent
  ]
})
export class AuthModule { }
