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
import {AttributesListService} from './attributes-list.service';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import {ToastrService} from "ngx-toastr";
@Component({
    selector: 'app-attributes-list-invoice',
    templateUrl: './attributes-list.component.html',
    styleUrls: ['./attributes-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AttributesListComponent implements OnInit, OnDestroy {
    // public
    token: any;
    id: any;
    rowId: any;
    attributeId: any;
    attributesSelect: any;
    attributes: any;
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
     * @param {AttributesListService} _CategoriesListService
     * @param dialog
     * @param modalService
     */
    /**
     * tslint:disable-next-line:max-line-length
     */
    constructor(
        private _categoriesListService: AttributesListService,
        private _coreConfigService: CoreConfigService,
        public dialog: MatDialog, private modalService: NgbModal,
        private _formBuilder: FormBuilder,
        private toastr : ToastrService,
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
            this.getAttributes()
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
        this.getAttributes();
        this.getAttributeSelect();
        console.log(this.token);
        // Subscribe config change
        this.addForm = this._formBuilder.group({
            name: ['', Validators.required],
        });
        this.editForm = this._formBuilder.group({
            name: ['', [Validators.required]],
        });

    }

    open(content) {
        this.modalService.open(content, {
            centered: true,
            size: 'sm'
        });
        this.right = false;
    }
    selectedItem(value) {
        console.log(value);
        this.attributeId = value.id;
    }

    openEdit(content, id, row) {
        this.modalService.open(content, {
            centered: true,
            size: 'sm'
        });
        this.rowId = id;
        console.log(row);
        this.editForm = this._formBuilder.group({
            name: [row.name, [Validators.required]],
        });
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

    addAttributes() {
        this.spinner = true;
        this.right = false;
        this._categoriesListService.addAttribute(this.addForm.value.name, this.token).subscribe(
            data => {
                this.getAttributes();
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

    getAttributes() {
        this._categoriesListService.attributes(this.token).subscribe(
            data => {
                this.attributes = data['data'];
                console.log(data['data']);
                this.tempData=this.categories
            },
            error => {
                console.log(error);

            }
        );

    }
    getAttributeSelect() {
        this._categoriesListService.attributes(this.token).subscribe(
            data => {
                this.attributesSelect = data['data'];
                console.log(data['data']);
            },
            error => {
                console.log(error);

            }
        );

    }


    edit() {
        this.spinner = true;
        this.right = false;
        this._categoriesListService.editAttribute( this.token, this.editForm.value.name, this.rowId).subscribe(
            data => {
                console.log(data);
                this.getAttributes()
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
    deleteAtt(id) {
        this._categoriesListService.deleteAtt(this.token, id).subscribe(
            data => {
                this.getAttributes();
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
