import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import {environment} from '../../../../../environments/environment';

@Injectable()
export class OrderListService implements Resolve<any> {
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
  orders() {
    return this._httpClient.get(`${environment.domain}/admin/vendor-orders`);
  }
  deliveredOrders() {
    return this._httpClient.get(`${environment.domain}/admin/orders/all-orders-delivered`);
  }
  canceledOrders() {
    return this._httpClient.get(`${environment.domain}/admin/orders/all-orders-canceled`);
  }

  subCategories(id) {
    return this._httpClient.get(`${environment.domain}/admin/${id}/sub-categories`);
  }
  brandProduct(id) {
    return this._httpClient.get(`${environment.domain}/admin/all-products/${id}`);
  }
  addProduct(obj) {
    return this._httpClient.post(`${environment.domain}/admin/products`, obj);
  }
  cancel(id) {
    return this._httpClient.post(`${environment.domain}/admin/vendor-orders/canceled/${id}`, {});
  }
  delivered(id, storeId) {
    return this._httpClient.post(`${environment.domain}/admin/vendor-orders/delivered/${id}`, {'store_id':storeId});
  }
  storesApi() {
    return this._httpClient.get(`${environment.domain}/admin/store-address`);
  }
}
