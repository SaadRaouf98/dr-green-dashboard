import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment as env} from "../../../../../environments/environment";
import {Ads, AdsList} from "../modals/ads";
import {SharedService} from "../../../../core/shared/sahred-service/shared.service";

@Injectable({
  providedIn: 'root'
})

export class AdsService {
  baseUrl: string = env.apiPath + 'Ads'
  constructor(private _httpClient: HttpClient, private _sharedService : SharedService) {

  }
  addAdsApi(body: any): Observable<any>{
    let formData = this._sharedService.formatFormData(body)
    return this._httpClient.post<any>(`${this.baseUrl}/AddNewAds`, formData)
  }
  updateAdsApi(body: any, id: number): Observable<any>{
    let formData = this._sharedService.formatFormData(body)
    return this._httpClient.put<any>(`${this.baseUrl}/EditAdsById/${id}`, formData)
  }
  getAdsApi(query: any): Observable<Ads>{
    return this._httpClient.post<Ads>(`${this.baseUrl}/GetAllAds`,
      {}, {params: query})
  }
  getAdByIdApi(id: number): Observable<AdsList>{
    return this._httpClient.get<AdsList>(`${this.baseUrl}/GetAdsById/${id}`)
  }
  deleteAdsApi(id: number): Observable<any>{
    let body = []
    body.push(id)
    return this._httpClient.post<any>(`${this.baseUrl}/DeleteAdsRange`, body)
  }
  deleteImagesApi(id: any): Observable<any>{
    return this._httpClient.delete<any>(`${this.baseUrl}/DeleteImageByPath/${id}`)
  }
}
