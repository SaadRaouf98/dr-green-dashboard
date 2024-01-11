import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Subject} from 'rxjs';

import {CoreSidebarService} from '@core/components/core-sidebar/core-sidebar.service';
import {ColumnMode, DatatableComponent} from '@swimlane/ngx-datatable';

import {repeaterAnimation} from 'app/main/apps/invoice/invoice.animation';
import {OrderEditService} from './order-edit.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {ngxLoadingAnimationTypes} from 'ngx-loading';
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-order-edit',
    templateUrl: './order-edit.component.html',
    styleUrls: ['./order-edit.component.scss'],
    animations: [repeaterAnimation],
    encapsulation: ViewEncapsulation.None
})
export class OrderEditComponent implements OnInit, OnDestroy {
    // Public
    token: any;
    public messageError = '';
    public messageSuccess = '';
    id: any;
    type: any;
    categories: any;
    orders: any;
    prodId: any;
    subCategories: any;
    brandProduct: any;
    vendors: any;
    categoryId: any;
    orderId: any;
    brandId: any;
    itemId: any;
    vendorId: any;
    dateFrom: any;
    dateModel;
    fileToUpload2: any = [];
    images2: any = [];
    severalImages: any = [];
    transactionId: any;
    myFiles: string [] = [];
    public orderEditForm: FormGroup;
    public url = this.router.url;
    public urlLastValue;
    spinner: boolean = false;
    right: boolean = false;
    public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes
    @ViewChild(DatatableComponent) table: DatatableComponent;
    public selectedStatus = [];
    public searchValue = '';
    public selectType: any = [
        {name: 'CASH', value: 'cash'},
        {name: 'CREDIT', value: 'credit'},
        {name: 'CHEQUE', value: 'cheque '},
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
        private _productsAdditionFormService: OrderEditService,
        private _coreSidebarService: CoreSidebarService,
        private toastr: ToastrService,
        private http: HttpClient,
        private modalService: NgbModal
    ) {
        this._unsubscribeAll = new Subject();
        this.urlLastValue = this.url.substr(this.url.lastIndexOf('/') + 1);
    }

    // Public Methods
    // -----------------------------------------------------------------------------------------------------
    // Lifecycle Hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    ngOnInit(): void {
        this.token = JSON.parse(localStorage.getItem('currentUser')).token;
        this.orderId = this.activatedRoute.snapshot.paramMap.get('id');
        this.orderEditForm = this._formBuilder.group({
            tracking_id: ['', Validators.required],
            invoice_id: ['', Validators.required],
            extra_money: ['', Validators.required],
        });
        console.log(this.orderId)
        this.getVendors()
        this.getOrders()
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
    }

    get f() {
        return this.orderEditForm.controls;
    }

    setType(event) {
        console.log(event.value)
        this.type = event.value
    }

    selectedVendor(value) {
        this.vendorId = value.id;
        console.log(this.vendorId);
    }

    getOrders() {
        this._productsAdditionFormService.orders(this.token, this.orderId).subscribe(
            data => {
                this.orders = data['data'][0];
                this.severalImages = this.orders.images;
                console.log(this.severalImages)
                this.prodId = this.orders.product_id;
                console.log(this.orders)
                this.vendorId = this.orders.vendor.vendor_id
                this.type = this.orders.method_payment
                this.dateFrom = this.orders.arrival_date
                let x = this.dateFrom.split('-');
                let y = {
                    year: parseInt(x[0]),
                    month: parseInt(x[1]),
                    day: parseInt(x[2])
                }
                this.dateModel = y;
                console.log(y)
                this.orderEditForm = this._formBuilder.group({
                    tracking_id: [this.orders.tracking_number, Validators.required],
                    invoice_id: [this.orders.invoice, Validators.required],
                    extra_money: [this.orders.extra_money, Validators.required],
                });
            },
            error => {
                console.log(error);

            }
        );

    }

    onFileSelected2(event: any): void {
        if (event.target.files && event.target.files[0]) {
            var filesAmount = event.target.files.length;
            for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader();
                this.fileToUpload2.push(event.target.files.item(i));
                reader.onload = (event: any) => {
                    this.images2.push(event.target.result);
                }
                reader.readAsDataURL(event.target.files[i]);
            }
        }
    }

    removeImage2(url: any) {
        this.images2 = this.images2.filter(img => (img != url));
    }

    removeImageGet2(url: any) {
        this.severalImages = this.severalImages.filter(img => (img != url));
    }

    getVendors() {
        this._productsAdditionFormService.vendors(this.token).subscribe(
            data => {
                this.vendors = data['data'];
                console.log(this.vendors)
            },
            error => {
                console.log(error);

            }
        );

    }

    setFromDate(value) {
        const date = value.year + '-' + value.month + '-' + value.day;
        console.log(date)
        this.dateFrom = date

    }

    submitForm(): any {
        const formData: FormData = new FormData();
        for (var i = 0; i < this.fileToUpload2.length; i++) {
            formData.append(`images[]`, this.fileToUpload2[i]);
        }
        formData.append('supplier_id', this.vendorId);
        formData.append('method_payment', this.type);
        formData.append('arrival_date', this.dateFrom);
        formData.append('tracking_number', this.orderEditForm.value.tracking_id);
        formData.append('invoice', this.orderEditForm.value.invoice_id);
        formData.append('extra_money', this.orderEditForm.value.extra_money);
        // @ts-ignore
        return formData;
    }

    onSubmit() {
        this.spinner = true;
        this.right = false;
        this._productsAdditionFormService.editOrder(this.token, this.submitForm(), this.orderId).subscribe(
            data => {
                console.log(data);
                this.right = true;
                this.spinner = false;
                this.SubmitToaster(data);
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
