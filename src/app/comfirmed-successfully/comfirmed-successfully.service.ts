import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import {environment} from "../../environments/environment";

@Injectable()
export class ComfirmedSuccessfullyService {

  constructor(private _httpClient: HttpClient) {
    // Set the defaults
  }

  verfication(token, id) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
    return this._httpClient.get(`${environment.domain}/verify-email/${id}`, {headers});
  }

}
