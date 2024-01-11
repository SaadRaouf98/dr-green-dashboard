import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {CoreSidebarService} from '@core/components/core-sidebar/core-sidebar.service';
import {ColumnMode, DatatableComponent} from '@swimlane/ngx-datatable';
import {repeaterAnimation} from 'app/main/apps/invoice/invoice.animation';
import {WebsiteCustomersOrderListService} from './website-customers-order-list.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-website-customers-order-list',
    templateUrl: './website-customers-order-list.component.html',
    styleUrls: ['./website-customers-order-list.component.scss'],
    animations: [repeaterAnimation],
    encapsulation: ViewEncapsulation.None
})
export class WebsiteCustomersOrderListComponent implements OnInit, OnDestroy {
    // Public
    token: any;
    id: any;
    dateFrom: any;
    public active: any;
    status: any;
    orderId: any;
    categories: any;
    placedOrders: any;
    deliveredOrders: any;
    preparingOrders: any;
    onTheWay: any;
    canceledOrders: any;
    backOrders: any;
    subCategories: any;
    brandProduct: any;
    categoryId: any;
    brandId: any;
    itemId: any;
    fileToUpload1: any;
    file1: any;
    fileToUpload2: any;
    file2: any;
    fileToUpload3: any;
    file3: any;
    Id: any;
    popStatus: any;
    popPrep: boolean = false;
    transactionId: any;
    public addForm: FormGroup;
    public addProductForm: FormGroup;
    public url = this.router.url;
    public urlLastValue;
    public apiData;
    public sidebarToggleRef = false;
    public paymentSidebarToggle = false;
    public selectedOption = 10;
    public ColumnMode = ColumnMode;
    spinner: boolean = false;
    right: boolean = false;
    public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
    @ViewChild(DatatableComponent) table: DatatableComponent;
    public selectedStatus = [];
    public searchValue = '';
    public searchValue1 = '';
    public searchValue2 = '';

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
    public preparingStatus: string = 'preparing';
    public onTheWayStatus: string = 'on the way';
    public deliveredStatus: string = 'delivered';
    public canceledStatus: string = 'canceled';
    public selectType: any = [
        {name: 'Preparing', value: 'preparing'},
        {name: 'On The Way', value: 'on the way'},
        {name: 'Delivered', value: 'delivered'},
        {name: 'Canceled', value: 'canceled'},
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
        private toastr: ToastrService,
        private activatedRoute: ActivatedRoute,
        private _productsAdditionFormService: WebsiteCustomersOrderListService,
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

    toggleSidebar(name): void {
        this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
    }

    // Lifecycle Hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    ngOnInit(): void {
        this.token = JSON.parse(localStorage.getItem('currentUser')).token;
        this.getPlacedOrders();
        this.getPreparingOrders();
        this.getOnTheWayOrders();
        this.getCanceledOrders();
        this.getDeliveredOrders();
    }

    open(content, row) {
        this.popStatus = row.status
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
        this.orderId = row.id;
        console.log(this.popStatus)
        this.right = false;
    }

    /**
     * filterUpdate
     *
     * @param event
     */
    filterUpdate(event) {
        // if (event.target.value.length > 0){
        //   // Reset ng-select on search
        //   this.selectedStatus = this.selectStatus[0];
        //
        //   const val = event.target.value.toLowerCase();
        //
        //   // filter our data
        //   const temp = this.tempData.filter(function (d) {
        //     return d.name.toLowerCase().indexOf(val) !== -1 || !val;
        //   });
        //
        //   // update the rows
        //   this.subCategories = temp;
        //   // Whenever the filter changes, always go back to the first page
        //   this.table.offset = 0;
        // }else{
        //   this.getSubCategories()
        // }
    }

