import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';

import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../../../../environments/environment';

@Injectable()
export class FaqService {
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

    addFAQSApi(obj) {
        return this._httpClient.post(`${environment.domain}/admin/faqs`, obj);
    }
    FAQSApi() {
        return this._httpClient.get(`${environment.domain}/admin/faqs`);
    }
    editFAQSApi(obj, id) {
        return this._httpClient.post(`${environment.domain}/admin/faqs/${id}`, obj);
    }
    deleteFAQSApi(id) {
        return this._httpClient.delete(`${environment.domain}/admin/faqs/${id}`);
    }

}
