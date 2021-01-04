import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";

import { Observable, BehaviorSubject } from "rxjs";
import { first, catchError, tap } from "rxjs/operators";

import { Login } from "../models/Login";
import { ErrorHandlerService } from "./error-handler.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = "http://localhost:3000/auth";

  isUserLoggedIn$ = new BehaviorSubject<boolean>(false);
  userId: Pick<Login, "id">;
  //loginClass = new LoginCls();
  //private parolename: Login = "patient" as Login;

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private router: Router,
    //private loginClass: Login
    ) { }

  login(
      username: Pick<Login, "username">,
      password: Pick<Login, "password">,
      role_name: Pick<Login, "role_name">
  ): Observable<{
    token: string;
    userId: Pick<Login, "id">;
  }> {
    return this.http
      .post(`${this.url}/login`, { username, password, role_name }, this.httpOptions)
      .pipe(
        first(),
        tap((tokenObject: { token: string; userId: Pick<Login, "id">; }) => {
          this.userId = tokenObject.userId;
          localStorage.setItem("token", tokenObject.token);
          this.isUserLoggedIn$.next(true);
          //console.log(this.isUserLoggedIn$ +"" +this.userId);
          if(this.userId != undefined){
          if(JSON.stringify(role_name) == JSON.stringify('patient')){
            this.router.navigate(["/patient",{id: this.userId,username: username}]);
          }
          else{
            console.log("role name doc"+role_name);
            this.router.navigate(["/doctor",{id: this.userId,username: username}]);
          }
        }
        }),
        catchError(
          this.errorHandlerService.handleError<{
            token: string;
            userId: Pick<Login, "id">;
          }>("login")
        )
    );
  }

}
