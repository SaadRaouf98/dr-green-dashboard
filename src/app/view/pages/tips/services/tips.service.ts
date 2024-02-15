import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment as env} from "../../../../../environments/environment";
import {SharedService} from "../../../../core/shared/sahred-service/shared.service";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  baseUrl: string = env.apiPath + 'Category'
  constructor(private _httpClient: HttpClient, public _sharedService: SharedService,) {

  }
  addCategoriesApi(body: any): Observable<any>{
    let form = this._sharedService.formatFormData(body)
    return this._httpClient.post<any>(`${this.baseUrl}/AddNewCategory`, form)
  }
  updateCategoriesApi(body: any, id: number): Observable<any>{
    let form = this._sharedService.formatFormData(body)
    return this._httpClient.put<any>(`${this.baseUrl}/EditCategoryById/${id}`, form)
  }
  getCategoriesApi(query: any): Observable<any>{
    return this._httpClient.post<any>(`${this.baseUrl}/GetAllCategories`, query)
  }
  deleteCategoriesApi(id: any): Observable<any>{
    return this._httpClient.delete<any>(`${this.baseUrl}/DeleteCategoryById/${id}`)
  }
  getCategoriesForListApi(): Observable<any>{
    return this._httpClient.get<any>(`${this.baseUrl}/GetAllCategoriesWithoutPagination`)
  }
  getCategoriesByIdApi(id: number): Observable<any>{
    return this._httpClient.get<any>(`${this.baseUrl}/GetCategoryById/${id}`)
  }
}
