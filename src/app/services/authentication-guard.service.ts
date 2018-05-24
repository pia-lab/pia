import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthenticationGuardService implements CanActivate {

  constructor(public authService: AuthenticationService, public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {

    let promise = this.authService.isAuthenticated();

    promise.then((response) => {
      if (!response) {
        this.router.navigate(['']);
      }
    });

    return promise;
  }
}
