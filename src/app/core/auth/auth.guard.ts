import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from 'src/app/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {

  constructor(private _userService: UserService,
    public _router: Router) { }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this._userService.isLoggedIn()) {
      this._router.navigateByUrl('/sign-in');
      this._userService.deleteToken();
      return false
    }
    return true;
  }

}
