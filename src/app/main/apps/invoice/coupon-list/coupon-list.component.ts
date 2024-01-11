// @ts-ignore
import {Component, OnInit, OnDestroy, ViewChild, ViewEncapsulation} from '@angular/core';
import {Subject} from 'rxjs';
import {ColumnMode, DatatableComponent} from '@swimlane/ngx-datatable';
import {CoreConfigService} from '@core/services/config.service';
import {MatDialog} from '@angular/material/dialog';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CouponListService} from './coupon-list.service';
import {ToastrService} from "ngx-toastr";
import { ngxLoadingAnimationTypes } from 'ngx-loading';

@Component({
    selector: 'app-coupon-list',
    templateUrl: './coupon-list.component.html',
    styleUrls: ['./coupon-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CouponListComponent implements OnInit, OnDestroy {
    // public
    token: any;
    categories: any;
    type: any;
    categoryId: any;
    subCategories: any;
    id: any;
    activeStatus:number=1;
    disActiveStatus:number=0;
    prodId:any;
    productIdEdit: any;
    products: any;
    brandId: any;
    productId: any;
    dateFrom: any;
    dateModel;
    dateFromEdit: any;
    public addForm: FormGroup;
    public editForm: FormGroup;
    public data: any;
    public selectedOption = 10;
    public ColumnMode = ColumnMode;
    public selectType: any = [
        {name: 'Percent', value: 'percent'},
        {name: 'Fixed', value: 'fixed'},
    ];

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
    coupons: any;
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
     * @param {CouponListService} _CategoriesListService
     * @param dialog
     * @param modalService
     */
    /**
     * tslint:disable-next-line:max-line-length
     */
    constructor(
        private _categoriesListService: CouponListService,
        private _coreConfigService: CoreConfigService,
        public dialog: MatDialog,
        public toaster: ToastrService,
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
            this.coupons = temp;
            // Whenever the filter changes, always go back to the first page
            this.table.offset = 0;
        } else {
            this.getCoupons()
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
        this.getCoupons();
        this.getCategories();
        console.log(this.token);
        // Subscribe config change
        this.addForm = this._formBuilder.group({
            code: ['', Validators.required],
            value: ['', Validators.required],
        });
        this.editForm = this._formBuilder.group({
            code: ['', [Validators.required]],
            value: ['', Validators.required],
        });
        // Subscribe config change
        // this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
        //     // If we have zoomIn route Transition then load datatable after 450ms(Transition will finish in 400ms)
        //     if (config.layout.animation === 'zoomIn') {
        //         setTimeout(() => {
        //             this._categoriesListService.onInvoiceListChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
        //                 this.data = response;
        //                 this.rows = this.data;
        //                 this.tempData = this.rows;
        //                 this.tempFilterData = this.rows;
        //             });
        //         }, 450);
        //     } else {
        //         this._categoriesListService.onInvoiceListChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
        //             this.data = response;
        //             this.rows = this.data;
        //             this.tempData = this.rows;
        //             this.tempFilterData = this.rows;
        //         });
        //     }
        // });


    }

    setType(event) {
        console.log(event.target.value)
        this.type = event.target.value
    }

    open(content) {
        const modalRef = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
        modalRef.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    openEdit(content, id, row) {
        console.log(row);
        this.type =row.type
        this.categoryId =row.category_id
        console.log(this.categoryId)
        this.getSubCategoriesForEdit(this.categoryId)
        this.brandId =row.brand_id
        console.log(this.brandId)
        this.getProductsForEdit(this.categoryId, this.brandId)
        this.productIdEdit= row.product.id
        console.log(this.productId)
        this.dateFrom =row.expiry_date
        let x = this.dateFrom.split('-');
        let y = {
            year: parseInt(x[0]),
            month: parseInt(x[1]),
            day: parseInt(x[2])
        }
        this.dateModel = y;
        this.productIdEdit = row.product.id
        this.editForm = this._formBuilder.group({
            code: [row.code, [Validators.required]],
            value: [row.value, Validators.required],
        });
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

    getCategories() {
        this._categoriesListService.categories(this.token).subscribe(
            data => {
                this.categories = data['data'];
            },
            error => {
                console.log(error);

            }
        );

    }

    getCoupons() {
        this._categoriesListService.coupons(this.token).subscribe(
            data => {
                this.coupons = data['data'];
                console.log(this.coupons)
            },
            error => {
                console.log(error);

            }
        );

    }

    getSubCategories(event) {
        this.categoryId = event.id;
        console.log(event);
        this._categoriesListService.subCategories(this.token, this.categoryId).subscribe(
            data => {
                this.subCategories = data['data'];
                console.log(this.subCategories);
            },
            error => {
                console.log(error);

            }
        );

    }
    getSubCategoriesForEdit(id) {
        console.log();
        this._categoriesListService.subCategories(this.token, id).subscribe(
            data => {
                this.subCategories = data['data'];
                console.log(this.subCategories);
            },
            error => {
                console.log(error);

            }
        );

    }

    getProducts(event) {
        this.brandId = event.id;
        console.log(this.brandId)
        this._categoriesListService.products(this.token, this.brandId, this.categoryId).subscribe(
            data => {
                this.products = data['data'];
                console.log(this.products);

            },
            error => {
                console.log(error);

            }
        );

    }
    getProductsForEdit(id1, id2) {
        this._categoriesListService.products(this.token, id1, id2).subscribe(
            data => {
                this.products = data['data'];
                console.log(this.products);

            },
            error => {
                console.log(error);

            }
        );

    }

    selectedItem(value) {
        console.log(value);
        this.productId = value.id;
    }

    submitForm(): any {
        const formData: FormData = new FormData();
        formData.append('value', this.addForm.value.value);
        formData.append('code', this.addForm.value.code);
        formData.append('product_id', this.productId);
        formData.append('type', this.type);
        formData.append('expiry_date', this.dateFrom);
        // @ts-ignore
        return formData;
    }

    submit() {
        this.spinner = true;
        this.right = false;
        this._categoriesListService.addCoupon(this.submitForm(), this.token).subscribe(
            data => {
                this.getCoupons()
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

    setFromDate(value) {
        this.dateFrom = this.dateFormat(value)
    }

    setFromDateEdit(value) {
        this.dateFromEdit = this.dateFormat(value)
    }

    dateFormat(e) {
        const date = new Date(Date.UTC(e.year, e.month, e.day))
        const result = date.toISOString().split('T')[0]
        return result
    }

    submitFormEdit(): any {
        const formData: FormData = new FormData();
        formData.append('value', this.editForm.value.value);
        formData.append('code', this.editForm.value.code);
        formData.append('product_id', this.productIdEdit);
        formData.append('type', this.type);
        formData.append('expiry_date', this.dateFrom);

        // @ts-ignore
        return formData;
    }

    edit() {
        this.spinner = true;
        this.right = false;
        this._categoriesListService.editCoupon(this.submitFormEdit(), this.token, this.id).subscribe(
            data => {
                console.log(data);
                this.getCoupons()
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

    deleteCoupon(id) {
        this._categoriesListService.deleteCoupon(this.token, id).subscribe(
            data => {
                this.getCoupons();
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
    activateCoupon(id) {
        this._categoriesListService.activeCoupon(this.token, this.activeStatus, id).subscribe(
            data => {
                this.getCoupons();
                this.submitToaster(data)
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
    deactivateCoupon(id) {
        this._categoriesListService.disactiveCoupon(this.token, this.disActiveStatus, id).subscribe(
            data => {
                this.getCoupons();
                this.submitToaster(data)
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
        this.toaster.success('👋'+ message.message,
            'Submit !',
            {
                positionClass: 'toast-top-right',
                toastClass: 'toast ngx-toastr',
                closeButton: true
            });
    }
    deleteToaster(message) {
        this.toaster.success('👋'+ message.message,
            'Delete !',
            {
                positionClass: 'toast-top-right',
                toastClass: 'toast ngx-toastr',
                closeButton: true
            });
    }

    toasterError(error) {
        this.toaster.error('👋' + error, 'ERROR!', {
            toastClass: 'toast ngx-toastr',
            positionClass: 'toast-top-right',
            closeButton: true
        });
    }
}
