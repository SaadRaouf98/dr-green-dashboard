// @ts-ignore
import {Component, OnInit, OnDestroy, ViewChild, ViewEncapsulation} from '@angular/core';
import {Subject} from 'rxjs';
import {ColumnMode, DatatableComponent} from '@swimlane/ngx-datatable';
import {CoreConfigService} from '@core/services/config.service';
import {MatDialog} from '@angular/material/dialog';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MostWishlistService} from './most-wishlist.service';

@Component({
    selector: 'app-most-wishlist',
    templateUrl: './most-wishlist.component.html',
    styleUrls: ['./most-wishlist.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MostWishlistComponent implements OnInit, OnDestroy {
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

    /**
     * Constructor
     *
     * @param {CoreConfigService} _coreConfigService
     * @param {MostWishlistService} _CategoriesListService
     * @param dialog
     * @param modalService
     */
    /**
     * tslint:disable-next-line:max-line-length
     */
    constructor(
        private _categoriesListService: MostWishlistService,
        private _coreConfigService: CoreConfigService,
        public dialog: MatDialog,
        private modalService: NgbModal,
        private _formBuilder: FormBuilder
    ) {
        this._unsubscribeAll = new Subject();
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
        this.getWishes();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    getWishes() {
        this._categoriesListService.wish(this.token).subscribe(
            data => {
                this.attributes = data['data'];
                console.log(data['data']);
            },
            error => {
                console.log(error);

            }
        );

    }
}
