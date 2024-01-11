import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from                                                                            '@angular/router';

import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

@Injectable()
export class StoresService {
    // Public
    public apiData: any;
    public onApiDataChanged: BehaviorSubject<any>;
    private _http: any;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private _httpClient: HttpClient) {
        // Set the defaults
        this.onApiDataChanged = new BehaviorSubject({});
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
            Promise.all([this.getApiData()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * Get Api Data
     */
    getApiData(): Promise<any[]> {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/dashboard-data').subscribe((response: any) => {
                this.apiData = response;
                this.onApiDataChanged.next(this.apiData);
                resolve(this.apiData);
            }, reject);
        });
    }
    getStoresApi(token) {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
        return this._httpClient.get(`${environment.domain}/admin/store-address`, {headers});
    }

    addCategories(obj, token) {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
        return this._httpClient.post(`${environment.domain}/admin/store-address`,
            obj, {headers});
    }

    editCategories(obj, token, id) {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
        return this._httpClient.post(`${environment.domain}/admin/store-address/${id}`,
            obj, {headers});
    }
    deleteCat(token, id) {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Accept', 'application/json');
        return this._httpClient.delete(`${environment.domain}/admin/store-address/${id}`, {headers});
    }


}
