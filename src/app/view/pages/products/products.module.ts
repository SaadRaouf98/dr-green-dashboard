import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductsListComponent} from './components/products-list/products-list.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../../theme/shared/shared.module";
import {TranslateModule} from "@ngx-translate/core";
import {AddProductsComponent} from "./components/add-products/add-products.component";

const routes: Routes = [
  {
    path: '',
    component: ProductsListComponent
  },
  {
    path: 'add',
    component: AddProductsComponent
  },
  {
    path: 'edit/:id',
    component: AddProductsComponent
  },
  {
    path: 'show/:id',
    component: AddProductsComponent
  },
]

@NgModule({
  declarations: [
    ProductsListComponent,
    AddProductsComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    TranslateModule
  ]
})
export class ProductsModule {
}
