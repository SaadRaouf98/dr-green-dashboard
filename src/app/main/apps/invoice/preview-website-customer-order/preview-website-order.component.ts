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
import {PreviewWebsiteOrderService} from './preview-website-order.service';

@Component({
    selector: 'app-preview-website-order',
    templateUrl: './preview-website-order.component.html',
    styleUrls: ['./preview-website-order.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PreviewWebsiteOrderComponent implements OnInit, OnDestroy {
    // public
    token: any;
    id: any;
    eachOrder: any;
    historyData: any;
    relatedProducts: any;
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
     * @param {PreviewWebsiteOrderService} _CategoriesListService
     * @param dialog
     * @param modalService
     */
    /**
     * tslint:disable-next-line:max-line-length
     */
    constructor(private _categoriesListService: PreviewWebsiteOrderService, private activatedRoute: ActivatedRoute, private _coreConfigService: CoreConfigService, public dialog: MatDialog, private modalService: NgbModal, private _formBuilder: FormBuilder) {
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
        console.log(this.token);
        // Subscribe config change
        this.editForm = this._formBuilder.group({
            qty: ['', [Validators.required]],
            pice: ['', [Validators.required]],
        });

    }
    openEdit(content, id, row) {
        console.log(row);
        this.editForm = this._formBuilder.group({
            qty: [row.qty, [Validators.required]],
            price: [row.price, [Validators.required]],
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
                this.eachOrder = data['data'];
                console.log(this.eachOrder)
                this.relatedProducts = data['data'].items;
                console.log(this.relatedProducts);
            },
            error => {
                console.log(error);

            }
        );

    }
    getHistory(id) {
        this._categoriesListService.history(this.token, id).subscribe(
            data => {
                this.historyData = data['data'];
                console.log(this.historyData);
            },
            error => {
                console.log(error);

            }
        );

    }

    backOrder(id) {
        this._categoriesListService.backOrder(this.token, id).subscribe(
            data => {
                console.log(data);
                this.getEachOrder();
            },
            error => {
                console.log(error);

            }
        );

    }

    selectedItem(value) {
        console.log(value);
        this.backValue = 1;
        console.log(this.backValue);
    }

    submitForm2(): any {
        const formData: FormData = new FormData();
        formData.append('quantity', this.editForm.value.qty);
        formData.append('price', this.editForm.value.price);
        formData.append('back_qty', this.backValue);

        // @ts-ignore
        return formData;
    }


    edit() {
        this._categoriesListService.editQty(this.submitForm2(), this.token, this.id).subscribe(
            data => {
                console.log(data);
                this.getEachOrder();
            },
            error => {
                console.log(error);

            }
        );

    }
}
