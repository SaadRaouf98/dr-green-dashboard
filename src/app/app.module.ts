import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './theme/shared/shared.module';
import { GuestComponent } from './view/layout/guest/guest.component';
import { AdminComponent } from './view/layout/admin/admin.component';
import { ConfigurationComponent } from './view/layout/admin/configuration/configuration.component';
import { NavBarComponent } from './view/layout/admin/nav-bar/nav-bar.component';
import { NavigationComponent } from './view/layout/admin/navigation/navigation.component';
import { NavLeftComponent } from './view/layout/admin/nav-bar/nav-left/nav-left.component';
import { NavRightComponent } from './view/layout/admin/nav-bar/nav-right/nav-right.component';
import { NavContentComponent } from './view/layout/admin/navigation/nav-content/nav-content.component';
import { NavLogoComponent } from './view/layout/admin/navigation/nav-logo/nav-logo.component';
import { NavCollapseComponent } from './view/layout/admin/navigation/nav-content/nav-collapse/nav-collapse.component';
import { NavGroupComponent } from './view/layout/admin/navigation/nav-content/nav-group/nav-group.component';
import { NavItemComponent } from './view/layout/admin/navigation/nav-content/nav-item/nav-item.component';
import { NavSearchComponent } from './view/layout/admin/nav-bar/nav-left/nav-search/nav-search.component';
import { NavigationItem } from './view/layout/admin/navigation/navigation';
import { ToggleFullScreenDirective } from './theme/shared/components/full-screen/toggle-full-screen';
import {InterceptorsProvider} from "./core/interceptor/interceptor-index";


@NgModule({
  declarations: [
    AppComponent,
    GuestComponent,
    AdminComponent,
    ConfigurationComponent,
    NavBarComponent,
    NavigationComponent,
    NavLeftComponent,
    NavRightComponent,
    NavContentComponent,
    NavLogoComponent,
    NavCollapseComponent,
    NavGroupComponent,
    NavItemComponent,
    NavSearchComponent,
    ToggleFullScreenDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    BrowserAnimationsModule,
  ],
  providers: [NavigationItem, InterceptorsProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
