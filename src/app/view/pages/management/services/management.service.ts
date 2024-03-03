import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment as env} from "../../../../../environments/environment";
import {SharedService} from "../../../../core/shared/sahred-service/shared.service";
import {Departments, EachDepartment} from "../modals/management";

@Injectable({
  providedIn: 'root'
})

export class ManagementService {
  baseUrl: string = env.apiPath
  constructor(private _httpClient: HttpClient, private _sharedService : SharedService) {

  }
  addDepartmentApi(body: any): Observable<any>{
    let formBody = this._sharedService.formatBody(body)
    console.log(formBody)
    return this._httpClient.post<any>(`${this.baseUrl}Department/AddNewDepartment`, formBody)
  }
  updateDepartmentApi(body: any, id: number): Observable<any>{
    // let formData = this._sharedService.formatFormData(body)
    return this._httpClient.put<any>(`${this.baseUrl}Department/EditLookUpById/${id}`, body)
  }
  getDepartmentsApi(query: any): Observable<Departments>{
    return this._httpClient.post<Departments>(`${this.baseUrl}Department/GetAllDepartments`, query)
  }
  getDepartmentByIdApi(id: number): Observable<EachDepartment>{
    return this._httpClient.get<EachDepartment>(`${this.baseUrl}Department/GetDepartmentById/${id}`)
  }
  deleteDepartmentApiApi(id: number): Observable<any>{
    let query = []
    query.push(id)
    return this._httpClient.post<any>(`${this.baseUrl}Department/DeleteLookUpRange`, query)
  }
}
