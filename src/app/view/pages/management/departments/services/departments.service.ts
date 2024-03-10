import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment as env} from "../../../../../../environments/environment";
import {Departments, EachDepartment} from "../modals/departments";
import {SharedService} from "../../../../../core/shared/sahred-service/shared.service";

@Injectable({
  providedIn: 'root'
})

export class DepartmentsService {
  baseUrl: string = env.apiPath
  constructor(private _httpClient: HttpClient, private _sharedService : SharedService) {

  }
  addDepartmentApi(body: any): Observable<any>{
    let formBody = this._sharedService.formatBody(body)
    console.log(formBody)
    return this._httpClient.post<any>(`${this.baseUrl}Department/AddNewDepartment`, formBody)
  }
  updateDepartmentApi(body: any, id: number): Observable<any>{
    let formBody = this._sharedService.formatBody(body)
    return this._httpClient.put<any>(`${this.baseUrl}Department/EditDepartmentById/${id}`, formBody)
  }
  getDepartmentsApi(query: any): Observable<Departments>{
    return this._httpClient.post<Departments>(`${this.baseUrl}Department/GetAllDepartments`, query)
  }
  getDepartmentByIdApi(id: number): Observable<EachDepartment>{
    return this._httpClient.get<EachDepartment>(`${this.baseUrl}Department/GetDepartmentById/${id}`)
  }
  deleteDepartmentApi(id: number): Observable<any>{
    let query = []
    query.push(id)
    return this._httpClient.post<any>(`${this.baseUrl}Department/DeleteRange`, query)
  }
  deletePositionApi(id: number): Observable<any>{
    return this._httpClient.delete<any>(`${this.baseUrl}Department/DeletePositionFromDepartmentById/${id}`)
  }
  changeStatusApi(id: number): Observable<any>{
    return this._httpClient.post<any>(`${this.baseUrl}Department/ToggleDepartmentStatusIsActive/${id}`, {})
  }
}
