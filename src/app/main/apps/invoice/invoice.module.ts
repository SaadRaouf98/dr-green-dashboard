import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgSelectModule} from '@ng-select/ng-select';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {Ng2FlatpickrModule} from 'ng2-flatpickr';
import {CoreCommonModule} from '@core/common.module';
import {CoreDirectivesModule} from '@core/directives/directives';
import {CorePipesModule} from '@core/pipes/pipes.module';
import {CoreSidebarModule} from '@core/components';
import {ReportsPreviewComponent} from 'app/main/apps/invoice/reports-preview/reports-preview.component';
import {ReportsPreviewService} from 'app/main/apps/invoice/reports-preview/reports-preview.service';
import {
    AddPaymentSidebarPreviewComponent
} from 'app/main/apps/invoice/reports-preview/sidebar/add-payment-sidebar-preview/add-payment-sidebar-preview.component';
import {
    SendInvoiceSidebarPreviewComponent
} from 'app/main/apps/invoice/reports-preview/sidebar/send-invoice-sidebar-preview/send-invoice-sidebar-preview.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {ReportsListComponent} from './reports-list/reports-list.component';
import {ReportsEditComponent} from './reports-edit/reports-edit.component';
import {ReportsEditService} from './reports-edit/reports-edit.service';
import {CategoriesListComponent} from './categories-list/categories-list.component';
import {CategoriesListService} from './categories-list/categories-list.service';
import {NgxPrintModule} from 'ngx-print';
import {NgxPrintElementModule} from 'ngx-print-element';
import {MatSelectModule} from '@angular/material/select';
import {SubCategoriesListComponent} from './sub-categories-list/sub-categories-list.component';
import {SubCategoriesListService} from './sub-categories-list/sub-categories-list.service';
import {ProductsEditFormService} from './products-edit-form/products-edit-form.service';
import {ProductsEditFormComponent} from './products-edit-form/products-edit-form.component';
import {ShowProductDetailsComponent} from './show-product-details/show-product-details.component';
import {ShowProductDetailsService} from './show-product-details/show-product-details.service';
import {VendorsListComponent} from './vendors-list/vendors-list.component';
import {VendorsListService} from './vendors-list/vendors-list.service';
import {OrderFormComponent} from './order-form/order-form.component';
import {OrderFormService} from './order-form/order-form.service';
import {OrderListComponent} from './order-list/order-list.component';
import {OrderListService} from './order-list/order-list.service';
import {OrderEditComponent} from './order-edit/order-edit.component';
import {OrderEditService} from './order-edit/order-edit.service';
import {ProductsAddFormComponent} from './products-add-form/products-add-form.component';
import {ProductsAddFormService} from './products-add-form/products-add-form.service';
import {VendorsTransactionService} from './vendors-transaction/vendors-transaction.service';
import {VendorsTransactionComponent} from './vendors-transaction/vendors-transaction.component';
import {CardSnippetModule} from '../../../../@core/components/card-snippet/card-snippet.module';
import {AttributesListComponent} from './attributes-list/attributes-list.component';
import {AttributesListService} from './attributes-list/attributes-list.service';
import {CouponListComponent} from './coupon-list/coupon-list.component';
import {CouponListService} from './coupon-list/coupon-list.service';
import {DashboardCustomersOrderListService} from './dashboard-customers-order-list/dashboard-customers-order-list.service';
import {DashboardCustomersOrderListComponent} from './dashboard-customers-order-list/dashboard-customers-order-list.component';
import {DashboardCustomersListComponent} from './dashboard-customers-list/dashboard-customers-list.component';
import {DashboardCustomersListService} from './dashboard-customers-list/dashboard-customers-list.service';
import {ShippingInformationListComponent} from './shipping-information-list/shipping-information-list.component';
import {ShippingInformationListService} from './shipping-information-list/shipping-information-list.service';
import {PreviewOrderComponent} from './preview-customer-order/preview-order.component';
import {PreviewOrderService} from './preview-customer-order/preview-order.service';
import {DashboardCustomersTransactionListComponent} from './dashboard-customers-transaction-list/dashboard-customers-transaction-list.component';
import {DashboardCustomersTransactionListService} from './dashboard-customers-transaction-list/dashboard-customers-transaction-list.service';
import {AllProductsComponent} from './all-products/all-products.component';
import {AllProductsService} from './all-products/all-products.service';
import {AllProductsCategoriesComponent} from './all-products-categories/all-products-categories.component';
import {AllProductsCategoriesService} from './all-products-categories/all-products-categories.service';
import {ProductsLowComponent} from './products-low/products-low.component';
import {ProductsLowService} from './products-low/products-low.service';
import {PreviewVendorOrderComponent} from './preview-vendor-order/preview-vendor-order.component';
import {PreviewVendorOrderService} from './preview-vendor-order/preview-vendor-order.service';
import {ContactUsListComponent} from './contact-us-list/contact-us-list.component';
import {ContactUsListService} from './contact-us-list/contact-us-list.service';
import {MostWishlistComponent} from './most-wish-list/most-wishlist.component';
import {MostWishlistService} from './most-wish-list/most-wishlist.service';
import {CustomersInvoiceComponent} from './customers-invoice/customers-invoice.component';
import {CustomersInvoiceService} from './customers-invoice/customers-invoice.service';
import {AllBrandsCategoriesComponent} from './all-brands-categories/all-brands-categories.component';
import {AllBrandsCategoriesService} from './all-brands-categories/all-brands-categories.service';
import {NewsletterListComponent} from './newsletter-list/newsletter-list.component';
import {NewsletterListService} from './newsletter-list/newsletter-list.service';
import {WebsiteCustomersListComponent} from './website-customers-list/website-customers-list.component';
import {WebsiteCustomersListService} from './website-customers-list/website-customers-list.service';
import {PreviewWebsiteCustomersService} from './preview-website-customers/preview-website-customers.service';
import {PreviewWebsiteCustomersComponent} from './preview-website-customers/preview-website-customers.component';
import {WebsiteCustomersOrderListComponent} from './website-customers-order-list/website-customers-order-list.component';
import {WebsiteCustomersOrderListService} from './website-customers-order-list/website-customers-order-list.service';
import {PreviewWebsiteOrderComponent} from "./preview-website-customer-order/preview-website-order.component";
import {PreviewWebsiteOrderService} from "./preview-website-customer-order/preview-website-order.service";
import {FaqComponent} from "./faq/faq.component";
import {FaqService} from "./faq/faq.service";
import {ngxLoadingAnimationTypes, NgxLoadingModule} from 'ngx-loading';

