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
import {AllBrandsCategoriesService} from './all-brands-categories.service';

@Component({
    selector: 'app-all-brands-Categories',
    templateUrl: './all-brands-categories.component.html',
    styleUrls: ['./all-brands-categories.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AllBrandsCategoriesComponent implements OnInit, OnDestroy {
    // public
    token: any;
    id: any;
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
     * @param {AllBrandsCategoriesService} _CategoriesListService
     * @param dialog
     * @param modalService
     */
    /**
     * tslint:disable-next-line:max-line-length
     */
    constructor(
        private _categoriesListService: AllBrandsCategoriesService,
        private _coreConfigService: CoreConfigService,
        public dialog: MatDialog,
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
            this.getCategories();
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
        this.getCategories();
        console.log(this.token);
        // Subscribe config change
        this.addForm = this._formBuilder.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
        });
        this.editForm = this._formBuilder.group({
            name: ['', [Validators.required]],
            description: ['', Validators.required],
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

    openEdit(content, id, row) {
        console.log(row);
        this.editForm = this._formBuilder.group({
            name: [row.name, [Validators.required]],
            description: [row.description, Validators.required],
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

    submit() {
        this._categoriesListService.addCategories(this.addForm.value.name, this.addForm.value.description, this.token).subscribe(
            data => {
                this.getCategories();
            },
            error => {
                console.log(error);

            }
        );

    }

    getCategories() {
        this._categoriesListService.categories(this.token).subscribe(
            data => {
                this.categories = data['data'];
                console.log(data['data']);
                this.tempData = this.categories;
            },
            error => {
                console.log(error);

            }
        );

    }

    submitForm2(): any {
        const formData: FormData = new FormData();
        formData.append('name', this.editForm.value.name);
        formData.append('description', this.editForm.value.description);
        // @ts-ignore
        return formData;
    }

    edit() {
        this._categoriesListService.editCategories(this.submitForm2(), this.token, this.id).subscribe(
            data => {
                console.log(data);
                this.getCategories();
            },
            error => {
                console.log(error);

            }
        );

    }

    deleteCat(id) {
        this._categoriesListService.deleteCat(this.token, id).subscribe(
            data => {
                this.getCategories();
            },
            error => {
                console.log(error);

            }
        );
    }


}
