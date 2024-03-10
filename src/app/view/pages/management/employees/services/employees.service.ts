import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment as env} from "../../../../../../environments/environment";
import {SharedService} from "../../../../../core/shared/sahred-service/shared.service";
import {EachDepartment} from "../../departments/modals/departments";
import {AdsList, Departments, Employees} from "../modals/employees";

@Injectable({
  providedIn: 'root'
})

export class EmployeesService {
  baseUrl: string = env.apiPath
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

  deleteImagesApi(id: any): Observable<any>{
    return this._httpClient.delete<any>(`${this.baseUrl}/DeleteImageByPath/${id}`)
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
  getAdsApi(query: any): Observable<Employees>{
    return this._httpClient.post<Employees>(`${this.baseUrl}/GetAllAds`,
      {}, {params: query})
  }
  getAllRolesApi(): Observable<any>{
    return this._httpClient.get<any>(`${this.baseUrl}Roles/getallList`)
  }
  getAdByIdApi(id: number): Observable<AdsList>{
    return this._httpClient.get<AdsList>(`${this.baseUrl}/GetAdsById/${id}`)
  }
  deleteAdsApi(id: number): Observable<any>{
    let body = []
    body.push(id)
    return this._httpClient.post<any>(`${this.baseUrl}/DeleteAdsRange`, body)
  }
  getEmployeesApi(query: any): Observable<Employees>{
    return this._httpClient.post<Employees>(`${this.baseUrl}UsersApp/GetAllEmployees`, query)
  }
  getDepartmentByIdApi(id: number): Observable<EachDepartment>{
    return this._httpClient.get<EachDepartment>(`${this.baseUrl}Department/GetDepartmentById/${id}`)
  }
  GetAllListDepartmentApi(): Observable<Departments>{
    return this._httpClient.get<Departments>(`${this.baseUrl}Department/GetAllList`)
  }
  deleteEmployeesApi(id: number): Observable<any>{
    return this._httpClient.delete<any>(`${this.baseUrl}UsersApp/${id}`)
  }
  deletePositionApi(id: number): Observable<any>{
    return this._httpClient.delete<any>(`${this.baseUrl}Department/DeletePositionFromDepartmentById/${id}`)
  }
  changeStatusApi(id: number): Observable<any>{
    return this._httpClient.post<any>(`${this.baseUrl}Department/ToggleDepartmentStatusIsActive/${id}`, {})
  }
}
