// @ts-ignore
import {Component, OnInit, OnDestroy, ViewChild, ViewEncapsulation} from '@angular/core';
import {Subject} from 'rxjs';
import {ColumnMode, DatatableComponent} from '@swimlane/ngx-datatable';
import {CoreConfigService} from '@core/services/config.service';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material/dialog';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FaqService} from './faq.service';
import { ngxLoadingAnimationTypes } from 'ngx-loading';

@Component({
    selector: 'app-faq',
    templateUrl: './faq.component.html',
    styleUrls: ['./faq.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FaqComponent implements OnInit, OnDestroy {
    // public
    token: any;
    id: any;
    public addForm: FormGroup;
    public editForm: FormGroup;
    public data: any;
    public selectedOption = 10;
    public ColumnMode = ColumnMode;
    closeResult = '';
    columns: any;
    rowsUsers: any;
    FAQS: any;
    spinner: boolean = false;
    spinnerLoader: boolean = false;
    right: boolean = false;
    // decorator
    @ViewChild(DatatableComponent) table: DatatableComponent;

    // private
    private _unsubscribeAll: Subject<any>;
    public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
    /**
     * Constructor
     *
     * @param {CoreConfigService} _coreConfigService
     * @param {FaqService} _CategoriesListService
     * @param dialog
     * @param modalService
     */
    /**
     * tslint:disable-next-line:max-line-length
     */
    constructor(
        private _categoriesListService: FaqService,
        private _coreConfigService: CoreConfigService,
        public dialog: MatDialog,
        private toastr: ToastrService,
        private modalService: NgbModal,
        private _formBuilder: FormBuilder
    ) {
        this._unsubscribeAll = new Subject();
    }

    // modal Open Form
    modalOpenForm(modalForm) {
        this.modalService.open(modalForm);
    }

    // Lifecycle Hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    ngOnInit(): void {
        this.getFAQS();
        this.addForm = this._formBuilder.group({
            subject: ['', Validators.required],
            question: ['', Validators.required],
            answer: ['', Validators.required],
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
        this.id = id;
        this.editForm = this._formBuilder.group({
            subject: [row.subject, Validators.required],
            question: [row.question, Validators.required],
            answer: [row.answer, Validators.required],
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

    submit() {
        this.spinner = true;
        this.right = false;
        this._categoriesListService.addFAQSApi(this.addForm.value).subscribe(
            data => {
                this.right = true;
                this.spinner = false;
                this.submitToaster(data)
                this.ngOnInit();
                this.modalService.dismissAll();
            },
            error => {
                console.log(error);
                Object.entries(error.errors).forEach((item)=> {
                    this.toasterError(item[1])
                    console.log(item)
                })
                this.right = false;
                this.spinner = false;
            }
        );

    }

    getFAQS() {
        this._categoriesListService.FAQSApi().subscribe(
            data => {
                this.FAQS = data['data'];
                console.log(data['data']);
            },
            error => {
                console.log(error);
                this.toasterError(error)
            }
        );

    }

    edit() {
        this.spinner = true;
        this.right = false;
        this._categoriesListService.editFAQSApi(this.editForm.value, this.id).subscribe(
            data => {
                this.right = true;
                this.spinner = false;
                console.log(data);
                this.submitToaster(data)
                this.ngOnInit()
                this.modalService.dismissAll();
            },
            error => {
                console.log(error);
                Object.entries(error.errors).forEach((item)=> {
                    this.toasterError(item[1])
                    console.log(item)
                })
                this.right = false;
                this.spinner = false;
            }
        );

    }

    deleteCat(id) {
        this._categoriesListService.deleteFAQSApi(id).subscribe(
            data => {
                this.ngOnInit();
                this.getFAQS();
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
