import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';

import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../../../../environments/environment';

@Injectable()
export class ShippingInformationListService implements Resolve<any> {
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

    depositData(token, id) {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
        return this._httpClient.get(`${environment.domain}/admin/transactions/${id}`, {headers});
    }

    customers(token) {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
        return this._httpClient.get(`${environment.domain}/admin/users-registered-by-admin`, {headers});
    }

    customerShow(id) {
        return this._httpClient.get(`${environment.domain}/admin/show-user/${id}`);
    }

    placeOrder(token, shId, userId) {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
        return this._httpClient.post(`${environment.domain}/admin/orders`, {'shipping_id': shId, 'user_id': userId}, {headers});
    }

    shipping(token, id) {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
        return this._httpClient.get(`${environment.domain}/admin/shippings/${id}`, {headers});
    }

    deleteVendor(token, id) {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
        return this._httpClient.delete(`${environment.domain}/admin/suppliers/${id}`, {headers});
    }

    subCategories(token, id) {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
        return this._httpClient.get(`${environment.domain}/admin/${id}/sub-categories`, {headers});
    }

    brandProduct(token, id) {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
        return this._httpClient.get(`${environment.domain}/admin/all-products/${id}`, {headers});
    }

    addCustomer(token, obj) {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
        return this._httpClient.post(`${environment.domain}/admin/create-newuser`,
            obj, {headers});
    }

    editCustomer(token, id, obj) {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
        return this._httpClient.post(`${environment.domain}/admin/update-user/${id}`,
            obj, {headers});
    }

}
