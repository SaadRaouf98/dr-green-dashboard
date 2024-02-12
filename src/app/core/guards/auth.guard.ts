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
    const token = localStorage.getItem('authToken') as string;
    const currentUser = JSON.parse(localStorage.getItem('currentUser')!);
    if (!token) {
      this.router.navigateByUrl('/auth/login');
      return false;
    } else {
      // this.router.navigateByUrl('/');
      let allowRoles = childRoute.data['roles'];
      if (allowRoles && allowRoles.indexOf(currentUser.role) === -1) {
        // role not authorised so redirect to not-authorized page
        this.router.navigate(['/auth/login']);
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
