import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { createThis } from 'typescript';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginvalid: any;
  error: any;

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      loginUsername: new FormControl("", [Validators.required]),
      loginPassword: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
      ]),
      loginRadio: new FormControl("",[Validators.required])
    });
  }
  
  // Getter method to access form control
  get myForm() {
    return this.loginForm.get('loginRadio');
  }

  login(): void {
    this.loginvalid = false;
    this.authService
      .login(this.loginForm.value.loginUsername, this.loginForm.value.loginPassword, this.loginForm.value.loginRadio)
      .subscribe((msg) => {
        console.log(msg);
        this.error = msg;

        if(this.error.status == "error"){
          this.loginvalid =  true;
        }
      },error => {
        console.log(error);
      });
  }
}
