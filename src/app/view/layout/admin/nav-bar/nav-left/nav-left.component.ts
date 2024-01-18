import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {NavigationItem} from "../../navigation/navigation";

@Component({
  selector: 'app-nav-left',
  templateUrl: './nav-left.component.html',
  styleUrls: ['./nav-left.component.scss'],
})
export class NavLeftComponent {
  navigationList: any;
  navigation: any;
  constructor(
    private _router: Router,
    public nav: NavigationItem,
  ) {
    this.navigation = this.nav.get();
    let routerUrl: string;
    this._router.events.subscribe((router: any) => {
      routerUrl = router.urlAfterRedirects;
      if (routerUrl && typeof routerUrl === 'string') {
        const activeLink = router.url;
        this.filterNavigation(activeLink);
      }
    });
  }

  filterNavigation(activeLink) {
    let result: any;
    let title = 'Welcome';
    this.navigation.forEach(function (a) {
      if (a.type === 'item' && 'url' in a && a.url === activeLink) {
        title = a.title;
      } else {
        if (a.type === 'group' && 'children' in a) {
          a.children.forEach(function (b) {
            if (b.type === 'item' && 'url' in b && b.url === activeLink) {
              title = b.title;
            } else {
              if (b.type === 'collapse' && 'children' in b) {
                b.children.forEach(function (c) {
                  if (c.type === 'item' && 'url' in c && c.url === activeLink) {
                    title = c.title;
                  }
                });
              }
            }
          });
        }
      }
    });
    this.navigationList = title;
  }
}
