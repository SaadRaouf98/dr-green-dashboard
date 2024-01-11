import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import {environment} from '../../../../../environments/environment';

@Injectable()
export class ProductsEditFormService implements Resolve<any> {
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
  getProductsPreview(token,id) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
    return this._httpClient.get(`${environment.domain}/admin/products/${id}`, {headers});
  }
  categories(token) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
    return this._httpClient.get(`${environment.domain}/admin/categories`, {headers});
  }
  storesApi(token) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
    return this._httpClient.get(`${environment.domain}/admin/store-address`, {headers});
  }
  subCategories(token, id) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
    return this._httpClient.get(`${environment.domain}/admin/${id}/sub-categories`, {headers});
  }
  updateProduct(token, obj, id) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
    return this._httpClient.post(`${environment.domain}/admin/products/${id}`,
        obj, {headers});
  }

}
