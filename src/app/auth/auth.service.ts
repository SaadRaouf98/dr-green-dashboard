import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment as env} from "../../environments/environment";
import {FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {LoginModal} from "./login/login-modal";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: string = env.apiPath + 'Auth'

  constructor(private _httpClient: HttpClient) {}

  loginApi(loginForm: any): Observable<LoginModal> {
    return  this._httpClient.post<LoginModal>(`${this.baseUrl}/login`,
      loginForm)
  }
}
