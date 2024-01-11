import {Component, OnInit, OnDestroy, ViewChild, ViewEncapsulation} from '@angular/core';
import {Subject} from 'rxjs';
import {ColumnMode, DatatableComponent} from '@swimlane/ngx-datatable';
import {CoreConfigService} from '@core/services/config.service';
import {FormBuilder, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute} from "@angular/router";
import {AllProductsService} from "./all-products.service";
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-all-products',
    templateUrl: './all-products.component.html',
    styleUrls: ['./all-products.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AllProductsComponent implements OnInit, OnDestroy {
    // public
    rowsProducts: any;
    rowsInSaleProducts: any;
    rowsInFeatureProducts: any;
    columns: any;
    editData: any;
    public active: any;
    productsData: any;
    token: any;
    id: any;
    prodId: any;
    productId: any;
    pdId: any;
    editForm: any;
    addForm: any;
    closeResult = '';
    message: any = ''
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

    // decorator
    @ViewChild(DatatableComponent) table: DatatableComponent;

    // private
    private tempData = [];
    private _unsubscribeAll: Subject<any>;
    public rows;
    public tempFilterData;
    public previousStatusFilter = '';

    /**
     * Constructor
     *
     * @param {CoreConfigService} _coreConfigService
     * @param {CalendarService} _calendarService
     * @param {InvoiceListService} _invoiceListService
     */
    @ViewChild('contentEdit', {static: false}) private contentEdit;

    constructor(private _allProductsService: AllProductsService,
                private _coreConfigService: CoreConfigService,
                public dialog: MatDialog,
                public toaster: ToastrService,
                private activatedRoute: ActivatedRoute,
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
            this.rowsProducts = temp;
            // Whenever the filter changes, always go back to the first page
            this.table.offset = 0;
        } else {
            this.getProducts()
        }

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
        this.productId = this.activatedRoute.snapshot.paramMap.get('id');
        this.getProducts()
        this.addForm = this._formBuilder.group({
            sale_price: ['', Validators.required],
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

    open(content, row) {
        this.prodId = row.id
        console.log(this.prodId)
        const modalRef = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
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

    getProducts() {
        this._allProductsService.getProducts(this.token, this.productId).subscribe(
            data => {
                this.rowsProducts = data['data'];
                const products = this.rowsProducts
                const inSaleResult = products.filter(products => products.sale_status == 1);
                this.rowsInSaleProducts = inSaleResult;
                console.log(inSaleResult)
                const inFeatureResult = products.filter(products => products.feature_status == 1);
                this.rowsInFeatureProducts = inFeatureResult;
                console.log(inFeatureResult)
                this.tempData = this.rowsProducts
                console.log(this.rowsProducts);

                this.columns = Object.keys(data['data'][0]);
            },
            error => {
                console.log(error);

            }
        );

    }

    submit() {
        this._allProductsService.addQty(this.token, this.addForm.value.all_qty, this.addForm.value.supplier_price, this.id).subscribe(
            data => {
                console.log(data);
                this.getProducts()
            },
            error => {
                console.log(error);

            }
        );

    }

    deleteProd(id) {
        this._allProductsService.deleteProd(this.token, id).subscribe(
            data => {
                this.getProducts();
            },
            error => {
                console.log(error);

            }
        );
    }

    deleteFromSale(id) {
        this._allProductsService.deleteSale(this.token, id).subscribe(
            data => {
                this.getProducts();
            },
            error => {
                console.log(error);

            }
        );
    }

    deleteFromFeature(id) {
        this._allProductsService.deleteFeature(this.token, id).subscribe(
            data => {
                this.getProducts();
            },
            error => {
                console.log(error);

            }
        );
    }

    inSale() {
        this._allProductsService.sale(this.token, this.prodId, this.addForm.value.sale_price).subscribe(
            data => {
                this.getProducts();
            },
            error => {
                console.log(error);

            }
        );
    }

    inFeature(id) {
        this._allProductsService.feature(this.token, id).subscribe(
            data => {
                this.getProducts();
            },
            error => {
                console.log(error);

            }
        );
    }

    openEdit(content) {
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    }

    addToCart(id) {
        this._allProductsService.addToCart(this.token, id).subscribe(
            data => {
                console.log(data);
                if (data['message'] == 'Already Added To Cart'){
                    this.toasterError(data)
                } else{
                    this.toasterSuccess(data)
                }
            },
            error => {
                console.log(error);
            }
        );
    }

    makeVendorOrder(id) {
        this._allProductsService.addToVendorCart(this.token, id).subscribe(
            data => {
                console.log(data);
                if (data['message'] == 'Already Added To Cart'){
                    this.toasterError(data)
                } else{
                    this.toasterSuccess(data)
                }
            },
            error => {
                console.log(error);
            }
        );
    }
    toasterSuccess(mess) {
        this.toaster.success('👋' + mess.message, 'Success!', {
            toastClass: 'toast ngx-toastr',
            positionClass: 'toast-top-right',
            closeButton: true
        });
    }
    toasterError(mess) {
        this.toaster.error('👋' + mess.message, 'ERROR!', {
            toastClass: 'toast ngx-toastr',
            positionClass: 'toast-top-right',
            closeButton: true
        });
    }
}
