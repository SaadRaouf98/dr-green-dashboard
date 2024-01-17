import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, CanActivate,
  Router
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    childRoute: ActivatedRouteSnapshot,
  ): boolean {
    const token = localStorage.getItem('QualityToken') as string;
    const currentUser = JSON.parse(localStorage.getItem('User_Login_Data')!);
    console.log(666666666666666666)
    if (!token) {

      this.router.navigateByUrl('/auth/login');
      return false;
    } else {
      let allowRoles = childRoute.data['roles'];
      if (childRoute.data['roles'] && childRoute.data['roles'].indexOf(currentUser.role) === -1) {
        // role not authorised so redirect to not-authorized page
        this.router.navigate(['401']);
        return false;
      }
      if (allowRoles == null || allowRoles.length == 0) {
        return true;
      }
      let currentRole = JSON.parse(atob(token.split('.')[1]))['roles'];
      return allowRoles.includes(currentRole) && true;
    }
  }
}