    filterUpdate1(event) {
        // if (event.target.value.length > 0){
        //   // Reset ng-select on search
        //   this.selectedStatus = this.selectStatus[0];
        //
        //   const val = event.target.value.toLowerCase();
        //
        //   // filter our data
        //   const temp = this.tempData.filter(function (d) {
        //     return d.name.toLowerCase().indexOf(val) !== -1 || !val;
        //   });
        //
        //   // update the rows
        //   this.subCategories = temp;
        //   // Whenever the filter changes, always go back to the first page
        //   this.table.offset = 0;
        // }else{
        //   this.getSubCategories()
        // }
    }

    filterUpdate2(event) {
        // if (event.target.value.length > 0){
        //   // Reset ng-select on search
        //   this.selectedStatus = this.selectStatus[0];
        //
        //   const val = event.target.value.toLowerCase();
        //
        //   // filter our data
        //   const temp = this.tempData.filter(function (d) {
        //     return d.name.toLowerCase().indexOf(val) !== -1 || !val;
        //   });
        //
        //   // update the rows
        //   this.subCategories = temp;
        //   // Whenever the filter changes, always go back to the first page
        //   this.table.offset = 0;
        // }else{
        //   this.getSubCategories()
        // }
    }

    openDialog() {
    }

    /**
     * Filter By Roles
     *
     * @param event
     */
    filterByStatus(event) {
        // const filter = event ? event.value : '';
        // this.previousStatusFilter = filter;
        // this.tempFilterData = this.filterRows(filter);
        // this.rows = this.tempFilterData;
    }


    /**
     * On destroy
     */
    ngOnDestroy(): void {
    }

    setFromDate(value) {
        const date = value.year + '-' + value.month + '-' + value.day;
        console.log(date);
        this.dateFrom = date;

    }

    getPlacedOrders() {
        this._productsAdditionFormService.placedOrders(this.token).subscribe(
            data => {
                this.placedOrders = data['data'];
                console.log(this.placedOrders);
            },
            error => {
                console.log(error);

            }
        );

    }

    getPreparingOrders() {
        this._productsAdditionFormService.preparingOrders(this.token).subscribe(
            data => {
                this.preparingOrders = data['data'];
                console.log(this.preparingOrders);
            },
            error => {
                console.log(error);

            }
        );

    }

    getOnTheWayOrders() {
        this._productsAdditionFormService.onTheWay(this.token).subscribe(
            data => {
                this.onTheWay = data['data'];
                console.log(this.onTheWay);
            },
            error => {
                console.log(error);

            }
        );

    }

    getDeliveredOrders() {
        this._productsAdditionFormService.deliveredOrders(this.token).subscribe(
            data => {
                this.deliveredOrders = data['data'];
                console.log(this.deliveredOrders);
            },
            error => {
                console.log(error);

            }
        );

    }

    getCanceledOrders() {
        this._productsAdditionFormService.canceledOrders(this.token).subscribe(
            data => {
                this.canceledOrders = data['data'];
                console.log(this.canceledOrders);
            },
            error => {
                console.log(error);

            }
        );

    }

    setType(event) {
        this.status = event.target.value;
        console.log(this.status);
        if (event.target.value == 'on the way') {
            this.popPrep = true
        } else {
            this.popPrep = false
        }
    }

    changeOrderStatus() {
        this.spinner = true;
        this.right = false;
        this._productsAdditionFormService.ChangeStatus(this.token, this.status, this.dateFrom, this.orderId).subscribe(
            data => {
                this.ngOnInit()
                this.right = true;
                this.spinner = false;
                this.submitToaster(data)
                this.modalService.dismissAll();
            },
            error => {
                console.log(error);
                Object.entries(error.errors).forEach((item) => {
                    this.toasterError(item[1])
                    console.log(item)
                })
                this.right = false;
                this.spinner = false;
            }
        );
    }
    submitToaster(message) {
        this.toastr.success('👋' + message.message,
            'Submit !',
            {
                positionClass: 'toast-top-right',
                toastClass: 'toast ngx-toastr',
                closeButton: true
            });
    }

    toasterError(error) {
        this.toastr.error('👋' + error, 'ERROR!', {
            toastClass: 'toast ngx-toastr',
            positionClass: 'toast-top-right',
            closeButton: true
        });
    }
}
