import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import {environment} from '../../../../../environments/environment';

@Injectable()
export class ReportsEditService implements Resolve<any> {
  apiData: any;
  onInvoicEditChanged: BehaviorSubject<any>;
  id;

  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
  constructor(private _httpClient: HttpClient) {
    // Set the defaults
    this.onInvoicEditChanged = new BehaviorSubject({});
  }

  /**
   * Resolver
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<any> | Promise<any> | any}
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    let currentId = Number(route.paramMap.get('id'));
    return new Promise<void>((resolve, reject) => {
      Promise.all([this.getApiData(currentId)]).then(() => {
        resolve();
      }, reject);
    });
  }

  /**
   * Get API Data
   */
  getApiData(id: number): Promise<any[]> {
    const url = `api/invoice-data/${id}`;
    this.id = id;
    return new Promise((resolve, reject) => {
      this._httpClient.get(url).subscribe((response: any) => {
        this.apiData = response;
        this.onInvoicEditChanged.next(this.apiData);
        resolve(this.apiData);
      }, reject);
    });
  }
  categories(token) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
    return this._httpClient.get(`${environment.domain}/expenses-categories`, {headers});
  }

  items(token, id) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
    return this._httpClient.get(`${environment.domain}/filters/expenses-items/${id}`, {headers});
  }
  depositsCategories(token) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
    return this._httpClient.get(`${environment.domain}/deposits-categories`, {headers});
  }

  depositsItems(token, id) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
    return this._httpClient.get(`${environment.domain}/deposits-items/${id}`, {headers});
  }
  accounts(token) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
    return this._httpClient.get(`${environment.domain}/accounts`, {headers});
  }
  search(data, token) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
    return this._httpClient.post(`${environment.domain}/filters/search`, data, {headers});
  }
  balanceSheet(token, data){
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
    let query = '?';
    if (data.date) {
      query += '&date=' + data.date;
    }
    if (data.from) {
      query += '&from=' + data.from;
    }
    if (data.to) {
      query += '&to=' + data.to;
    }
    if (data.account_id) {
      query += '&account_id=' + data.account_id;
    }
    if (query.length<2){
      query='';
    }
    return this._httpClient.get(`${environment.domain}/reports/balance-sheet`+ query, {headers});
  }

}
