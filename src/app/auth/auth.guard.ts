import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    const isAuth = this.authService.getAuthStatus();

    let routerPath = route.routeConfig?.path.split('/')[0]
    if(isAuth){
      if(routerPath == 'login' || routerPath == 'signup') {
        this.router.navigate(['/'])
        return false;
      }
    } else {
      if(routerPath == 'create' || routerPath == 'edit') {
        this.router.navigate(['/'])
        return false;
      }
    }
    return true;
  }
}
