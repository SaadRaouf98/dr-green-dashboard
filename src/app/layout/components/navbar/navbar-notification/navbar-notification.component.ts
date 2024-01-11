import { Component, OnInit } from '@angular/core';

import { NotificationsService } from 'app/layout/components/navbar/navbar-notification/notifications.service';
import {User} from "../../../../auth/models";
import {Router} from "@angular/router";

// Interface
interface notification {
  data: [];
  systemMessages: [];
  system: Boolean;
}

@Component({
  selector: 'app-navbar-notification',
  templateUrl: './navbar-notification.component.html'
})
export class NavbarNotificationComponent implements OnInit {
  // Public
  public notifications: notification;
  public currentUser: User;
  /**
   *
   * @param {NotificationsService} _notificationsService
   */
  constructor(
      private _notificationsService: NotificationsService,
      private router: Router,
  ) {}

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.currentUser){
      this._notificationsService.onApiDataChange.subscribe(res => {
        console.log(res)
        this.notifications = res;
        console.log(this.notifications)
      });
    }
  }
  readNotify(notifyId, orderId){
    this._notificationsService.read(notifyId, orderId).subscribe(
        data =>{
          this.router.navigate(['apps/invoice/preview-website-order/'+orderId]);

        },
        erroor =>{

        }
    )
  }
}
