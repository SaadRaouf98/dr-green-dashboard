import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { User, Role } from 'app/auth/models';
import { ToastrService } from 'ngx-toastr';
@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  //public
  public currentUser: Observable<User>;
  //private
  private currentUserSubject: BehaviorSubject<User>;
  /**
   *
   * @param {HttpClient} _http
   * @param {ToastrService} _toastrService
   */
  constructor(private _http: HttpClient, private _toastrService: ToastrService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON?.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  // getter: currentUserValue
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
  /**
   *  Confirms if user is admin
   */
  get isAdmin() {
    return this.currentUser && this.currentUserSubject.value.role === Role.Admin;
  }
  /**
   *  Confirms if user is client
   */
  get isClient() {
    return this.currentUser && this.currentUserSubject.value.role === Role.Client;
  }
  /**
   * User login
   *
   * @param email
   * @param password
   * @returns user
   */
  login(email: string, password: string) {
    return this._http
      .post<any>(`${environment.domain}/admin/login`, { email, password })
      .pipe(
        map(user => {
          console.log(user);
          // login successful if there's a jwt token in the response
          if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            // localStorage.setItem('avatar1', JSON.stringify(user));
            // Display welcome toast!
            setTimeout(() => {
              this._toastrService.success(
                'You have successfully logged in as an ' +
                  user.role +
                  ' user to Vuexy. Now you can start to explore. Enjoy! 🎉',
                '👋 Welcome, ' + user.firstName + '!',
                { toastClass: 'toast ngx-toastr', closeButton: true }
              );
            }, 2500);

            // notify
            this.currentUserSubject.next(user);
          }
          return user;
        })
      );
  }
  /**
   * User logout
   *
   */
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    // notify
    this.currentUserSubject.next(null);
  }
  createAccount(email, password, first_name, last_name) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(`${environment.domain}/admin/register`, {
      'email': email,
      'password': password,
      'first_name': first_name,
      'last_name': last_name,
    }, {headers});
  }
  emailCheck(email) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ').set('Accept', 'application/json');
    return this._http.post(`${environment.domain}/admin/check-email`,
        {'email': email}, {headers});
  }
  usernameCheck(username) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' ).set('Accept', 'application/json');
    return this._http.post(`${environment.domain}/admin/check-username`,
        {'username': username}, {headers});
  }
  phoneCheck(phone) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ').set('Accept', 'application/json');
    return this._http.post(`${environment.domain}/admin/check-phone`,
        {'phone': phone}, {headers});
  }
  profile(token) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
    return this._http.get(`${environment.domain}/admin/admin-profile`, {headers});
  }
}
