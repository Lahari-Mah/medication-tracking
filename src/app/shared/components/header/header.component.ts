import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientComponent } from 'src/app/auth/components/patient/patient.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    public router: Router,
    public route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

}
