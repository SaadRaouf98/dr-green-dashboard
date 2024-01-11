import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgApexchartsModule} from 'ng-apexcharts';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {AuthGuard} from 'app/auth/helpers';
import {CoreCommonModule} from '@core/common.module';
import {InvoiceModule} from 'app/main/apps/invoice/invoice.module';
import {DashboardService} from 'app/main/dashboard/dashboard.service';
import {AccountsComponent} from 'app/main/dashboard/Accounts/Accounts.component';
import {HomeComponent} from 'app/main/dashboard/Home/home.component';
import {CategoriesComponent} from './Categories/categories.component';
import {ReportsComponent} from './Reports/reports.component';
import {DocumentsComponent} from './Documents/documents.component';
import {CardSnippetModule} from '../../../@core/components/card-snippet/card-snippet.module';
import {subCategoriesComponent} from './Sub-categories/sub-categories.component';
import {ProductsAdditionComponent} from './Products Addition/products-addition.component';
import {EcommerceModule} from '../apps/ecommerce/ecommerce.module';
import {FormRepeaterModule} from '../forms/form-repeater/form-repeater.module';
import {VendorsComponent} from './vendors/vendors.component';
import {OrderPageComponent} from './order-page/order-page.component';
import {OrderAdditionComponent} from './order-addition/order-addition.component';
import {VendorsTransactionPageComponent} from './vendors-transaction-page/vendors-transaction-page.component';
import {AttributesComponent} from './attributes/attributes.component';
import {CheckoutCartComponent} from './checkout-cart/checkout-cart.component';
import {CouponComponent} from './coupon/coupon.component';
import {DashboardCustomersOrderComponent} from './dashboard-customers-order/dashboard-customers-order.component';
import {DashboardCustomersComponent} from './dashboard-customers/dashboard-customers.component';
import {DropdownsModule} from '../components/dropdowns/dropdowns.module';
import {DashboardCustomersTransactionComponent} from './dashboard-customers-transaction/dashboard-customers-transaction.component';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {StoresComponent} from './stores/stores.component';
import {StoresService} from './stores/stores.service';
import {NgSelectModule} from '@ng-select/ng-select';
import {SliderComponent} from './slider/slider.component';
import {SliderService} from './slider/slider.service';
import {AllProductsShowComponent} from './all-products-show/all-products-show.component';
import {ShowProductsLowComponent} from './show-products-low/show-products-low.component';
import {CheckoutCartVendorsComponent} from './checkout-cart-vendors/checkout-cart-vendors.component';
import {ContactUsComponent} from './contact-us/contact-us.component';
import {WishlistComponent} from './wishlist/wishlist.component';
import {NewsletterComponent} from './newsletter/newsletter.component';
import {WebsiteCustomersComponent} from './website-customers/website-customers.component';
import {WebsiteCustomersOrderComponent} from './website-customers-order/website-customers-order.component';
import {ngxLoadingAnimationTypes, NgxLoadingModule} from "ngx-loading";

