import {Component, OnInit, OnDestroy, ViewChild, ViewEncapsulation} from '@angular/core';

import {Subject} from 'rxjs';
import {ColumnMode, DatatableComponent} from '@swimlane/ngx-datatable';

import {CoreConfigService} from '@core/services/config.service';

import {FormBuilder, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import * as snippet from '../../../components/collapse/collapse.snippetcode';
import {DashboardCustomersTransactionListService} from './dashboard-customers-transaction-list.service';
import {ToastrService} from "ngx-toastr";
import { ngxLoadingAnimationTypes } from 'ngx-loading';

@Component({
    selector: 'app-dashboard-customers-transaction-list',
    templateUrl: './dashboard-customers-transaction-list.component.html',
    styleUrls: ['./dashboard-customers-transaction-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DashboardCustomersTransactionListComponent implements OnInit, OnDestroy {
    // public
    rowsProducts: any;
    filter: boolean = false
    preSelected : any = 1;
    public filterTypes = [
        {name:'Filter By Name', value: 1},
        {name:'Filter By Phone Number', value: 2},
    ]
    customers: any;
    dateFrom: any;
    dateFrom1: any;
    date: any;
    moneyMessage: any;
    dateModel;
    columns: any;
    invoices: any;
    invoices2: any;
    invoiceId: any;
    orderId: any;
    value1: any;
    invId: any;
    transactionId: any;
    invoiceId2: any;
    customerId: any;
    customerId2: any;
    vendorProdId: any;
    editData: any;
    productsData: any;
    token: any;
    id: any;
    pdId: any;
    transactionForm: any;
    editForm: any;
    addForm: any;
    closeResult = '';
    public data: any;
    public selectedOption = 10;
    public ColumnMode = ColumnMode;
    public selectStatus: any = [
        {name: 'All', value: ''},
        {name: 'In Stock', value: 'instock'},
        {name: 'More InThe Way', value: 'more in the way'},
        {name: 'Out Of Stock', value: 'outofstock'},
    ];

    public selectedStatus = [];
    public searchValue = '';
    spinner: boolean = false;
    right: boolean = false;
    public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes
    spinner1: boolean = false;
    right1: boolean = false;
    public ngxLoadingAnimationTypes1 = ngxLoadingAnimationTypes
    // decorator
    @ViewChild(DatatableComponent) table: DatatableComponent;

    // private
    private tempData = [];
    private _unsubscribeAll: Subject<any>;
    public rows;
    public tempFilterData;
    public previousStatusFilter = '';
    public _snippetCodeCollapset = snippet.snippetCodeCollapset;
    public _snippetCodeAccordion = snippet.snippetCodeAccordion;
    public _snippetCodeButtonCollapse = snippet.snippetCodeButtonCollapse;
    public contentHeader: object;
    public isCollapsed5 = true;


    /**
     * Constructor
     *
     * @param {CoreConfigService} _coreConfigService
     * @param {CalendarService} _calendarService
     * @param {InvoiceListService} _invoiceListService
     */
    constructor(private _filmsListService: DashboardCustomersTransactionListService,
                private _coreConfigService: CoreConfigService,
                public dialog: MatDialog,
                private modalService: NgbModal,
                private toastr: ToastrService ,
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
        //   this.rowsProducts = temp;
        //   // Whenever the filter changes, always go back to the first page
        //   this.table.offset = 0;
        // }else{
        //   this.getTransaction()
        // }

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
        this.rowsProducts = this.tempFilterData;
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
            const isPartialNameMatch = row.stock_status.toLowerCase().indexOf(statusFilter) !== -1 || !statusFilter;
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
        this.getCustomers();
        this.transactionForm = this._formBuilder.group({
            comment: ['', Validators.required],
            payment: ['', Validators.required],
            deposit: ['', Validators.required],
        });
        this.editForm = this._formBuilder.group({
            comment: ['', Validators.required],
            payment: ['', Validators.required],
            deposit: ['', Validators.required],
        });
        // Subscribe config change
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    open(content, id) {
        console.log(id);
        const modalRef = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
        this.id = id;
        modalRef.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
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

    setFromDate(value) {
        const date = value.year + '-' + value.month + '-' + value.day;
        console.log(date);
        this.dateFrom = date;

    }

    setFromDate2(value) {
        this.dateFrom1 = this.dateFormat(value);
    }

    dateFormat(e) {
        const date = new Date(Date.UTC(e.year, e.month, e.day));
        const result = date.toISOString().split('T')[0];
        return result;
    }

    openEdit(content, id, row) {
        console.log(row);
        this.dateFrom1 = row.date;
        let x = this.dateFrom1.split('-');
        let y = {
            year: parseInt(x[0]),
            month: parseInt(x[1]),
            day: parseInt(x[2])
        };
        this.dateModel = y;
        console.log(y);
        this.editForm = this._formBuilder.group({
            person_pay: [row.person_pay, [Validators.required]],
            comment: [row.comment, [Validators.required]],
            payment: [row.payment, [Validators.required]],
            deposit: [row.deposit, [Validators.required]],
            supplier_price: [row.supplier_price, Validators.required],

        });
        this.enOrDis();
        const modalRef = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
        this.transactionId = id;
        this.invId = row;
        console.log(this.invId);
        modalRef.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    onPayment() {
        if (this.transactionForm.controls['payment']) {
            this.transactionForm.controls['deposit'].disable();
        }
    }

    outPayment() {
        if (this.transactionForm.controls['payment'].status == 'INVALID') {
            this.transactionForm.controls['deposit'].enable();
        }
    }

    onDeposit() {
        if (this.transactionForm.controls['deposit']) {
            this.transactionForm.controls['payment'].disable();
        }
    }

    outDeposit() {
        if (this.transactionForm.controls['deposit'].status == 'INVALID') {
            this.transactionForm.controls['payment'].enable();
        }
    }

    enOrDis() {
        if (this.editForm.controls['payment'].status == 'VALID') {
            this.editForm.controls['deposit'].disable();
        } else if (this.editForm.controls['deposit'].status == 'VALID') {
            this.editForm.controls['payment'].disable();
        }
    }

    onPaymentEdit() {
        if (this.editForm.controls['payment']) {
            this.editForm.controls['deposit'].disable();
        }
    }

    outPaymentEdit() {
        if (this.editForm.controls['payment'].status == 'INVALID') {
            this.editForm.controls['deposit'].enable();
        }
    }

    onDepositEdit() {
        if (this.editForm.controls['deposit']) {
            this.editForm.controls['payment'].disable();
        }
    }

    outDepositEdit() {
        if (this.editForm.controls['deposit'].status == 'INVALID') {
            this.editForm.controls['payment'].enable();
        }
    }


    getCustomers() {
        this._filmsListService.customers(this.token).subscribe(
            data => {
                this.customers = data['data'];
                console.log(this.customers);
                this.columns = Object.keys(data['data'][0]);
            },
            error => {
                console.log(error);

            }
        );

    }

    selectedCustomer(value) {
        console.log(value);
        this.customerId2 = value.id;
    }

    selectedInvoice(value) {
        console.log(value);
        this.invoiceId2 = value.id;
    }

    setFilterType(event) {
        if (event.value == 2){
            this.filter = true
        } else {
            this.filter = false
        }
    }
    getInvoices(event) {
        this.customerId = event.user_id;
        console.log(event);
        this._filmsListService.invoices(this.token, this.customerId).subscribe(
            data => {
                this.invoices = data['data'];
                console.log(this.invoices);
            },
            error => {
                console.log(error);

            }
        );

    }

    getInvoices2(event) {
        console.log(event);
        this.customerId2 = event.user_id;
        console.log(this.customerId2);
        this._filmsListService.invoices2(this.token, this.customerId2).subscribe(
            data => {
                this.invoices2 = data['data'];
                console.log(this.invoices2);
            },
            error => {
                console.log(error);

            }
        );

    }

    selectedItem(value) {
        console.log(value);
        this.invoiceId2 = value.invoice_id;
    }

    submitForm2(): any {
        const formData: FormData = new FormData();
        formData.append('user_id', this.customerId);
        formData.append('order_id', this.orderId);


        // @ts-ignore
        return formData;
    }

    getTransaction(value) {
        this.orderId = value.id;
        this.value1 = value;
        console.log(this.orderId);
        this._filmsListService.transaction(this.token, this.submitForm2()).subscribe(
            data => {
                this.rowsProducts = data['data'];
                this.tempData = this.rowsProducts;
                this.moneyMessage = data['message'];
                console.log(this.moneyMessage)
                console.log(this.rowsProducts);

                // this.columns = Object.keys(data['data'][0]);
            },
            error => {
                console.log(error);

            }
        );


    }

    submitForm(): any {
        const formData: FormData = new FormData();
        formData.append('user_id', this.customerId);
        formData.append('order_id', this.orderId);
        formData.append('comment', this.transactionForm.value.comment);
        formData.append('date', this.dateFrom);
        formData.append('payment', this.transactionForm.value.payment);
        formData.append('deposit', this.transactionForm.value.deposit);

        // @ts-ignore
        return formData;
    }

    submitForm3(): any {
        const formData: FormData = new FormData();
        formData.append('user_id', this.customerId);
        formData.append('order_id', this.orderId);
        formData.append('comment', this.editForm.value.comment);
        formData.append('date', this.dateFrom1);
        formData.append('payment', this.editForm.value.payment);
        formData.append('deposit', this.editForm.value.deposit);
        console.log(this.editForm.value.deposit);

        // @ts-ignore
        return formData;
    }

    submit() {
        this.spinner = true;
        this.right = false;
        this._filmsListService.addTransaction(this.token, this.submitForm()).subscribe(
            data => {
                console.log(data);
                this.getTransaction(this.value1);
                this.right = true;
                this.spinner = false;
                this.submitToaster(data)
                setTimeout(() => {
                    this.right = false;
                }, 5000);
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

    onEdit() {
        this.spinner1 = true;
        this._filmsListService.transactionEdit(this.token, this.transactionId, this.submitForm3()).subscribe(
            data => {
                console.log(data);
                this.getTransaction(this.value1);
                this.spinner1 = false;
                this.submitToaster(data)
                this.modalService.dismissAll();
            },
            error => {
                console.log(error);
                Object.entries(error.errors).forEach((item)=> {
                    this.toasterError(item[1])
                    console.log(item)
                })
                this.spinner1 = false;
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