// routing
const routes: Routes = [
    {
        path: 'all-products/:id',
        component: AllProductsComponent,
        data: {path: 'user-view/:id', animation: 'AllProductsComponent'}
    },
    {
        path: 'faq',
        component: FaqComponent,
        data: {path: 'user-view', animation: 'AllProductsComponent'}
    },
    {
        path: 'products-edit-form/:id',
        component: ProductsEditFormComponent,
        data: {path: 'user-view/:id', animation: 'ProductsEditFormComponent'}
    },
    {
        path: 'order-edit/:id',
        component: OrderEditComponent,
        data: {path: 'user-view/:id', animation: 'OrderEditComponent'}
    },
    {
        path: 'customers-invoice/:id',
        component: CustomersInvoiceComponent,
        data: {path: 'user-view/:id', animation: 'CustomersInvoiceComponent'}
    },
    {
        path: 'order-form/:id',
        component: OrderFormComponent,
        data: {path: 'user-view/:id', animation: 'OrderFormComponent'}
    },
    {
        path: 'preview-website-order/:id',
        component: PreviewWebsiteOrderComponent,
        data: {path: 'user-view/:id', animation: 'PreviewWebsiteOrderComponent'}
    },
    {
        path: 'order-form',
        component: OrderFormComponent,
        resolve: {
            uls: OrderFormService
        },
    },
    {
        path: 'all-brands-Categories',
        component: AllBrandsCategoriesComponent,
        resolve: {
            uls: AllBrandsCategoriesService
        },
    },
    {
        path: 'ProductsLowComponent',
        component: ProductsLowComponent,
        resolve: {
            uls: OrderFormService
        },
    },
    {
        path: 'all-products-show-Categories',
        component: AllProductsCategoriesComponent,
        resolve: {
            uls: AllProductsCategoriesComponent
        },
    },
    {
        path: 'dashboard-customers-order-list',
        component: DashboardCustomersOrderListComponent,
        resolve: {
            uls: DashboardCustomersOrderListService
        },
    },
    {
        path: 'attributes-list',
        component: AttributesListComponent,
        resolve: {
            uls: AttributesListService
        },
    },
    {
        path: 'newsletter-list',
        component: NewsletterListComponent,
        resolve: {
            uls: NewsletterListService
        },
    },

    {
        path: 'products-add-form/:id',
        component: ProductsAddFormComponent,
        data: {path: 'products-add-form/:id', animation: 'ProductsAddFormComponent'}
    },


    {
        path: 'order-list',
        component: OrderListComponent,
        resolve: {
            uls: OrderFormService
        },
    },
    {
        path: 'vendors-transaction',
        component: VendorsTransactionComponent,
        resolve: {
            uls: VendorsTransactionService
        },
    },
    {
        path: 'dashboard-customers-transaction-list',
        component: DashboardCustomersTransactionListComponent,
        resolve: {
            uls: DashboardCustomersTransactionListService
        },
    },
    {
        path: 'preview-order/:id',
        component: PreviewOrderComponent,
        data: {path: 'user-view/:id', animation: 'PreviewOrderComponent'}
    },
    {
        path: 'preview-vendor-order/:id',
        component: PreviewVendorOrderComponent,
        data: {path: 'user-view/:id', animation: 'PreviewVendorOrderComponent'}
    },
    {
        path: 'sub-categories-list/:id',
        component: SubCategoriesListComponent,
        data: {path: 'user-view/:id', animation: 'SubCategoriesListComponent'}
    },

    {
        path: 'categories-list',
        component: CategoriesListComponent,
        resolve: {
            uls: CategoriesListService
        },
    },
    {
        path: 'contact-us-list',
        component: ContactUsListComponent,
        resolve: {
            uls: ContactUsListService
        },
    },
    {
        path: 'dashboard-customers-list',
        component: DashboardCustomersListComponent,
        resolve: {
            uls: DashboardCustomersListService
        },
    },
    {
        path: 'website-customers-list',
        component: WebsiteCustomersListComponent,
        resolve: {
            uls: WebsiteCustomersListService
        },
    },
    {
        path: 'shipping-information-list/:id',
        component: ShippingInformationListComponent,
        resolve: {
            uls: ShippingInformationListService
        },
        data: {path: 'user-view/:id', animation: 'ShippingInformationListComponent'}
    },
    {
        path: 'shipping-information-list',
        component: ShippingInformationListComponent,
        resolve: {
            uls: ShippingInformationListService
        },
    },
    {
        path: 'website-customers-order-list',
        component: WebsiteCustomersOrderListComponent,
        resolve: {
            uls: WebsiteCustomersOrderListService
        },
    },
    {
        path: 'order-form',
        component: OrderFormComponent,
        resolve: {
            uls: OrderFormService
        },
    },
    {
        path: 'coupon-list',
        component: CouponListComponent,
        resolve: {
            uls: CouponListService
        },
    },
    {
        path: 'show-product-details/:id',
        component: ShowProductDetailsComponent,
        resolve: {
            uls: ShowProductDetailsService
        },
        data: {path: 'user-view/:id', animation: 'ShowProductDetailsComponent'}
    },
    {
        path: 'reports-edit/:id',
        component: ReportsEditComponent,
        data: {path: 'user-view/:id', animation: 'ReportsEditService'}
    },
    {
        path: 'preview-website-customers/:id',
        component: PreviewWebsiteCustomersComponent,
        data: {path: 'user-view/:id', animation: 'ReportsEditService'}
    },
    {
        path: 'preview',
        component: ReportsPreviewComponent,
    },
    {
        path: 'edit',
        redirectTo: '/apps/invoice/edit/4989' // Redirection
    }
];

