import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';

import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {CoreSidebarService} from '@core/components/core-sidebar/core-sidebar.service';

import {ReportsPreviewService} from 'app/main/apps/invoice/reports-preview/reports-preview.service';
import {ReportsEditService} from "../reports-edit/reports-edit.service";

@Component({
    selector: 'app-reports-preview',
    templateUrl: './reports-preview.component.html',
    styleUrls: ['./reports-preview.service.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ReportsPreviewComponent implements OnInit, OnDestroy {
    // public
    reportData: any;
    accountId: any;
    date: any;
    token: any;
    dateFrom: any;
    dateTo: any;
    accounts: any;
    balanceSheet: any;
    show: any = false;
    showParent: any = false;
    searchData: any;
    toppingList: string[] = ['Categories', 'Items', 'Details', 'Balance', 'Date'];
    selectedRows: any = [];
    public apiData;
    public selectType: any = [
        {name: 'This Month', value: 'this_month'},
        {name: 'Last Month', value: 'last_month'},
        {name: 'This Quarter', value: 'this_quarter'},
        {name: 'Last Quarter', value: 'last_quarter'},
        {name: 'This Year', value: 'this_year'},
        {name: 'Last Year', value: 'last_year'},
        {name: 'Custom', value: 'custom'},
    ];
    public selectExtra: any = [
        {name: 'Ex1', value: '1'},
        {name: 'Ex1', value: '2'},

    ];
    public urlLastValue;
    public url = this.router.url;
    public sidebarToggleRef = false;
    public paymentSidebarToggle = false;
    public paymentDetails = {
        totalDue: '$12,110.55',
        bankName: 'American Bank',
        country: 'United States',
        iban: 'ETD95476213874685',
        swiftCode: 'BR91905'
    };

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
        private _reportsPreviewService: ReportsEditService,
        private _coreSidebarService: CoreSidebarService
    ) {
        this._unsubscribeAll = new Subject();
        this.urlLastValue = this.url.substr(this.url.lastIndexOf('/') + 1);
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
        this.reportData = JSON.parse(localStorage.getItem('reportsData'))
        this.searchData = JSON.parse(localStorage.getItem('searchData'))
        console.log(this.reportData)
        console.log(this.searchData)
        this.getAccounts()
        this.getBalanceSheetData()
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    setSelectedRows(event) {
        this.selectedRows = event.value
        console.log(this.selectedRows)
    }

    selectDate(event) {
        console.log(event.value)
        if (event.name == 'Custom') {
            this.show = true;
            this.date = event.value
        } else {
            this.date = event.value
            console.log(this.date)
        }
        this.getBalanceSheetData()
    }

    selectAccount(event) {
        console.log(event.id)
        this.accountId = event.id
        this.getBalanceSheetData()
    }

    selectedExtra(event) {
        if (event.value == '1')
            this.showParent = false;
        if (event.value == '2')
            this.showParent = true;
    }

    setFromDate(value) {
        const date = value.year + '-' + value.month + '-' + value.day;
        console.log(date)
        this.dateFrom = date

    }

    setToDate(value) {
        const date = value.year + '-' + value.month + '-' + value.day;
        console.log(date)
        this.dateTo = date

    }

    submit() {
        this.getBalanceSheetData()
        this.show = false;
    }

    close() {
        this.show = false;
    }

    getAccounts() {
        this._reportsPreviewService.accounts(this.token).subscribe(
            data => {
                this.accounts = data['data'];
                console.log(this.accounts);
            },
            error => {
                console.log(error);
            }
        );
    }

    getBalanceSheetData() {
        const object = {}
        if (this.date !== 'undefined'){
            object['date'] = this.date
        }
        if (this.dateFrom !== 'undefined'){
            object['from'] = this.dateFrom
        }
        if (this.dateTo !== 'undefined'){
            object['to'] = this.dateTo
        }
        if (this.accountId !== 'undefined'){
            object['account_id'] = this.accountId
        }
        console.log(object)
        this._reportsPreviewService.balanceSheet(this.token, object).subscribe(
            data => {
                this.balanceSheet = data['data'];
                console.log(this.balanceSheet);
            },
            error => {
                console.log(error);
            }
        );
    }

}
