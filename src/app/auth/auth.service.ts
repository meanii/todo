import { Injectable } from "@angular/core"
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { AuthData } from "./auth.model"
import { Subject } from "rxjs";
import { DateAdapter } from "@angular/material/core";

@Injectable({ providedIn: "root"})
export class AuthService {

  private token: string;
  private authStatus: boolean
  tokenTimer = null;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router){

  }

  getAuthStatus(){
    return this.authStatus;
  }

  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }

  getToken(){
    return this.token
  }

  // login user AP request
  loginUser(authData: AuthData){
    console.log(authData)
    this.http.post<{status:{}, data: {token: string, expiresIn: number}}>('http://localhost:2000/api/users/login', authData)
    .subscribe(resp => {
      console.log(resp);
      this.token = resp.data.token;
      if(this.token){
        const expiresIn = resp.data.expiresIn;

        this.tokenTimer = setTimeout(() => {
          this.logout();  // logout after 1hr
        }, expiresIn * 1000)

        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresIn*1000);
        this.saveAuthData(this.token, expirationDate)
        this.authStatusListener.next(true);
        this.authStatus = true
        this.router.navigate(['/'])
      }
    })
  }

  // create user API request
  createUser(authData: AuthData){
    console.log(authData)
    this.http.post('http://localhost:2000/api/users/signup', authData)
    .subscribe(resp => {
      console.log(resp)
      this.router.navigate(['/'])
    })
  }

  autoAuthUser(){
    const authInfo = this.getAuthData();
    if(authInfo){
      const expiresIn = authInfo.expirationDate.getTime() - (new Date()).getTime();
      if(expiresIn > 0){
        this.token = authInfo.token;
        this.authStatus = true

        this.tokenTimer = setTimeout(() => {
          this.logout();  // logout after 1hr
        }, expiresIn)

        this.authStatusListener.next(true);
      }

    }
  }

  // Logout
  logout(){
    this.token = null;
    this.authStatus = false;
    this.authStatusListener.next(false)
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/'])
  }

  private saveAuthData(token: string, expirationDate: Date){
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
  }

  private clearAuthData(){
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
  }

  private getAuthData(){
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration")
    if(token){
      return {
        token: token,
        expirationDate: new Date(expirationDate)
      }
    }
  }

}

