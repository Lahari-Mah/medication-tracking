import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemoComponent } from './components/demo/demo.component';
import { DoctorComponent } from './components/doctor/doctor.component';
import { LoginComponent } from './components/login/login.component';
import { MedicationComponent } from './components/medication/medication.component';
import { PatientComponent } from './components/patient/patient.component';
import { PatientlistComponent } from './components/patientlist/patientlist.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'patient', component: PatientComponent},
  { path: 'patient/medication', component: MedicationComponent},
  { path: 'doctor', component: DoctorComponent},
  { path: 'aboutus',component: DemoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