@NgModule({
    declarations: [
        AllProductsComponent,
        AllProductsCategoriesComponent,
        ProductsLowComponent,
        AttributesListComponent,
        CouponListComponent,
        VendorsTransactionComponent,
        ProductsAddFormComponent,
        ProductsEditFormComponent,
        SubCategoriesListComponent,
        ReportsEditComponent,
        CategoriesListComponent,
        ReportsPreviewComponent,
        ReportsListComponent,
        ReportsPreviewComponent,
        SendInvoiceSidebarPreviewComponent,
        AddPaymentSidebarPreviewComponent,
        ShowProductDetailsComponent,
        VendorsListComponent,
        OrderFormComponent,
        OrderListComponent,
        OrderEditComponent,
        DashboardCustomersOrderListComponent,
        DashboardCustomersListComponent,
        ShippingInformationListComponent,
        PreviewOrderComponent,
        PreviewVendorOrderComponent,
        DashboardCustomersTransactionListComponent,
        CouponListComponent,
        ContactUsListComponent,
        MostWishlistComponent,
        CustomersInvoiceComponent,
        AllBrandsCategoriesComponent,
        NewsletterListComponent,
        WebsiteCustomersListComponent,
        PreviewWebsiteCustomersComponent,
        WebsiteCustomersOrderListComponent,
        PreviewWebsiteOrderComponent,
        FaqComponent,
    ],
    imports: [
        SweetAlert2Module,
        CommonModule,
        RouterModule.forChild(routes),
        CoreCommonModule,
        CoreDirectivesModule,
        Ng2FlatpickrModule,
        NgxDatatableModule,
        FormsModule,
        CorePipesModule,
        NgbModule,
        NgSelectModule,
        CoreSidebarModule,
        MatDialogModule,
        MatAutocompleteModule,
        NgxPrintModule,
        NgxPrintElementModule,
        MatSelectModule,
        CardSnippetModule,
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
    // tslint:disable-next-line:max-line-length
    providers: [
        AllProductsService,
        AllProductsCategoriesService,
        ProductsLowService,
        AttributesListService,
        VendorsTransactionService,
        ProductsAddFormService,
        OrderListService,
        OrderEditService,
        OrderFormService,
        VendorsListService,
        ShowProductDetailsService,
        ProductsEditFormService,
        SubCategoriesListService,
        CategoriesListService,
        ReportsPreviewService,
        ReportsEditService,
        DashboardCustomersOrderListService,
        DashboardCustomersListService,
        ShippingInformationListService,
        PreviewOrderService,
        DashboardCustomersTransactionListService,
        CouponListService,
        PreviewVendorOrderService,
        ContactUsListService,
        MostWishlistService,
        CustomersInvoiceService,
        AllBrandsCategoriesService,
        NewsletterListService,
        WebsiteCustomersListService,
        PreviewWebsiteCustomersService,
        WebsiteCustomersOrderListService,
        PreviewWebsiteOrderService,
        FaqService,
        NgbActiveModal,
    ],
    exports: [
        AllProductsComponent,
        AllProductsCategoriesComponent,
        ProductsLowComponent,
        AttributesListComponent,
        VendorsTransactionComponent,
        OrderListComponent,
        OrderEditComponent,
        OrderFormComponent,
        VendorsListComponent,
        ShowProductDetailsComponent,
        ProductsEditFormComponent,
        SubCategoriesListComponent,
        CategoriesListComponent,
        ReportsEditComponent,
        ReportsPreviewComponent,
        ReportsListComponent,
        ProductsAddFormComponent,
        CouponListComponent,
        DashboardCustomersOrderListComponent,
        DashboardCustomersListComponent,
        ShippingInformationListComponent,
        PreviewOrderComponent,
        PreviewVendorOrderComponent,
        DashboardCustomersTransactionListComponent,
        CouponListComponent,
        ContactUsListComponent,
        MostWishlistComponent,
        CustomersInvoiceComponent,
        AllBrandsCategoriesComponent,
        NewsletterListComponent,
        WebsiteCustomersListComponent,
        PreviewWebsiteCustomersComponent,
        WebsiteCustomersOrderListComponent,
        PreviewWebsiteOrderComponent,
    ]
})
export class InvoiceModule {
}
