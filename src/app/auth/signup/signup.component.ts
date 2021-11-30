import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthData } from '../auth.model';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit,  OnDestroy {

  private authListenerSubs: Subscription;
  // Loading var
  isLoading: boolean = false
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.authListenerSubs = this.authService
    .getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.isLoading = isAuthenticated;
    })
  }


  onSignUp(form: NgForm){
    if(form.invalid){
      return;
    }

    const auth: AuthData = {
      email: form.value.email,
      password: form.value.password
    }

    this.authService.createUser(auth);

  }


  ngOnDestroy(){
    this.authListenerSubs.unsubscribe();
  }

}
