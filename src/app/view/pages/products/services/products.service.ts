import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment as env} from "../../../../../environments/environment";
import {SharedService} from "../../../../core/shared/sahred-service/shared.service";
import {Products, CategoriesList} from "../modals/products";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  baseUrl: string = env.apiPath + 'Product'
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
  getProductsApi(query: any): Observable<Products>{
    return this._httpClient.post<Products>(`${this.baseUrl}/GetAllProducts`, query)
  }
  deleteProductsApi(id: any): Observable<any>{
    return this._httpClient.delete<any>(`${this.baseUrl}/DeleteProductById/${id}`)
  }
  deleteImagesApi(id: any): Observable<any>{
    return this._httpClient.delete<any>(`${this.baseUrl}/DeleteImageByPath/${id}`)
  }
  getCategoriesForListApi(): Observable<CategoriesList>{
    return this._httpClient.get<CategoriesList>(`${this.baseUrl}/GetAllCategoriesWithoutPagination`)
  }
  getCategoriesByIdApi(id: number): Observable<any>{
    return this._httpClient.get<any>(`${this.baseUrl}/GetCategoryById/${id}`)
  }
}
