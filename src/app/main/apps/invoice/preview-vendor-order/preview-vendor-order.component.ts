// @ts-ignore

import {Component, OnInit, OnDestroy, ViewChild, ViewEncapsulation} from '@angular/core';

import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ColumnMode, DatatableComponent} from '@swimlane/ngx-datatable';

import {CoreConfigService} from '@core/services/config.service';

import {MatDialog} from '@angular/material/dialog';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {PreviewVendorOrderService} from './preview-vendor-order.service';
import {ToastrService} from "ngx-toastr";
import { ngxLoadingAnimationTypes } from 'ngx-loading';

@Component({
    selector: 'app-preview-vendor-order',
    templateUrl: './preview-vendor-order.component.html',
    styleUrls: ['./preview-vendor-order.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PreviewVendorOrderComponent implements OnInit, OnDestroy {
    // public
    token: any;
    id: any;
    eachOrder: any;
    relatedProducts: any;
    products: any;
    orderId: any;
    backValue: any;
    public addForm: FormGroup;
    public editForm: FormGroup;
    public data: any;
    public selectedOption = 10;
    public ColumnMode = ColumnMode;
    public selectStatus: any = [
        {name: 'All', value: ''},
        {name: 'Downloaded', value: 'Downloaded'},
        {name: 'Draft', value: 'Draft'},
        {name: 'Paid', value: 'Paid'},
        {name: 'Partial Payment', value: 'Partial Payment'},
        {name: 'Past Due', value: 'Past Due'},
        {name: 'Sent', value: 'Sent'}
    ];
    closeResult = '';
    public selectedStatus = [];
    public searchValue = '';
    columns: any;
    rowsUsers: any;
    categories: any;
    spinner: boolean = false;
    right: boolean = false;
    public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
    // decorator
    @ViewChild(DatatableComponent) table: DatatableComponent;

    // private
    private tempData = [];
    private _unsubscribeAll: Subject<any>;
    public rows;
    public tempFilterData;
    public previousStatusFilter = '';
    private _route: ActivatedRoute;
    private _router: Router;

    /**
     * Constructor
     *
     * @param {CoreConfigService} _coreConfigService
     * @param {PreviewVendorOrderService} _CategoriesListService
     * @param dialog
     * @param modalService
     */
    /**
     * tslint:disable-next-line:max-line-length
     */
    constructor(
        private _categoriesListService: PreviewVendorOrderService,
        private activatedRoute: ActivatedRoute,
        private _coreConfigService: CoreConfigService,
        public dialog: MatDialog,
        private toastr : ToastrService,
        private modalService: NgbModal,
        private _formBuilder: FormBuilder
    ) {
        this._unsubscribeAll = new Subject();
    }

    // Public Methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * filterUpdate
     *
     * @param event
     */
    filterUpdate(event) {
        if (event.target.value.length > 0) {
            // Reset ng-select on search
            this.selectedStatus = this.selectStatus[0];

            const val = event.target.value.toLowerCase();

            // filter our data
            const temp = this.tempData.filter(function (d) {
                return d.name.toLowerCase().indexOf(val) !== -1 || !val;
            });

            // update the rows
            this.categories = temp;
            // Whenever the filter changes, always go back to the first page
            this.table.offset = 0;
        } else {
            this.getEachOrder();
        }
    }

    openDialog() {
    }

    /**
     * Filter By Roles
     *
     * @param event
     */
    filterByStatus(event) {
        const filter = event ? event.value : '';
        this.previousStatusFilter = filter;
        this.tempFilterData = this.filterRows(filter);
        this.rows = this.tempFilterData;
    }

    // modal Open Form
    modalOpenForm(modalForm) {
        this.modalService.open(modalForm);
    }


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
     * Filter Rows
     *
     * @param statusFilter
     */
    filterRows(statusFilter): any[] {
        // Reset search on select change
        this.searchValue = '';

        statusFilter = statusFilter.toLowerCase();

        return this.tempData.filter(row => {
            const isPartialNameMatch = row.invoiceStatus.toLowerCase().indexOf(statusFilter) !== -1 || !statusFilter;
            return isPartialNameMatch;
        });
    }

    // Lifecycle Hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    ngOnInit(): void {
        this.token = JSON.parse(localStorage.getItem('currentUser')).token;
        this.orderId = this.activatedRoute.snapshot.paramMap.get('id');
        console.log(this.orderId);
        this.getEachOrder();
        this.getOrderProducts();
        this.editForm = this._formBuilder.group({
            qty: ['', [Validators.required]],
            pice: ['', [Validators.required]],
        });
    }
    openEdit(content, id, row) {
        console.log(row);
        this.editForm = this._formBuilder.group({
            qty: [row.qty, [Validators.required]],
            price: [row.supplier_price, [Validators.required]],
        });
        console.log(row);
        const modalRef = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
        this.id = id;
        modalRef.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    getEachOrder() {
        this._categoriesListService.eachOrder(this.token, this.orderId).subscribe(
            data => {
                this.eachOrder = data['data'][0];
                console.log(this.eachOrder);
            },
            error => {
                console.log(error);

            }
        );

    }

    getOrderProducts() {
        this._categoriesListService.eachOrder(this.token, this.orderId).subscribe(
            data => {
                this.relatedProducts = data['data'][1];
                console.log(this.relatedProducts);
            },
            error => {
                console.log(error);

            }
        );

    }
    submitForm2(): any {
        const formData: FormData = new FormData();
        formData.append('quantity', this.editForm.value.qty);
        formData.append('supplier_price', this.editForm.value.price);

        // @ts-ignore
        return formData;
    }

    edit() {
        this.spinner = true;
        this.right = false;
        this._categoriesListService.editQty(this.submitForm2(), this.token, this.id).subscribe(
            data => {
                console.log(data);
                this.getOrderProducts();
                this.right = true;
                this.spinner = false;
                this.submitToaster(data)
                this.modalService.dismissAll();
            },
            error => {
                Object.entries(error.errors).forEach((item)=> {
                    this.toasterError(item[1])
                    console.log(item)
                })
                this.right = false;
                this.spinner = false;
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

    toasterError(error) {
        this.toastr.error('👋' + error, 'ERROR!', {
            toastClass: 'toast ngx-toastr',
            positionClass: 'toast-top-right',
            closeButton: true
        });
    }
}
