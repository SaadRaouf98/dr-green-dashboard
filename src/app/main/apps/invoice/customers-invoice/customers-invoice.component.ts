import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {CoreSidebarService} from '@core/components/core-sidebar/core-sidebar.service';
import {CustomersInvoiceService} from './customers-invoice.service';
import {ColumnMode, DatatableComponent} from '@swimlane/ngx-datatable';
import {MatDialog} from '@angular/material/dialog';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder} from '@angular/forms';

@Component({
    selector: 'app-customers-invoice',
    templateUrl: './customers-invoice.component.html',
    styleUrls: ['./customers-invoice.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class CustomersInvoiceComponent implements OnInit, OnDestroy {
    // public
    @ViewChild(DatatableComponent) table: DatatableComponent;
    reportData: any;
    orderId: any;
    token: any;
    lang: any;
    id: any;
    time: any;
    time2: any;
    relatedProducts: any;
    eachOrder: any;
    closeResult = '';
    public selectedOption = 10;
    public ColumnMode = ColumnMode;
    public urlLastValue;
    public url = this.router.url;
    public selectType: any = [
        {name: 'All', value: 'all'},
        {name: 'Arabic', value: 'ar'},
        {name: 'English', value: 'en'},
    ];
    // private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {Router} router
     * @param {ReportsPreviewService} _invoicePreviewService
     * @param {CoreSidebarService} _coreSidebarService
     */
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private _formBuilder: FormBuilder,
        private _meetingsReportsService: CustomersInvoiceService,
        public dialog: MatDialog, private modalService: NgbModal,
        private _coreSidebarService: CoreSidebarService
    ) {
        this._unsubscribeAll = new Subject();
        this.urlLastValue = this.url.substr(this.url.lastIndexOf('/') + 1);
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

    // Public Methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle the sidebar
     *
     * @param name
     */
    toggleSidebar(name): void {
        this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
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
        this._meetingsReportsService.eachOrder(this.token, this.orderId).subscribe(
            data => {
                this.eachOrder = data['data'][0];
                console.log(this.eachOrder);
                this.relatedProducts = data['data'][1];
                console.log(this.relatedProducts);
            },
            error => {
                console.log(error);

            }
        );

    }
}
