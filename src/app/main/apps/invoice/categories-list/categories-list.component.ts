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
import {CategoriesListService} from './categories-list.service';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-categories-list',
    templateUrl: './categories-list.component.html',
    styleUrls: ['./categories-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CategoriesListComponent implements OnInit, OnDestroy {
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
    public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
    spinner: boolean = false;
    right: boolean = false;
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
     * @param {CategoriesListService} _CategoriesListService
     * @param dialog
     * @param modalService
     */
    /**
     * tslint:disable-next-line:max-line-length
     */
    constructor(
        private _categoriesListService: CategoriesListService,
        private _coreConfigService: CoreConfigService,
        public dialog: MatDialog,
        private toastr: ToastrService,
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
        if (event.target.value.length > 0){
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
        }else{
            this.getCategories()
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
    }

    open(content) {
        this.modalService.open(content, {
            centered: true,
            size: 'sm'
        });
        this.right = false;
    }
    openEdit(content, id, row) {
        this.modalService.open(content, {
            centered: true,
            size: 'sm'
        });
        console.log(row);
        this.editForm = this._formBuilder.group({
            name: [row.name, [Validators.required]],
            description: [row.description, Validators.required],
        });
        this.id = id;
        this.right = false;
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
        this.spinner = true;
        this.right = false;
        this._categoriesListService.addCategories(this.addForm.value.name, this.addForm.value.description, this.token).subscribe(
            data => {
                this.right = true;
                this.spinner = false;
                this.getCategories();
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

    getCategories() {
        this._categoriesListService.categories(this.token).subscribe(
            data => {
                this.categories = data['data'];
                console.log(data['data']);
                this.tempData=this.categories
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
        this.spinner = true;
        this.right = false;
        this._categoriesListService.editCategories(this.submitForm2(), this.token, this.id).subscribe(
            data => {
                console.log(data);
                this.right = true;
                this.spinner = false;
                this.modalService.dismissAll();
                this.getCategories()
                this.submitToaster(data)
            },
            error => {
                console.log(error);
                this.right = false;
                this.spinner = false;
                Object.entries(error.errors).forEach((item)=> {
                    this.toasterError(item[1])
                    console.log(item)
                })
            }
        );

    }
    deleteCat(id) {
        this._categoriesListService.deleteCat(this.token, id).subscribe(
            data => {
                this.getCategories();
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
