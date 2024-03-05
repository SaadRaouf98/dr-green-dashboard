import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment as env} from "../../../../../environments/environment";
import {SharedService} from "../../../../core/shared/sahred-service/shared.service";
import {EachTrainingVideo, TrainingVideo} from "../modals/training-video";

@Injectable({
  providedIn: 'root'
})

export class TrainingVideoService {
  baseUrl: string = env.apiPath + 'TrainingProgram'
  constructor(private _httpClient: HttpClient, private _sharedService : SharedService) {

  }
  addNewRecommendedApi(body: any): Observable<any>{
    let formData = this._sharedService.formatFormData(body)
    return this._httpClient.post<any>(`${this.baseUrl}/AddNewTrainingVideo`, formData)
  }
  updateTrainingVideoApi(body: any, id: number): Observable<any>{
    let formData = this._sharedService.formatFormData(body)
    return this._httpClient.put<any>(`${this.baseUrl}/EditTrainingVideoById/${id}`, formData)
  }
  getTrainingVideoApi(query: any): Observable<TrainingVideo>{
    return this._httpClient.post<TrainingVideo>(`${this.baseUrl}/GetAllTrainingVideoes`, query)
  }
  getTrainingVideoByIdApi(id: number): Observable<EachTrainingVideo>{
    return this._httpClient.get<EachTrainingVideo>(`${this.baseUrl}/GetTrainingVideoById/${id}`)
  }
  deleteApi(id: number){
    let query = []
    query.push(id)
    return this._httpClient.post(`${this.baseUrl}/TrainingVideoDeleteRange`, query)
  }
}
