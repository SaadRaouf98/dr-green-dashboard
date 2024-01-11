import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';

import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../../../../environments/environment';

@Injectable()
export class CategoriesListService {
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

    addCategories(name, description, token) {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
        return this._httpClient.post(`${environment.domain}/admin/categories`,
            {
                'name': name,
                'description': description,
            },
            {headers}
        );
    }
    categories(token) {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
        return this._httpClient.get(`${environment.domain}/admin/categories`, {headers});
    }
    editCategories(obj, token, id) {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
        return this._httpClient.post(`${environment.domain}/admin/categories/${id}`,
            obj, {headers});
    }
    deleteCat(token, id) {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
        return this._httpClient.delete(`${environment.domain}/admin/categories/${id}`, {headers});
    }

}
