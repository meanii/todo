import { Component, OnDestroy, OnInit } from '@angular/core';
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
  constructor(private authService: AuthService){

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

  setColor(event){
    console.log(event)
  }

  ngOnDestroy(){
    this.authListenerSubs.unsubscribe();
  }

}
