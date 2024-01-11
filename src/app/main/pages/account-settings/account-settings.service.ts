import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import {environment} from '../../../../environments/environment';

@Injectable()
export class AccountSettingsService implements Resolve<any> {
  rows: any;
  onSettingsChanged: BehaviorSubject<any>;

  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
  constructor(private _httpClient: HttpClient) {
    // Set the defaults
    this.onSettingsChanged = new BehaviorSubject({});
  }

  /**
   * Resolver
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<any> | Promise<any> | any}
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise<void>((resolve, reject) => {
      Promise.all([this.getDataTableRows()]).then(() => {
        resolve();
      }, reject);
    });
  }

  /**
   * Get rows
   */
  getDataTableRows(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient.get('api/account-settings-data').subscribe((response: any) => {
        this.rows = response;
        this.onSettingsChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }
  accountSettings(obj, token) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json').set('Accept-Encoding', 'gzip, deflate, br');
    return this._httpClient.post(`${environment.domain}/admin/update-profile`, obj, {headers});
  }
  profile(token) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
    return this._httpClient.get(`${environment.domain}/admin/admin-profile`, {headers});
  }
}

