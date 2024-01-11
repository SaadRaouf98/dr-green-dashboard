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
import {SubCategoriesListService} from 'app/main/apps/invoice/sub-categories-list/sub-categories-list.service';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-sub-categories-list',
    templateUrl: './sub-categories-list.component.html',
    styleUrls: ['./sub-categories-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SubCategoriesListComponent implements OnInit, OnDestroy {
    // public
    token: any;
    categories: any;
    subCategories: any;
    id: any;
    catId: any;
    mainImage: any = [];
    fileToUpload1: any = [];
    images1: any = [];
    categoryId: any;
    categoryId2: any;
    fileToUpload: any;
    fileToUpload2: any;
    file: any;
    file2: any;
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
    // decorator
    @ViewChild(DatatableComponent) table: DatatableComponent;
    public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
    spinner: boolean = false;
    spinnerLoader: boolean = false;
    right: boolean = false;
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
     * @param {itemsListService} _invoiceListService
     * @param dialog
     * @param modalService
     */
    /**
     * tslint:disable-next-line:max-line-length
     */
    constructor(
        private _itemsListService: SubCategoriesListService,
        private _coreConfigService: CoreConfigService,
        private activatedRoute: ActivatedRoute,
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
        if (event.target.value.length > 0) {
            // Reset ng-select on search
            this.selectedStatus = this.selectStatus[0];

            const val = event.target.value.toLowerCase();

            // filter our data
            const temp = this.tempData.filter(function (d) {
                return d.name.toLowerCase().indexOf(val) !== -1 || !val;
            });

            // update the rows
            this.subCategories = temp;
            // Whenever the filter changes, always go back to the first page
            this.table.offset = 0;
        } else {
            this.getSubCategories();
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
        this.catId = this.activatedRoute.snapshot.paramMap.get('id');
        this.getSubCategories();
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
        this.right = false;
        console.log(row);
        this.editForm = this._formBuilder.group({
            name: [row.name, [Validators.required]],
            description: [row.description, Validators.required],
        });
        this.id = id;
        this.categoryId2 = row.category.id;
        this.mainImage = row.image;
        console.log(this.categoryId2);
        console.log(this.mainImage);
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    selected(value) {
        this.categoryId = value.id;
        console.log(this.categoryId);
    }

    selected2(value) {
        this.categoryId2 = value.id;
        console.log(this.categoryId2);
    }

    onFileSelected(files: FileList): void {
        this.fileToUpload = files.item(0);
        (<HTMLInputElement>document.getElementById('blah')).src = window.URL.createObjectURL(this.fileToUpload);
        (<HTMLInputElement>document.getElementById('blah')).style.height = '70px';
        if (files && files[0]) {
            const reader = new FileReader();
            reader.onload = (event: any) => {
                this.file = event.target.result;
                // this.form.patchValue({
                //   image: this.fileToUpload as any
                // });
            };
            reader.readAsDataURL(files[0]);
        }
    }

    onFileSelected1(event: any): void {

        if (event.target.files && event.target.files[0]) {

            var filesAmount = event.target.files.length;
            for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader();
                this.fileToUpload1.push(event.target.files.item(i));
                reader.onload = (event: any) => {
                    this.images1.push(event.target.result);
                    // console.log(this.images1)
                };
                reader.readAsDataURL(event.target.files[i]);
            }
        }
    }

    removeImageWithEditForm() {
        this.mainImage = '';
    }

    removeImageWithEditFormUp() {
        this.images1 = '';
    }

    submitForm(): any {
        const formData: FormData = new FormData();
        formData.append('name', this.addForm.value.name);
        formData.append('description', this.addForm.value.description);
        formData.append('image', this.fileToUpload);
        formData.append('category_id', this.catId);
        // @ts-ignore
        return formData;
    }

    submitForm2(): any {
        const formData: FormData = new FormData();
        for (var i = 0; i < this.fileToUpload1.length; i++) {
            formData.append(`image`, this.fileToUpload1[i]);
        }
        formData.append('name', this.editForm.value.name);
        formData.append('description', this.editForm.value.description);
        formData.append('category_id', this.catId);
        // @ts-ignore
        return formData;
    }

    submit() {
        this.spinner = true;
        this.right = false;
        this._itemsListService.addSub(this.submitForm()).subscribe(
            data => {
                this.right = true;
                this.spinner = false;
                this.getSubCategories();
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

    edit() {
        this.spinner = true;
        this.right = false;
        this._itemsListService.editSub(this.submitForm2(), this.token, this.id).subscribe(
            data => {
                console.log(data);
                this.getSubCategories();
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

    getSubCategories() {
        this._itemsListService.subCategories(this.token, this.catId).subscribe(
            data => {
                this.subCategories = data['data'];
                console.log(this.subCategories);
                this.tempData = this.subCategories;
            },
            error => {
                console.log(error);

            }
        );

    }

    deleteBrand(id) {
        this._itemsListService.deleteBrand(this.token, id).subscribe(
            data => {
                this.getSubCategories();
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
