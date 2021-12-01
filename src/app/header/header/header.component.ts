import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private authListenerSubs: Subscription;
  public userIsAuthenticated: boolean = false;
  constructor(private authService: AuthService, private router: Router){

  }

  ngOnInit(){
    this.userIsAuthenticated = this.authService.getAuthStatus();
    this.authListenerSubs = this.authService
    .getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    })
  }



  onLogOut(){
    this.authService.logout();
  }


  ngOnDestroy(){
    this.authListenerSubs.unsubscribe();
  }

}
