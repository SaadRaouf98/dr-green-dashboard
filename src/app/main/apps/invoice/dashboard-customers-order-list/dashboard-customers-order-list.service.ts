import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';

import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../../../../environments/environment';

@Injectable()
export class DashboardCustomersOrderListService implements Resolve<any> {
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
        const currentId = Number(route.paramMap.get('id'));
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

    placedOrders(token) {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
        return this._httpClient.get(`${environment.domain}/admin/orders`, {headers});
    }

    preparingOrders(token) {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
        return this._httpClient.get(`${environment.domain}/admin/orders-preparing`, {headers});
    }

    onTheWay(token) {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
        return this._httpClient.get(`${environment.domain}/admin/orders-on-the-way`, {headers});
    }

    deliveredOrders(token) {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
        return this._httpClient.get(`${environment.domain}/admin/orders-delivered`, {headers});
    }

    canceledOrders(token) {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
        return this._httpClient.get(`${environment.domain}/admin/orders-canceled`, {headers});
    }

    backOrders(token) {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
        return this._httpClient.get(`${environment.domain}/admin/back-items`, {headers});
    }

    addBack(token, id) {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
        return this._httpClient.get(`${environment.domain}/admin/back-items/add-to-cart/${id}`, {headers});
    }

    subCategories(token, id) {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
        return this._httpClient.get(`${environment.domain}/admin/${id}/sub-categories`, {headers});
    }

    brandProduct(token, id) {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
        return this._httpClient.get(`${environment.domain}/admin/all-products/${id}`, {headers});
    }

    addProduct(token, obj) {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
        return this._httpClient.post(`${environment.domain}/admin/products`,
            obj, {headers});
    }

    submit(token, id) {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
        return this._httpClient.post(`${environment.domain}/admin/orders/${id}`, {headers});
    }

    cancel(token, id) {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
        return this._httpClient.post(`${environment.domain}/admin/vendor-orders/canceled/${id}`, {}, {headers});
    }

    ChangeStatus(token, status, date, id) {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
        return this._httpClient.post(`${environment.domain}/admin/orders/${id}`, {'status': status, 'arrival_date': date}, {headers});
    }

}
