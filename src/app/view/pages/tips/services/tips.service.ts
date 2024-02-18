import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment as env} from "../../../../../environments/environment";
import {SharedService} from "../../../../core/shared/sahred-service/shared.service";
import {Departments, TipById, TipByIdData, Tips} from "../modals/tips";

@Injectable({
  providedIn: 'root'
})
export class TipsService {
  baseUrl: string = env.apiPath + 'Tips'
  constructor(private _httpClient: HttpClient, public _sharedService: SharedService,) {

  }
  addTipsApi(body: any): Observable<any>{
    let form = this._sharedService.formatFormData(body)
    return this._httpClient.post<any>(`${this.baseUrl}/AddNewTips`, form)
  }
  getDepartmentTipsApi(): Observable<Departments>{
    return this._httpClient.get<Departments>(`${this.baseUrl}/GetAllTipsDepartment`)
  }
  updateTipsApi(body: any, id: number): Observable<any>{
    let form = this._sharedService.formatFormData(body)
    return this._httpClient.put<any>(`${this.baseUrl}/EditTipsById/${id}`, form)
  }
  getTipsApi(query: any): Observable<Tips>{
    return this._httpClient.post<Tips>(`${this.baseUrl}/GetAllTips`, query)
  }
  deleteTipsApi(id: any): Observable<any>{
    let body = []
    body.push(id)
    return this._httpClient.post<any>(`${this.baseUrl}/DeleteTipsRange`,body)
  }
  getTipsForListApi(): Observable<any>{
    return this._httpClient.get<any>(`${this.baseUrl}/GetAllTipsWithoutPagination`)
  }
  getTipsByIdApi(id: number): Observable<TipById>{
    return this._httpClient.get<TipById>(`${this.baseUrl}/GetTipsById/${id}`)
  }
}
