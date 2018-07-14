import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import "rxjs/add/operator/catch";
import { AuthenticationService } from "@security/authentication.service";

@Injectable()
export class UserPorfileResolve implements Resolve<any> {
  constructor(private authService: AuthenticationService) {}

  resolve(route: ActivatedRouteSnapshot): Promise<any> {
    return this.authService.profileSubject.toPromise();
  }
}
