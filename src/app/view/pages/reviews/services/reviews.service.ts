import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment as env} from "../../../../../environments/environment";
import {SharedService} from "../../../../core/shared/sahred-service/shared.service";
import {EachReview, Reviews} from "../modals/reviews";

@Injectable({
  providedIn: 'root'
})

export class ReviewsService {
  baseUrl: string = env.apiPath + 'ReviewSection'
  constructor(private _httpClient: HttpClient, private _sharedService : SharedService) {

  }
  addReviewsApi(body: any): Observable<any>{
    let formData = this._sharedService.formatFormData(body)
    return this._httpClient.post<any>(`${this.baseUrl}/AddNewReview`, formData)
  }
  updateReviewApi(body: any, id: number): Observable<any>{
    let formData = this._sharedService.formatFormData(body)
    return this._httpClient.put<any>(`${this.baseUrl}/EditReview/${id}`, formData)
  }
  getAllReviews(query: any): Observable<Reviews>{
    return this._httpClient.post<Reviews>(`${this.baseUrl}/GetAllReviewes`, query)
  }
  getReviewByIdApi(id: number): Observable<EachReview>{
    return this._httpClient.get<EachReview>(`${this.baseUrl}/GetReviewById/${id}`)
  }
  deleteApi(id: number): Observable<any>{
    let query = []
    query.push(id)
    return this._httpClient.post<any>(`${this.baseUrl}/DeleteLookUpRange`, query)
  }
}
