import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Subject} from 'rxjs';

import {CoreSidebarService} from '@core/components/core-sidebar/core-sidebar.service';
import {ColumnMode, DatatableComponent} from '@swimlane/ngx-datatable';

import {repeaterAnimation} from 'app/main/apps/invoice/invoice.animation';
import {DashboardCustomersListService} from './dashboard-customers-list.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-dashboard-customers-list',
    templateUrl: './dashboard-customers-list.component.html',
    styleUrls: ['./dashboard-customers-list.component.scss'],
    animations: [repeaterAnimation],
    encapsulation: ViewEncapsulation.None
})
export class DashboardCustomersListComponent implements OnInit, OnDestroy {
    // Public
    token: any;
    customers: any;
    id: any;
    type: any;
    categories: any;
    subCategories: any;
    brandProduct: any;
    categoryId: any;
    brandId: any;
    getDepositData: any;
    itemId: any;
    fileToUpload1: any;
    file1: any;
    fileToUpload2: any;
    file2: any;
    fileToUpload3: any;
    file3: any;
    catId: any;
    alertForm: any;
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
    public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
    spinner: boolean = false;
    right: boolean = false;
    @ViewChild(DatatableComponent) table: DatatableComponent;
    public selectedStatus = [];
    public searchValue = '';
    private tempData = [];

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
        private _productsAdditionFormService: DashboardCustomersListService,
        private toastr: ToastrService,
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
        this.getCustomers();
        this.addCustomerForm = this._formBuilder.group({
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            name: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required],
            phone: ['', Validators.required],
            postal_code: ['', Validators.required],
            address: ['', Validators.required],
        });
    }

    open(content) {
        this.right = false;
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    openEdit(content, row) {
        console.log(row);
        this.right = false;
        this.editForm = this._formBuilder.group({
            first_name: [row.first_name, [Validators.required]],
            last_name: [row.last_name, [Validators.required]],
            name: [row.name, [Validators.required]],
            email: [row.email, [Validators.required]],
            phone: [row.phone, [Validators.required]],
            postal_code: [row.postal_code, [Validators.required]],
            address: [row.address, [Validators.required]],
        });
        const modalRef = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
        this.customerId = row.user_id;
        console.log(this.customerId);
        modalRef.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    /**
     * filterUpdate
     *
     * @param event
     */
    filterUpdate(event) {
        if (event.target.value.length > 0) {
            const val = event.target.value.toLowerCase();

            // filter our data
            const temp1 = this.tempData.filter(function (d) {
                return d.email.toLowerCase().indexOf(val) !== -1 || !val;
            });
            const temp2 = this.tempData.filter(function (d) {
                return d.phone.toLowerCase().indexOf(val) !== -1 || !val;
            });

            // update the rows
            this.customers = temp1;
            this.customers = temp2;
            // Whenever the filter changes, always go back to the first page
            this.table.offset = 0;
        } else {
            this.getCustomers();
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

    getCustomers() {
        this._productsAdditionFormService.customers(this.token).subscribe(
            data => {
                this.customers = data['data'];
                this.tempData = this.customers;
                console.log(this.customers);
            },
            error => {
                console.log(error);

            }
        );

    }

    submitForm(): any {
        const formData: FormData = new FormData();
        formData.append('first_name', this.addCustomerForm.value.first_name);
        formData.append('last_name', this.addCustomerForm.value.last_name);
        formData.append('email', this.addCustomerForm.value.email);
        formData.append('password', this.addCustomerForm.value.password);
        formData.append('phone', this.addCustomerForm.value.phone);
        formData.append('postal_code', this.addCustomerForm.value.postal_code);
        formData.append('address', this.addCustomerForm.value.address);
        formData.append('name', this.addCustomerForm.value.name);
        // @ts-ignore
        return formData;
    }

    onSubmit() {
        this.spinner = true;
        this.right = false;
        this._productsAdditionFormService.addCustomer(this.token, this.submitForm()).subscribe(
            data => {
                console.log(data);
                this.getCustomers();
                this.right = true;
                this.spinner = false;
                this.submitToaster(data)
                this.modalService.dismissAll();
            },
            error => {
                this.right = false;
                this.spinner = false;
                Object.entries(error.errors).forEach((item)=> {
                    this.toasterError(item[1])
                })
            }
        );
    }

    edit(): any {
        const formData: FormData = new FormData();
        formData.append('first_name', this.editForm.value.first_name);
        formData.append('last_name', this.editForm.value.last_name);
        formData.append('email', this.editForm.value.email);
        formData.append('phone', this.editForm.value.phone);
        formData.append('postal_code', this.editForm.value.postal_code);
        formData.append('address', this.editForm.value.address);
        formData.append('name', this.editForm.value.name);
        // @ts-ignore
        return formData;
    }

    onEdit() {
        this.spinner = true;
        this.right = false;
        this._productsAdditionFormService.editCustomer(this.token, this.customerId, this.edit()).subscribe(
            data => {
                console.log(data);
                this.getCustomers();
                this.right = true;
                this.spinner = false;
                this.modalService.dismissAll();
                this.submitToaster(data)
            },
            error => {
                this.right = false;
                this.spinner = false;
                Object.entries(error.errors).forEach((item)=> {
                    this.toasterError(item[1])
                    console.log(item)
                })
            }
        );
    }

    deleteVendor(id) {
        this._productsAdditionFormService.deleteVendor(this.token, id).subscribe(
            data => {
                this.getCustomers();
                this.deleteToaster(data);
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
    submitToaster(message) {
        this.toastr.success('👋'+ message.message,
            'Submit !',
            {
                positionClass: 'toast-top-right',
                toastClass: 'toast ngx-toastr',
                closeButton: true
            });
    }
    deleteToaster(message) {
        this.toastr.success('👋'+ message.message,
            'Delete !',
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
