import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import {environment} from "../../environments/environment";

@Injectable()
export class PleaseVerifyService  {

  constructor(private _httpClient: HttpClient) {
    // Set the defaults
  }

  sendVerification(token) {
    console.log(token)
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
    return this._httpClient.post(`${environment.domain}/email/verification-notification`,
        {}, {headers});
  }

}
