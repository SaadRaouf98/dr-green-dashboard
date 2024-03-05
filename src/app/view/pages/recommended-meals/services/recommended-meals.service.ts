import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment as env} from "../../../../../environments/environment";
import {SharedService} from "../../../../core/shared/sahred-service/shared.service";
import {EachRecommendedMeal, RecommendedMeals} from "../modals/recommended-meals";

@Injectable({
  providedIn: 'root'
})

export class RecommendedMealsService {
  baseUrl: string = env.apiPath + 'RecommendedMeal'
  constructor(private _httpClient: HttpClient, private _sharedService : SharedService) {

  }
  addNewRecommendedApi(body: any): Observable<any>{
    let formData = this._sharedService.formatFormData(body)
    return this._httpClient.post<any>(`${this.baseUrl}/AddNewRecommendedMeal`, formData)
  }
  updateRecommendedMealApi(body: any, id: number): Observable<any>{
    let formData = this._sharedService.formatFormData(body)
    return this._httpClient.put<any>(`${this.baseUrl}/EditRecommendedMeal/${id}`, formData)
  }
  getRecommendedMealApi(query: any): Observable<RecommendedMeals>{
    return this._httpClient.post<RecommendedMeals>(`${this.baseUrl}/GetAllRecommendedMeals`, query)
  }
  getRecommendedMealByIdApi(id: number): Observable<EachRecommendedMeal>{
    return this._httpClient.get<EachRecommendedMeal>(`${this.baseUrl}/GetRecommendedMealById/${id}`)
  }
  deleteApi(id: number){
    let query = []
    query.push(id)
    return this._httpClient.post(`${this.baseUrl}/DeleteRecommendedRange`, query)
  }
}
