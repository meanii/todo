import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthData } from '../auth.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  // Loading var
  isLoading: boolean = false
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  onSignUp(form: NgForm){
    if(form.invalid){
      return;
    }

    const auth: AuthData = {
      email: form.value.email,
      password: form.value.password
    }

    this.authService.createUser(auth)

  }

}
