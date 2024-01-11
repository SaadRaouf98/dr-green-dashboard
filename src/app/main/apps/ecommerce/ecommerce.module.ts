import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { NouisliderModule } from 'ng2-nouislider';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SwiperConfigInterface, SwiperModule, SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { CoreCommonModule } from '@core/common.module';
import { CoreSidebarModule } from '@core/components';
import { CoreTouchspinModule } from '@core/components/core-touchspin/core-touchspin.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { EcommerceService } from 'app/main/apps/ecommerce/ecommerce.service';
import { EcommerceShopComponent } from 'app/main/apps/ecommerce/ecommerce-shop/ecommerce-shop.component';
import {EcommerceDetailsComponent} from "./ecommerce-details/ecommerce-details.component";
import {EcommerceCheckoutComponent} from "./ecommerce-checkout/ecommerce-checkout.component";
import {EcommerceCheckoutItemComponent} from "./ecommerce-checkout/ecommerce-checkout-item/ecommerce-checkout-item.component";
import {NgSelectModule} from "@ng-select/ng-select";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {
  EcommerceCheckoutVendorsComponent
} from "./ecommerce-checkout/ecommerce-checkout-vendors/ecommerce-checkout-vendors.component";
import {ngxLoadingAnimationTypes, NgxLoadingModule} from "ngx-loading";


const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  observer: true
};

// routing
const routes: Routes = [
  {
    path: 'film-shop',
    component: EcommerceShopComponent,
    resolve: {
      ecommerce: EcommerceService
    },
    data: { animation: 'EcommerceShopComponent' }
  },
  {
    path: 'checkout',
    component: EcommerceCheckoutComponent,
    resolve: {
      ecommerce: EcommerceService
    },
    data: { animation: 'EcommerceCheckoutComponent' }
  },
  {
    path: 'checkout-vendors',
    component: EcommerceCheckoutVendorsComponent,
    resolve: {
      ecommerce: EcommerceService
    },
    data: { animation: 'EcommerceCheckoutVendorsComponent' }
  },
  {
    path: 'details/:id',
    component: EcommerceDetailsComponent,
    resolve: {
      ecommerce: EcommerceService
    },
    data: { animation: 'EcommerceDetailsComponent' }
  },

  {
    path: 'details',
    redirectTo: '/apps/e-commerce/details/27', //Redirection
    data: { animation: 'EcommerceDetailsComponent' }
  }
];

@NgModule({
  declarations: [
    EcommerceShopComponent,
    EcommerceDetailsComponent,
    EcommerceCheckoutComponent,
    EcommerceCheckoutItemComponent,
    EcommerceCheckoutVendorsComponent,
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SwiperModule,
        FormsModule,
        CoreTouchspinModule,
        ContentHeaderModule,
        CoreSidebarModule,
        CoreCommonModule,
        NgbModule,
        NouisliderModule,
        NgSelectModule,
        NgxDatatableModule,
        NgxLoadingModule,
        NgxLoadingModule.forRoot({
          animationType: ngxLoadingAnimationTypes.wanderingCubes,
          backdropBackgroundColour: 'rgba(0,0,0,0.5)',
          backdropBorderRadius: '4px',
          primaryColour: '#ffffff',
          secondaryColour: '#ffffff',
          tertiaryColour: '#ffffff',
          fullScreenBackdrop: false,
        }),
    ],
  exports: [
    EcommerceShopComponent,
    EcommerceDetailsComponent,
    EcommerceCheckoutComponent,
    EcommerceCheckoutItemComponent,
    EcommerceCheckoutVendorsComponent,

  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ]
})
export class EcommerceModule {}
