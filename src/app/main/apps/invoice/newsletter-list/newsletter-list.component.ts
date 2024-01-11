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
import {NewsletterListService} from './newsletter-list.service';
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-newsletter-list',
    templateUrl: './newsletter-list.component.html',
    styleUrls: ['./newsletter-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NewsletterListComponent implements OnInit, OnDestroy {
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
    newsletter: any;
    activeStatus: any = 1;
    deactiveStatus: any = 0;
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
     * @param {NewsletterListService} _CategoriesListService
     * @param dialog
     * @param modalService
     */
    /**
     * tslint:disable-next-line:max-line-length
     */
    constructor(
        private _categoriesListService: NewsletterListService,
        private _coreConfigService: CoreConfigService,
        public dialog: MatDialog,
        private toaster : ToastrService,
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
            this.newsletter = temp;
            // Whenever the filter changes, always go back to the first page
            this.table.offset = 0;
        } else {
            this.getNewsletter();
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
        this.getNewsletter();
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

    activate(id) {
        this._categoriesListService.status(this.activeStatus,this.token, id).subscribe(
            data => {
                console.log(data);
                this.getNewsletter()
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

    deactivate(id) {
        this._categoriesListService.status(this.deactiveStatus, this.token, id).subscribe(
            data => {
                console.log(data);
                this.getNewsletter()
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


    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    getNewsletter() {
        this._categoriesListService.news(this.token).subscribe(
            data => {
                this.newsletter = data['data'];
                console.log(data['data']);
                this.tempData = this.newsletter;
            },
            error => {
                console.log(error);

            }
        );

    }
    delete(id) {
        this._categoriesListService.deleteApi(this.token, id).subscribe(
            data => {
                this.getNewsletter();
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
        this.toaster.success('👋'+ message.message,
            'Change Status !',
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
