import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment as env} from "../../../../../environments/environment";
import {SharedService} from "../../../../core/shared/sahred-service/shared.service";
import {Departments} from "../modals/management";

@Injectable({
  providedIn: 'root'
})

export class ManagementService {
  baseUrl: string = env.apiPath + 'Department'
  constructor(private _httpClient: HttpClient, private _sharedService : SharedService) {

  }
  addLookUpsApi(body: any): Observable<any>{
    let formData = this._sharedService.formatFormData(body)
    return this._httpClient.post<any>(`${this.baseUrl}/AddNewLookUp`, formData)
  }
  updateLookUpsApi(body: any, id: number): Observable<any>{
    let formData = this._sharedService.formatFormData(body)
    return this._httpClient.put<any>(`${this.baseUrl}/EditLookUpById/${id}`, formData)
  }
  getDepartmentsApi(query: any): Observable<Departments>{
    return this._httpClient.post<Departments>(`${this.baseUrl}/GetAllDepartments`, query)
  }
  // getLookUpsByIdApi(id: number): Observable<EachLookup>{
  //   return this._httpClient.get<EachLookup>(`${this.baseUrl}/GetLookUpById/${id}`)
  // }
  // deleteApi(id: number): Observable<EachLookup>{
  //   let query = []
  //   query.push(id)
  //   return this._httpClient.post<EachLookup>(`${this.baseUrl}/DeleteLookUpRange`, query)
  // }
}
