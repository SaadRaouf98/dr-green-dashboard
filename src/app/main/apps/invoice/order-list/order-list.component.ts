import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {CoreSidebarService} from '@core/components/core-sidebar/core-sidebar.service';
import {ColumnMode, DatatableComponent} from '@swimlane/ngx-datatable';
import {repeaterAnimation} from 'app/main/apps/invoice/invoice.animation';
import {OrderListService} from './order-list.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ngxLoadingAnimationTypes} from 'ngx-loading';
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-order-list',
    templateUrl: './order-list.component.html',
    styleUrls: ['./order-list.component.scss'],
    animations: [repeaterAnimation],
    encapsulation: ViewEncapsulation.None
})
export class OrderListComponent implements OnInit, OnDestroy {
    // Public
    id: any;
    public active: any;
    storesData: any;
    storeId: any = null;
    orderId: any;
    orders: any;
    deliveredOrders: any;
    canceledOrders: any;
    public url = this.router.url;
    public urlLastValue;
    public selectedOption = 10;
    public ColumnMode = ColumnMode;
    @ViewChild(DatatableComponent) table: DatatableComponent;
    public selectedStatus = [];
    public searchValue = '';
    public searchValue1 = '';
    public searchValue2 = '';
    spinner: boolean = false;
    right: boolean = false;
    public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
    closeResult = '';
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
        private _productsAdditionFormService: OrderListService,
        private _coreSidebarService: CoreSidebarService,
        private modalService: NgbModal
    ) {
        this._unsubscribeAll = new Subject();
        this.urlLastValue = this.url.substr(this.url.lastIndexOf('/') + 1);
    }
    // Lifecycle Hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    ngOnInit(): void {
        this.getOrders()
        this.getStores()
        this.getCanceledOrders()
        this.getDeliveredOrders()
    }

    open(content, id) {
        this.modalService.open(content, {
            centered: true,
            size: 'sm'
        });
        this.right = false;
        this.orderId = id;
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



    /**
     * On destroy
     */
    ngOnDestroy(): void {
    }

    getOrders() {
        this._productsAdditionFormService.orders().subscribe(
            data => {
                this.orders = data['data'];
                console.log(this.orders)
            },
            error => {
                console.log(error);

            }
        );

    }

    getDeliveredOrders() {
        this._productsAdditionFormService.deliveredOrders().subscribe(
            data => {
                this.deliveredOrders = data['data'];
                console.log(this.deliveredOrders)
            },
            error => {
                console.log(error);

            }
        );

    }

    getCanceledOrders() {
        this._productsAdditionFormService.canceledOrders().subscribe(
            data => {
                this.canceledOrders = data['data'];
                console.log(this.canceledOrders)
            },
            error => {
                console.log(error);

            }
        );

    }

    cancel(id) {
        this._productsAdditionFormService.cancel(id).subscribe(
            data => {
                this.getDeliveredOrders();
                this.getCanceledOrders();
                this.getOrders();
                this.cancelToaster(data);
            },
            error => {
                console.log(error);
                Object.entries(error.errors).forEach((item)=> {
                    this.toasterError(item[1])
                    console.log(item)
                })
            }
        );
    }

    delivered() {
        this.spinner = true;
        this.right = false;
        this._productsAdditionFormService.delivered(this.orderId, this.storeId).subscribe(
            data => {
                this.getDeliveredOrders();
                this.getCanceledOrders();
                this.getOrders();
                this.right = true;
                this.spinner = false;
                this.submitToaster(data)
                this.modalService.dismissAll();
            },
            error => {
                console.log(error);
                Object.entries(error.errors).forEach((item)=> {
                    this.toasterError(item[1])
                    console.log(item)
                })
                this.right = false;
                this.spinner = false;
            }
        );
    }

    getStores() {
        this._productsAdditionFormService.storesApi().subscribe(
            data => {
                this.storesData = data['data'];
                console.log(this.storesData)
            },
            error => {
                console.log(error);

            }
        );

    }
    submitToaster(message) {
        this.toastr.success('👋'+ message.message,
            'Submit !',
            {
                positionClass: 'toast-top-right',
                toastClass: 'toast ngx-toastr',
                closeButton: true
            });
    }
    cancelToaster(message) {
        this.toastr.error('👋'+ message.message,
            'Canceled !',
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
