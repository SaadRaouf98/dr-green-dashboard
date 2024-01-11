import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';

import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../../../../environments/environment';

@Injectable()
export class SubCategoriesListService implements Resolve<any> {
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

    categories(token) {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
        return this._httpClient.get(`${environment.domain}/admin/categories`, {headers});
    }

    addSub(obj) {
        return this._httpClient.post(`${environment.domain}/admin/sub-categories`, obj);
    }
    editSub(obj, token, id) {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
        return this._httpClient.post(`${environment.domain}/admin/sub-categories/${id}`,
            obj, {headers});
    }
    subCategories(token, id) {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
        return this._httpClient.get(`${environment.domain}/admin/${id}/sub-categories`, {headers});
    }
    deleteBrand(token, id) {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
        return this._httpClient.delete(`${environment.domain}/admin/sub-categories/${id}`, {headers});
    }

}

