import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment as env} from "../../../../../../environments/environment";
import {SharedService} from "../../../../../core/shared/sahred-service/shared.service";
import {AllPositions, Departments, EmployeeDetails, Employees} from "../modals/employees";

@Injectable({
  providedIn: 'root'
})

export class EmployeesService {
  baseUrl: string = env.apiPath
  constructor(private _httpClient: HttpClient, private _sharedService : SharedService) {

  }
  addEmployeeApi(body: any): Observable<any>{
    let formBody = this._sharedService.formatBody(body)
    return this._httpClient.post<any>(`${this.baseUrl}Auth/RegisterEmployee`, formBody)
  }
  updateEmployeesApi(body: any, id: number): Observable<any>{
    let formBody = this._sharedService.formatBody(body)
    return this._httpClient.put<any>(`${this.baseUrl}UsersApp/EmployeeEdit/${id}`, formBody)
  }

  deleteImagesApi(id: any): Observable<any>{
    return this._httpClient.delete<any>(`${this.baseUrl}/DeleteImageByPath/${id}`)
  }
  getAllRolesApi(): Observable<any>{
    return this._httpClient.get<any>(`${this.baseUrl}Roles/getallList`)
  }
  getEmployeeByIdApi(id: number): Observable<EmployeeDetails>{
    return this._httpClient.get<EmployeeDetails>(`${this.baseUrl}UsersApp/GetEmployee/${id}`)
  }
  getPositionByIdApi(id: number): Observable<AllPositions>{
    return this._httpClient.get<AllPositions>(`${this.baseUrl}Department/GetPositionByDepartmentId/${id}`)
  }
  getEmployeesApi(query: any): Observable<Employees>{
    return this._httpClient.post<Employees>(`${this.baseUrl}UsersApp/GetAllEmployees`, query)
  }
  GetAllListDepartmentApi(): Observable<Departments>{
    return this._httpClient.get<Departments>(`${this.baseUrl}Department/GetAllList`)
  }
  deleteEmployeesApi(id: number): Observable<any>{
    return this._httpClient.delete<any>(`${this.baseUrl}UsersApp/${id}`)
  }
}
