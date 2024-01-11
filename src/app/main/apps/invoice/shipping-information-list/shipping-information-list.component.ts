import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Subject} from 'rxjs';

import {CoreSidebarService} from '@core/components/core-sidebar/core-sidebar.service';
import {ColumnMode, DatatableComponent} from '@swimlane/ngx-datatable';

import {repeaterAnimation} from 'app/main/apps/invoice/invoice.animation';
import {ShippingInformationListService} from './shipping-information-list.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-shipping-information-list',
    templateUrl: './shipping-information-list.component.html',
    styleUrls: ['./shipping-information-list.component.scss'],
    animations: [repeaterAnimation],
    encapsulation: ViewEncapsulation.None
})
export class ShippingInformationListComponent implements OnInit, OnDestroy {
    // Public
    token: any;
    userId: any;
    shippingId: any;
    id: any;
    type: any;
    categories: any;
    customers: any;
    showEachCustomer: any;
    subCategories: any;
    brandProduct: any;
    categoryId: any;
    brandId: any;
    user: any;
    checkout: any;
    checkoutS: any;
    itemId: any;
    fileToUpload1: any;
    file1: any;
    fileToUpload2: any;
    file2: any;
    fileToUpload3: any;
    file3: any;
    Id: any;
    customerId: any;
    transactionId: any;
    public editForm: FormGroup;
    public addCustomerForm: FormGroup;
    public url = this.router.url;
    public urlLastValue;
    public apiData;
    public sidebarToggleRef = false;
    public paymentSidebarToggle = false;
    public selectedOption = 10;
    public ColumnMode = ColumnMode;
    @ViewChild(DatatableComponent) table: DatatableComponent;
    public selectedStatus = [];
    public searchValue = '';
    private tempData = [];
    public previousStatusFilter = '';
    public rows;
    public tempFilterData;
    // Ng2-Flatpickr Options
    public DateRangeOptions = {
        altInput: true,
        mode: 'single',
        altInputClass: 'form-control flat-picker flatpickr-input accounts-edit-input',
        defaultDate: ['2020-05-01'],
        altFormat: 'Y-n-j'
    };
    closeResult = '';

    public paymentDetails = {
        totalDue: '$12,110.55',
        bankName: 'American Bank',
        country: 'United States',
        iban: 'ETD95476213874685',
        swiftCode: 'BR91905'
    };
    public selectType: any = [
        {name: 'In Stock', value: 'instock'},
        {name: 'More InThe Way', value: 'more in the way'},
        {name: 'Out Of Stock', value: 'outofstock'},
    ];

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {Router} router
     * @param {AccountsEditService} _invoiceEditService
     * @param {CoreSidebarService} _coreSidebarService
     */
    constructor(
        private _formBuilder: FormBuilder,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private toastr: ToastrService,
        private _productsAdditionFormService: ShippingInformationListService,
        private _coreSidebarService: CoreSidebarService,
        private modalService: NgbModal
    ) {
        this._unsubscribeAll = new Subject();
        this.urlLastValue = this.url.substr(this.url.lastIndexOf('/') + 1);
    }

    // Public Methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Add Item
     */

    /**
     * DeleteItem
     *
     * @param id
     */


    /**
     * Toggle the sidebar
     *
     * @param name
     */
    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

    /**
     * filterUpdate
     *
     * @param event
     */

    /**
     * Filter By Roles
     *
     * @param event
     */

    // Lifecycle Hooks
    // -----------------------------------------------------------------------------------------------------


    /**
     * On init
     */
    ngOnInit(): void {
        this.token = JSON.parse(localStorage.getItem('currentUser')).token;
        this.checkoutS = localStorage.getItem('checkoutData');
        this.checkout = JSON.parse(this.checkoutS);
        console.log(this.checkout);
        this.getCustomers();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
    }

    getCustomers() {
        this._productsAdditionFormService.customers(this.token).subscribe(
            data => {
                this.customers = data['data'];
                console.log(this.customers);
            },
            error => {
                console.log(error);

            }
        );
    }

    setData(e) {
        this.shippingId = e.id;
        this.userId = e.user_id;
        this.showEachCustomer = e
        console.log(e)
    }

    placeOrder() {
        console.log(this.shippingId);
        console.log(this.userId);
        this._productsAdditionFormService.placeOrder(this.token, this.shippingId, this.userId).subscribe(
            data => {
                console.log(data);
                this.submitToaster(data)
                this.router.navigate(['/dashboard/dashboard-customers-order']);
            },
            error => {
                console.log(error);
                this.toasterError(error)
            }
        );
    }

    submitToaster(message) {
        this.toastr.success('👋' + message.message,
            'Place Order !',
            {
                positionClass: 'toast-top-right',
                toastClass: 'toast ngx-toastr',
                closeButton: true
            });
    }

    toasterError(error) {
        this.toastr.error('👋' + error.message, 'ERROR!', {
            toastClass: 'toast ngx-toastr',
            positionClass: 'toast-top-right',
            closeButton: true
        });
    }
}