const routes = [
    {
        path: 'accounts',
        component: AccountsComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'all-products-show',
        component: AllProductsShowComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'show-products-low',
        component: ShowProductsLowComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'dashboard-customers',
        component: DashboardCustomersComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'attributes',
        component: AttributesComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'checkout-cart',
        component: CheckoutCartComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'checkout-cart-vendors',
        component: CheckoutCartVendorsComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'contact-us',
        component: ContactUsComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'coupon',
        component: CouponComponent,
        canActivate: [AuthGuard],
    },
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard],
        resolve: {
            css: DashboardService
        },
    }
    ,
    {
        path: 'reports',
        component: ReportsComponent,
        resolve: {
            css: DashboardService
        },
    },
    {
        path: 'documents',
        component: DocumentsComponent,
        resolve: {
            css: DashboardService
        },
    },
    {
        path: 'vendors-transaction-page',
        component: VendorsTransactionPageComponent,
        resolve: {
            css: DashboardService
        },
    },
    {
        path: 'dashboard-customers-transaction',
        component: DashboardCustomersTransactionComponent,
        resolve: {
            css: DashboardService
        },
    },
    {
        path: 'categories',
        component: CategoriesComponent,
        canActivate: [AuthGuard],
        resolve: {
            css: DashboardService
        },
    },
    {
        path: 'products-addition',
        component: ProductsAdditionComponent,
        canActivate: [AuthGuard],
        resolve: {
            css: DashboardService
        },
    },
    {
        path: 'vendors',
        component: VendorsComponent,
        canActivate: [AuthGuard],
        resolve: {
            css: DashboardService
        },
    },
    {
        path: 'order-page',
        component: OrderPageComponent,
        canActivate: [AuthGuard],
        resolve: {
            css: DashboardService
        },
    },
    {
        path: 'dashboard-customers-order',
        component: DashboardCustomersOrderComponent,
        canActivate: [AuthGuard],
        resolve: {
            css: DashboardService
        },
    },
    {
        path: 'order-addition',
        component: OrderAdditionComponent,
        canActivate: [AuthGuard],
        resolve: {
            css: DashboardService
        },
    },
    {
        path: 'sub-categories',
        component: subCategoriesComponent,
        canActivate: [AuthGuard],
        resolve: {
            css: DashboardService
        },
    },
    {
        path: 'stores',
        component: StoresComponent,
        canActivate: [AuthGuard],
        resolve: {
            css: DashboardService
        },
    },
    {
        path: 'slider',
        component: SliderComponent,
        resolve: {
            css: DashboardService
        },
    },
    {
        path: 'newsletter',
        component: NewsletterComponent,
        resolve: {
            css: DashboardService
        },
    },
    {
        path: 'wishlist',
        component: WishlistComponent,
        resolve: {
            css: DashboardService
        },
    },
    {
        path: 'website-customers',
        component: WebsiteCustomersComponent,
        resolve: {
            css: DashboardService
        },
    },
    {
        path: 'website-customers-order',
        component: WebsiteCustomersOrderComponent,
        resolve: {
            css: DashboardService
        },
    },
];

@NgModule({
    // tslint:disable-next-line:max-line-length
    declarations: [
        AllProductsShowComponent,
        ShowProductsLowComponent,
        AttributesComponent,
        OrderAdditionComponent,
        OrderPageComponent,
        CouponComponent,
        ReportsComponent,
        DocumentsComponent,
        CategoriesComponent,
        subCategoriesComponent,
        ProductsAdditionComponent,
        AccountsComponent,
        HomeComponent,
        VendorsComponent,
        VendorsTransactionPageComponent,
        CheckoutCartComponent,
        DashboardCustomersOrderComponent,
        DashboardCustomersComponent,
        DashboardCustomersTransactionComponent,
        StoresComponent,
        SliderComponent,
        CheckoutCartVendorsComponent,
        ContactUsComponent,
        WishlistComponent,
        NewsletterComponent,
        WebsiteCustomersComponent,
        WebsiteCustomersOrderComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        TranslateModule,
        NgbModule,
        PerfectScrollbarModule,
        CoreCommonModule,
        NgApexchartsModule,
        InvoiceModule,
        CardSnippetModule,
        EcommerceModule,
        FormRepeaterModule,
        DropdownsModule,
        NgxDatatableModule,
        NgSelectModule,
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
    providers: [
        DashboardService,
        StoresService,
        SliderService,
    ],
    exports: [
        AllProductsShowComponent,
        ShowProductsLowComponent,
        CategoriesComponent,
        ProductsAdditionComponent,
        VendorsComponent,
        OrderPageComponent,
        OrderAdditionComponent,
        VendorsTransactionPageComponent,
        AttributesComponent,
        CheckoutCartComponent,
        DashboardCustomersTransactionComponent,
        StoresComponent,
        SliderComponent,
        CheckoutCartVendorsComponent,
        ContactUsComponent,
        WishlistComponent,
        NewsletterComponent,
        WebsiteCustomersComponent,
        WebsiteCustomersComponent,
    ]
})
export class DashboardModule {
}
