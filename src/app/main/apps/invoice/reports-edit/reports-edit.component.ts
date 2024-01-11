import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';

import {CoreSidebarService} from '@core/components/core-sidebar/core-sidebar.service';

import {repeaterAnimation} from 'app/main/apps/invoice/invoice.animation';
import {ReportsEditService} from 'app/main/apps/invoice/reports-edit/reports-edit.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ColumnMode, DatatableComponent} from '@swimlane/ngx-datatable';

@Component({
    selector: 'app-reports-edit',
    templateUrl: './reports-edit.component.html',
    styleUrls: ['./reports-edit.component.scss'],
    animations: [repeaterAnimation],
    encapsulation: ViewEncapsulation.None
})
export class ReportsEditComponent implements OnInit, OnDestroy {
    // Public
    items: any;
    depositsItems: any;
    categoryId: any;
    depositsCategoryId: any = null;
    categories: any;
    accountId: any = null;
    itemId: any;
    accountsId: any;
    depositsItemsId: any;
    profileData: any;
    depositsCategories: any;
    token: any;
    id: any;
    accounts: any;
    searchData: any;
    fromDate: any = null;
    toDate: any = null;
    type: any = null;
    expensesItemId: any = null;
    expensesCategoryId: any = null;
    depositsItemId: any = null;
    reportData: any;
    public selectedOption = 10;
    public ColumnMode = ColumnMode;
    public importForm: FormGroup;
    public url = this.router.url;
    public urlLastValue;
    public apiData;
    public sidebarToggleRef = false;
    public paymentSidebarToggle = false;
    public selectType: any = [
        {name: 'withdraw', value: '0'},
        {name: 'deposit', value: '1'},
    ];


    /**
     * Constructor
     *
     * @param {Router} router
     * @param {ReportsEditService} _ReportsEditService
     * @param {CoreSidebarService} _coreSidebarService
     */
    constructor(
        private router: Router,
        private _reportsEditService: ReportsEditService,
        private _formBuilder: FormBuilder,
        private _coreSidebarService: CoreSidebarService
    ) {
        this.urlLastValue = this.url.substr(this.url.lastIndexOf('/') + 1);
    }

    // Public Methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Add Item
     */
    /**
     * DeleteItem
     *
     * @param id
     */
    deleteItem(id) {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items.indexOf(this.items[i]) === id) {
                this.items.splice(i, 1);
                break;
            }
        }
    }

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
        this.getCategories();
        this.getDepositsCategories();
        this.getAccounts();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
    }

    selectedItem(value) {
        console.log(value);
        this.itemId = value.id;
    }

    selectedAccounts(value) {
        console.log(value);
        this.accountsId = value.id;
    }

    getCategories() {
        this._reportsEditService.categories(this.token).subscribe(
            data => {
                this.categories = data['data'];
            },
            error => {
                console.log(error);

            }
        );

    }

    getItems(event) {
        this.categoryId = event.id;
        console.log(event);
        this._reportsEditService.items(this.token, event.id).subscribe(
            data => {
                this.items = data['data'];
                console.log(data);
            },
            error => {
                console.log(error);

            }
        );

    }

    getDepositsCategories() {
        this._reportsEditService.depositsCategories(this.token).subscribe(
            data => {
                this.depositsCategories = data['data'];
            },
            error => {
                console.log(error);

            }
        );

    }

    getDepositsItems(event) {
        this.depositsCategoryId = event.id;
        console.log(event);
        this._reportsEditService.depositsItems(this.token, event.id).subscribe(
            data => {
                this.depositsItems = data['items'];
                console.log(data['items']);
            },
            error => {
                console.log(error);

            }
        );

    }

    selectedDepositsItems(value) {
        console.log(value);
        this.depositsItemsId = value.id;
    }

    getAccounts() {
        this._reportsEditService.accounts(this.token).subscribe(
            data => {
                this.accounts = data['data'];
                console.log(this.accounts);
            },
            error => {
                console.log(error);
            }
        );
    }

    setAccountsId(value): any {
        this.accountId = value.id
        // this.search();
    }

    setType(value) {
        this.type = value.value
        // this.search();
    }

    setFromDate(value) {
        const date = value.year + '-' + value.month + '-' + value.day;
        this.fromDate = date;
        // this.search();
    }

    setToDate(value) {
        const date = value.year + '-' + value.month + '-' + value.day;
        this.toDate = date;
        // this.search();
    }

    setExpensesItemId(value) {
        let itemsId = [];
        value.forEach(item => {
            itemsId.push(item.id);
        });
        this.expensesItemId = itemsId;
        // this.search();
    }

    setExpensesCategoryId(value) {
        this.expensesCategoryId = value.id;
        // this.search();
    }

    setDepositsCategoryId(value) {
        // this.search();
    }

    setDepositsItemId(value) {
        let itemsId = [];
        value.forEach(item => {
            itemsId.push(item.id);
        });
        this.depositsItemId = itemsId;
        // this.search();
    }

    handelSearch() {
        console.log(this.expensesItemId)
        const formData: FormData = new FormData();
        formData.append('account_id', this.accountId);
        formData.append('type', this.type);
        formData.append('from', this.fromDate);
        formData.append('to', this.toDate);
        formData.append('expenses_item_id ', JSON.stringify(this.expensesItemId));
        formData.append('expenses_category_id ', this.expensesCategoryId);
        formData.append('deposits_category_id ', this.depositsCategoryId);
        formData.append('deposits_item_id ', this.depositsItemId);
        return formData;
    }

    // search() {
    //     const object = {};
    //     for (var pair of this.handelSearch().entries()) {
    //         console.log(pair)
    //         object[pair[0]] = pair[1];
    //     }
    //     this._reportsEditService.search(this.handelSearch(), this.token).subscribe(
    //         data => {
    //             this.reportData = data['data']
    //             localStorage.setItem('reportsData', JSON.stringify(this.reportData))
    //             localStorage.setItem('searchData', JSON.stringify(object))
    //             console.log(this.reportData)
    //         },
    //         error => {
    //             console.log(error);
    //
    //         }
    //     );
    //
    // }

}
