import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../../../../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { User } from 'app/auth/models';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  // Public
  public apiData = [];
  public onApiDataChange: BehaviorSubject<any>;
  public currentUser: User;
  /**
   *
   * @param {HttpClient} _httpClient
   */
  constructor(private _httpClient: HttpClient) {
    this.onApiDataChange = new BehaviorSubject('');
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.currentUser ){this.getNotificationsData();};
  }

  /**
   * Get Notifications Data
   */
  // getNotificationsData(): Promise<any[]> {
  //   return new Promise((resolve, reject) => {
  //     this._httpClient.get('api/notifications-data').subscribe((response: any) => {
  //       this.apiData = response;
  //       this.onApiDataChange.next(this.apiData);
  //       resolve(this.apiData);
  //     }, reject);
  //   });
  // }

  getNotificationsData(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient.get(`${environment.domain}/admin/new-order-notification`).subscribe((response: any) => {
        this.apiData = response;
        this.onApiDataChange.next(this.apiData);
        resolve(this.apiData);
      }, reject);
    });
  }
  read(notifyId, orderId) {
    return this._httpClient.get(`${environment.domain}/admin/website/orders/${orderId}?notify_id=${notifyId}`);
  }
}
