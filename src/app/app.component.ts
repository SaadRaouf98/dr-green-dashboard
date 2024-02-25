import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'datta-able';

  constructor(
    private router: Router,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.translateService.setDefaultLang('en');
    this.translateService.use('en');
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
