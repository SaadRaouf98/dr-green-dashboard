import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import {environment} from '../../../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class AllProductsService implements Resolve<any> {
  rows: any;
  onInvoiceListChanged: BehaviorSubject<any>;

  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
  constructor(private _httpClient: HttpClient) {
    // Set the defaults
    this.onInvoiceListChanged = new BehaviorSubject({});
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
      this._httpClient.get('api/invoice-data').subscribe((response: any) => {
        this.rows = response;
        this.onInvoiceListChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }
  getProducts(token, id) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
    return this._httpClient.get(`${environment.domain}/admin/${id}/products`, {headers});
  }
  getQty(id,token) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
    return this._httpClient.get(`${environment.domain}/admin/get-qty/${id}`, {headers});
  }
  getProductsData(token, id) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
    return this._httpClient.get(`${environment.domain}/admin/products-data/${id}`, {headers});
  }
  addQty(token, all_qty, supplier_price, id) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
    return this._httpClient.post(`${environment.domain}/admin/products-data`,
        {'all_qty': all_qty,'supplier_price': supplier_price, 'product_id': id }, {headers});
  }
  editQty(token, obj , id) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
    return this._httpClient.post(`${environment.domain}/admin/products-data/${id}`, obj,{headers});
  }
  deleteProd(token, id) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
    return this._httpClient.delete(`${environment.domain}/admin/products/${id}`, {headers});
  }
  deleteSale(token, id) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
    return this._httpClient.get(`${environment.domain}/admin/delete-from-sale/${id}`, {headers});
  }
  deleteFeature(token, id) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
    return this._httpClient.get(`${environment.domain}/admin/delete-from-feature/${id}`, {headers});
  }
  addToCart(token,id) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
    return this._httpClient.post(`${environment.domain}/admin/carts`, {'product_id':id},{headers});
  }
  addToVendorCart(token,id) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
    return this._httpClient.post(`${environment.domain}/admin/vendor/add-to-cart`, {'product_id':id},{headers});
  }
  sale(token, id, price) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
    return this._httpClient.post(`${environment.domain}/admin/add-to-sale/${id}`, {'sale_price': price},{headers});
  }
  feature(token, id) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
    return this._httpClient.post(`${environment.domain}/admin/add-to-feature/${id}`, {},{headers});
  }

}
