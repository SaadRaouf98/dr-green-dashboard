import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';

import {CoreSidebarService} from '@core/components/core-sidebar/core-sidebar.service';
import {ColumnMode, DatatableComponent} from '@swimlane/ngx-datatable';

import {repeaterAnimation} from 'app/main/apps/invoice/invoice.animation';
import {OrderFormService} from './order-form.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ngxLoadingAnimationTypes} from 'ngx-loading';
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-order-form',
    templateUrl: './order-form.component.html',
    styleUrls: ['./order-form.component.scss'],
    animations: [repeaterAnimation],
    encapsulation: ViewEncapsulation.None
})
export class OrderFormComponent implements OnInit, OnDestroy {
    // Public
    public messageError = '';
    public messageSuccess = '';
    token: any;
    prodId: any;
    id: any;
    type: any;
    categories: any;
    subCategories: any;
    brandProduct: any;
    vendors: any;
    categoryId: any;
    brandId: any;
    itemId: any;
    vendorId: any;
    dateFrom: any;
    Id: any;
    transactionId: any;
    public addForm: FormGroup;
    public addProductForm: FormGroup;
    public orderForm: FormGroup;
    public url = this.router.url;
    public urlLastValue;
    public apiData;
    public sidebarToggleRef = false;
    public paymentSidebarToggle = false;
    public selectedOption = 10;
    public ColumnMode = ColumnMode;
    spinner: boolean = false;
    right: boolean = false;
    public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes
    @ViewChild(DatatableComponent) table: DatatableComponent;
    public selectedStatus = [];
    myFiles: string [] = [];
    public searchValue = '';
    images2: any = [];
    fileToUpload2: any = [];
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
        {name: 'CASH', value: 'cash'},
        {name: 'CREDIT CARD', value: 'credit card'},
        {name: 'CHEQUE', value: 'sheque'},
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
        private _productsAdditionFormService: OrderFormService,
        private _coreSidebarService: CoreSidebarService,
        private http: HttpClient,
        private modalService: NgbModal
    ) {
        this._unsubscribeAll = new Subject();
        this.urlLastValue = this.url.substr(this.url.lastIndexOf('/') + 1);
    }

    // Public Methods
    // -----------------------------------------------------------------------------------------------------
    get f() {
        return this.orderForm.controls;
    }

    // Lifecycle Hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    ngOnInit(): void {
        this.token = JSON.parse(localStorage.getItem('currentUser')).token;
        this.prodId = this.activatedRoute.snapshot.paramMap.get('id');
        this.getCategories();
        this.getVendors();
        this.orderForm = this._formBuilder.group({
            tracking_id: ['', Validators.required],
            invoice_id: ['', Validators.required],
            extra_money: ['', Validators.required],
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
    }

    onFileSelected2(event: any): void {
        if (event.target.files && event.target.files[0]) {

            var filesAmount = event.target.files.length;
            for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader();
                this.fileToUpload2.push(event.target.files.item(i));
                reader.onload = (event: any) => {
                    this.images2.push(event.target.result);
                    console.log(this.images2);
                };
                reader.readAsDataURL(event.target.files[i]);
            }
        }
    }

    removeImage2(url: any) {
        this.images2 = this.images2.filter(img => (img != url));
        console.log(this.images2);
    }

    setType(event) {
        console.log(event.value);
        this.type = event.value;
    }

    selectedItem(value) {
        this.itemId = value.id;
        console.log(this.itemId);

    }

    selectedVendor(value) {
        this.vendorId = value.id;
        console.log(this.itemId);

    }

    onFileChange(event: any) {

        for (var i = 0; i < event.target.files.length; i++) {
            this.myFiles.push(event.target.files[i]);
        }
    }

    getCategories() {
        this._productsAdditionFormService.categories(this.token).subscribe(
            data => {
                this.categories = data['data'];
            },
            error => {
                console.log(error);

            }
        );

    }

    getSubCategories(event) {
        this.categoryId = event.id;
        console.log(event);
        this._productsAdditionFormService.subCategories(this.token, event.id).subscribe(
            data => {
                this.subCategories = data['data'];
                console.log(this.subCategories);
            },
            error => {
                console.log(error);

            }
        );

    }

    getBrandProduct(event) {
        this.brandId = event.id;
        console.log(this.brandId);
        this._productsAdditionFormService.brandProduct(this.token, event.id).subscribe(
            data => {
                this.brandProduct = data['data'];
                console.log(this.subCategories);
            },
            error => {
                console.log(error);

            }
        );

    }

    getVendors() {
        this._productsAdditionFormService.vendors(this.token).subscribe(
            data => {
                this.vendors = data['data'];
                console.log(this.vendors);
            },
            error => {
                console.log(error);

            }
        );

    }

    setFromDate(value) {
        const date = value.year + '-' + value.month + '-' + value.day;
        console.log(date);
        this.dateFrom = date;

    }

    submitForm(): any {
        const formData: FormData = new FormData();
        for (let i = 0; i < this.fileToUpload2.length; i++) {
            formData.append(`images[]`, this.fileToUpload2[i]);
        }
        formData.append('supplier_id', this.vendorId);
        formData.append('method_payment', this.type);
        formData.append('arrival_date', this.dateFrom);
        formData.append('tracking_number', this.orderForm.value.tracking_id);
        formData.append('invoice', this.orderForm.value.invoice_id);
        formData.append('extra_money', this.orderForm.value.extra_money);
        // @ts-ignore
        return formData;
    }

    onSubmit() {
        this.spinner = true;
        this.right = false;
        this._productsAdditionFormService.addOrder(this.token, this.submitForm()).subscribe(
            data => {
                console.log(data);
                this.right = true;
                this.spinner = false;
                this.SubmitToaster(data);
                this.router.navigate(['/dashboard/order-page']);
            },
            error => {
                console.log(error);
                this.toasterError(error)
                this.messageError = error.errors
                console.log(this.messageError)
                this.right = false;
                this.spinner = false;
            }
        );
    }

    SubmitToaster(message) {
        this.toastr.success('👋' + message.message,
            'Submit !',
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
