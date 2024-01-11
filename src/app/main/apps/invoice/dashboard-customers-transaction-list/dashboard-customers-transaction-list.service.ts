import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {environment} from '../../../../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable()
export class DashboardCustomersTransactionListService implements Resolve<any> {
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

    customers(token) {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
        return this._httpClient.get(`${environment.domain}/admin/users-registered-by-admin`, {headers});
    }

    transaction(token, obj) {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
        return this._httpClient.post(`${environment.domain}/admin/customer-transactions`
            , obj, {headers});
    }

    invoices(token, id) {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
        return this._httpClient.get(`${environment.domain}/admin/customer-transactions/get-invoices/${id}`, {headers});
    }

    invoices2(token, id) {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
        return this._httpClient.get(`${environment.domain}/admin/customer-transactions/get-invoices/${id}`, {headers});
    }

    subCategories(token, id) {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
        return this._httpClient.get(`${environment.domain}/admin/${id}/sub-categories`, {headers});
    }

    transactionEdit(token, id, obj) {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
        return this._httpClient.post(`${environment.domain}/admin/customer-transactions/update/${id}`,
            obj, {headers});
    }

    addTransaction(token, obj) {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
        return this._httpClient.post(`${environment.domain}/admin/customer-transactions/add`,
            obj, {headers});
    }
}
