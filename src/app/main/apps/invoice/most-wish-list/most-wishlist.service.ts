import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../../../../environments/environment';

@Injectable()
export class MostWishlistService {
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

    addAttribute(name, token) {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
        return this._httpClient.post(`${environment.domain}/admin/product-attributes`, {'name': name }, {headers});
    }
    wish(token) {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
        return this._httpClient.get(`${environment.domain}/admin/wishlist`, {headers});
    }
    editAttribute(token, name, id) {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
        return this._httpClient.post(`${environment.domain}/admin/product-attributes/${id}`,
            {'name': name, }, {headers});
    }
    deleteAtt(token, id) {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
        return this._httpClient.delete(`${environment.domain}/admin/product-attributes/${id}`, {headers});
    }

}
