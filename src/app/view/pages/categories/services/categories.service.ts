import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment as env} from "../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  baseUrl: string = env.apiPath + 'Category'
  constructor(private _httpClient: HttpClient) {

  }
  addCategoriesApi(body: any): Observable<any>{
    return this._httpClient.post<any>(`${this.baseUrl}/AddNewCategory`, body)
  }
  getCategoriesApi(query: any): Observable<any>{
    return this._httpClient.post<any>(`${this.baseUrl}/GetAllCategories`,
      {}, {params: query})
  }
  getCategoriesForListApi(): Observable<any>{
    return this._httpClient.get<any>(`${this.baseUrl}/GetAllCategoriesWithoutPagination`)
  }
  getCategoriesByIdApi(id: number): Observable<any>{
    return this._httpClient.get<any>(`${this.baseUrl}/GetCategoryById/${id}`)
  }
}
