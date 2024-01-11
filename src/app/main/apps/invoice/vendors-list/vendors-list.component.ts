import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Subject} from 'rxjs';

import {CoreSidebarService} from '@core/components/core-sidebar/core-sidebar.service';
import {ColumnMode, DatatableComponent} from '@swimlane/ngx-datatable';

import {repeaterAnimation} from 'app/main/apps/invoice/invoice.animation';
import {VendorsListService} from './vendors-list.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ngxLoadingAnimationTypes} from 'ngx-loading';
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-vendors-list',
    templateUrl: './vendors-list.component.html',
    styleUrls: ['./vendors-list.component.scss'],
    animations: [repeaterAnimation],
    encapsulation: ViewEncapsulation.None
})
export class VendorsListComponent implements OnInit, OnDestroy {
    // Public
    token: any;
    vendors: any;
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
    vendorId: any;
    transactionId: any;
    public addForm: FormGroup;
    public editForm: FormGroup;
    public addProductForm: FormGroup;
    public addVendorForm: FormGroup;
    public url = this.router.url;
    public urlLastValue;
    public apiData;
    public sidebarToggleRef = false;
    public paymentSidebarToggle = false;
    public selectedOption = 10;
    public ColumnMode = ColumnMode;
    right: boolean = false;
    spinner: boolean = false;
    public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
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
        private toastr: ToastrService,
        private _productsAdditionFormService: VendorsListService,
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
        this.getVendors()
        this.addVendorForm = this._formBuilder.group({
            name: ['', Validators.required],
            phone: ['', Validators.required],
            email: ['', Validators.required],
            contact_person: ['', Validators.required],
            website: ['', Validators.required],
            address: ['', Validators.required],

        });
    }

    open(content) {
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    openEdit(content, id, row) {
        console.log(row);
        this.editForm = this._formBuilder.group({
            name: [row.name, [Validators.required]],
            phone: [row.phone, [Validators.required]],
            address: [row.address, [Validators.required]],
            website: [row.website, [Validators.required]],
            email: [row.email, [Validators.required]],
            contact_person: [row.contact_person, Validators.required],
        });
        const modalRef = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
        this.vendorId = id;
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
            const temp = this.tempData.filter(function (d) {
                return d.name.toLowerCase().indexOf(val) !== -1 || !val;
            });

            // update the rows
            this.vendors = temp;
            // Whenever the filter changes, always go back to the first page
            this.table.offset = 0;
        } else {
            this.getVendors()
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

    getVendors() {
        this._productsAdditionFormService.vendors(this.token).subscribe(
            data => {
                this.vendors = data['data'];
                this.tempData = this.vendors
                console.log(this.vendors);
            },
            error => {
                console.log(error);

            }
        );

    }

    submitForm(): any {
        const formData: FormData = new FormData();
        formData.append('email', this.addVendorForm.value.email);
        formData.append('phone', this.addVendorForm.value.phone);
        formData.append('website', this.addVendorForm.value.website);
        formData.append('contact_person', this.addVendorForm.value.contact_person);
        formData.append('name', this.addVendorForm.value.name);
        formData.append('address', this.addVendorForm.value.address);
        // @ts-ignore
        return formData;
    }

    onSubmit() {
        this.spinner = true;
        this.right = false;
        this._productsAdditionFormService.addVendor(this.token, this.submitForm()).subscribe(
            data => {
                console.log(data);
                this.getVendors()
                this.right = true;
                this.spinner = false;
                this.submitToaster(data)
                this.modalService.dismissAll();
            },
            error => {
                console.log(error);
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
        formData.append('email', this.editForm.value.email);
        formData.append('phone', this.editForm.value.phone);
        formData.append('website', this.editForm.value.website);
        formData.append('contact_person', this.editForm.value.contact_person);
        formData.append('name', this.editForm.value.name);
        formData.append('address', this.editForm.value.address);
        // @ts-ignore
        return formData;
    }

    onEdit() {
        this.spinner = true;
        this.right = false;
        this._productsAdditionFormService.editVendor(this.token, this.vendorId, this.edit()).subscribe(
            data => {
                console.log(data);
                this.getVendors()
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
                this.getVendors();
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
        this.toastr.success('👋' + message.message,
            'Submit !',
            {
                positionClass: 'toast-top-right',
                toastClass: 'toast ngx-toastr',
                closeButton: true
            });
    }

    deleteToaster(message) {
        this.toastr.success('👋' + message.message,
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
