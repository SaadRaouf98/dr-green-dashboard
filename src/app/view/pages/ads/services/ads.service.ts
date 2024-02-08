import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment as env} from "../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class AdsService {
  baseUrl: string = env.apiPath + 'Ads'
  constructor(private _httpClient: HttpClient) {

  }
  addAdsApi(body: any): Observable<any>{
    return this._httpClient.post<any>(`${this.baseUrl}/Register`, body)
  }
}
