import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';

import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../../../../environments/environment';

@Injectable()
export class CouponListService {
    rows: any;
    onInvoiceListChanged: BehaviorSubject<any>;
    constructor(private _httpClient: HttpClient) {
        this.onInvoiceListChanged = new BehaviorSubject({});
    }

    getDataTableRows(): Promise<any[]> {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/invoice-data').subscribe((response: any) => {
                this.rows = response;
                this.onInvoiceListChanged.next(this.rows);
                resolve(this.rows);
            }, reject);
        });
    }

    addCoupon(obj, token) {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
        return this._httpClient.post(`${environment.domain}/admin/coupons`, obj, {headers});
    }
    categories(token) {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
        return this._httpClient.get(`${environment.domain}/admin/categories`, {headers});
    }
    coupons(token) {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
        return this._httpClient.get(`${environment.domain}/admin/coupons`, {headers});
    }
    editCoupon(obj, token, id) {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
        return this._httpClient.post(`${environment.domain}/admin/coupons/${id}`,
            obj, {headers});
    }
    activeCoupon(token, active, id) {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
        return this._httpClient.post(`${environment.domain}/admin/activate-coupon/${id}`,
            {'status':active}, {headers});
    }
    disactiveCoupon(token, disactive, id) {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
        return this._httpClient.post(`${environment.domain}/admin/activate-coupon/${id}`,
            {'status':disactive}, {headers});
    }
    deleteCoupon(token, id) {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
        return this._httpClient.delete(`${environment.domain}/admin/coupons/${id}`, {headers});
    }
    subCategories(token, id) {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
        return this._httpClient.get(`${environment.domain}/admin/${id}/sub-categories`, {headers});
    }
    products(token, id1, id2) {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
        return this._httpClient.get(`${environment.domain}/admin/all-products/${id2}/${id1}`, {headers});
    }

}
