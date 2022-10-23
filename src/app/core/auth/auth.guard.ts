import { JwtStorageService } from './../service/jwt-storage.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from 'src/app/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {

  constructor(private _jwtService: JwtStorageService,
    public _router: Router) { }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this._jwtService.isLoggedIn()) {
      this._router.navigateByUrl('/sign-in');
      this._jwtService.deleteToken();
      return false
    }
    return true;
  }

}
