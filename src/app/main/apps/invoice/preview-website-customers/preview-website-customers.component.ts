// @ts-ignore
import {Component, OnInit, OnDestroy, ViewChild, ViewEncapsulation} from '@angular/core';
import {Subject} from 'rxjs';
import { DatatableComponent} from '@swimlane/ngx-datatable';
import {CoreConfigService} from '@core/services/config.service';
import {MatDialog} from '@angular/material/dialog';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {PreviewWebsiteCustomersService} from "./preview-website-customers.service";
import {CoreTranslationService} from '../../../../../@core/services/translation.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-preview-website-customers',
    templateUrl: './preview-website-customers.component.html',
    styleUrls: ['./preview-website-customers.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PreviewWebsiteCustomersComponent implements OnInit, OnDestroy {
    // public
    token: any;
    id: any;
    columns: any;
    closeResult = '';
    requestsData: any;
    requestImg: any;
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
     * @param {AccountsListService} _invoiceListService
     * @param dialog
     * @param modalService
     * @param {CoreConfigService} _coreConfigService
     * @param {CoreTranslationService} _coreTranslationService
     */
    // tslint:disable-next-line:max-line-length
    constructor(
        private _previewWebsiteCustomersService: PreviewWebsiteCustomersService,
        private _coreConfigService: CoreConfigService,
        private activatedRoute: ActivatedRoute,
        public dialog: MatDialog, private modalService: NgbModal,
        private _formBuilder: FormBuilder,
        private _coreTranslationService: CoreTranslationService,
        public _translateService: TranslateService
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

    openDialog() {
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

    // Lifecycle Hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    ngOnInit(): void {
        this.token = JSON.parse(localStorage.getItem('currentUser')).token;
        this.id = this.activatedRoute.snapshot.paramMap.get('id');
        console.log(this.id);
        this.getUsers();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    getUsers() {
        this._previewWebsiteCustomersService.eachUser(this.token, this.id).subscribe(
            data => {
                console.log(data['data'])
                this.requestsData = data['data']

            },
            error => {
                console.log(error);

            }
        );

    }
    open(content, img) {
        console.log(img);
        const modalRef = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
        this.requestImg= img
        modalRef.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }
}
