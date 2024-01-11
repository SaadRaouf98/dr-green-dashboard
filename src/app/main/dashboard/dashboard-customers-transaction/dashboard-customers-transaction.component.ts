import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { CoreConfigService } from '@core/services/config.service';
import { CoreTranslationService } from '@core/services/translation.service';

import { User } from 'app/auth/models';
import { colors } from 'app/colors.const';
import { AuthenticationService } from 'app/auth/service';
import { DashboardService } from 'app/main/dashboard/dashboard.service';

import { locale as english } from 'app/main/dashboard/i18n/en';
import { locale as french } from 'app/main/dashboard/i18n/fr';
import { locale as german } from 'app/main/dashboard/i18n/de';
import { locale as portuguese } from 'app/main/dashboard/i18n/pt';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard-customers-transaction',
  templateUrl: './dashboard-customers-transaction.component.html',
  styleUrls: ['./dashboard-customers-transaction.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardCustomersTransactionComponent implements OnInit {
  // Decorator
  @ViewChild('statisticsBarChartRef') statisticsBarChartRef: any;
  @ViewChild('statisticsLineChartRef') statisticsLineChartRef: any;
  @ViewChild('earningChartRef') earningChartRef: any;
  @ViewChild('revenueReportChartRef') revenueReportChartRef: any;
  @ViewChild('budgetChartRef') budgetChartRef: any;
  @ViewChild('statePrimaryChartRef') statePrimaryChartRef: any;
  @ViewChild('stateWarningChartRef') stateWarningChartRef: any;
  @ViewChild('stateSecondaryChartRef') stateSecondaryChartRef: any;
  @ViewChild('stateInfoChartRef') stateInfoChartRef: any;
  @ViewChild('stateDangerChartRef') stateDangerChartRef: any;
  @ViewChild('goalChartRef') goalChartRef: any;

  // Public
  token: any;
  content: any;
  id: any;
  public addForm: FormGroup;
  public editForm: FormGroup;
  columns: any;
  rowsUsers: any;
  closeResult = '';
  public selectedOption = 10;
  public data: any;
  public searchValue = '';
  public currentUser: User;
  public isAdmin: boolean;
  public isClient: boolean;
  public statisticsBar;
  public statisticsLine;
  public revenueReportChartoptions;
  public budgetChartoptions;
  public goalChartoptions;
  public statePrimaryChartoptions;
  public stateWarningChartoptions;
  public stateSecondaryChartoptions;
  public stateInfoChartoptions;
  public stateDangerChartoptions;
  public earningChartoptions;
  public isMenuToggled = false;

  // Private
  private $barColor = '#f3f3f3';
  private $trackBgColor = '#EBEBEB';
  private $textMutedColor = '#b9b9c3';
  private $budgetStrokeColor2 = '#dcdae3';
  private $goalStrokeColor2 = '#51e5a8';
  private $textHeadingColor = '#5e5873';
  private $strokeColor = '#ebe9f1';
  private $earningsStrokeColor2 = '#28c76f66';
  private $earningsStrokeColor3 = '#28c76f33';

  /**
   * Constructor
   * @param {AuthenticationService} _authenticationService
   * @param {DashboardService} _dashboardService
   * @param {CoreConfigService} _coreConfigService
   * @param {CoreTranslationService} _coreTranslationService
   */
  constructor(
    private _authenticationService: AuthenticationService,
    private _dashboardService: DashboardService,
    private _coreConfigService: CoreConfigService,
    private _coreTranslationService: CoreTranslationService,
    private _formBuilder: FormBuilder,
    private modalService: NgbModal,
  ) {
    this._authenticationService.currentUser.subscribe(x => (this.currentUser = x));
    this.isAdmin = this._authenticationService.isAdmin;
    this.isClient = this._authenticationService.isClient;

    this._coreTranslationService.translate(english, french, german, portuguese);

  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // get the currentUser details from localStorage
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // Get the dashboard service data
    this._dashboardService.onApiDataChanged.subscribe(response => {
      this.data = response;
    });
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
  open(content, id) {
    console.log(id);
    const modalRef = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.id = id;
    modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  /**
   * After View Init
   */
  ngAfterViewInit() {
    // Subscribe to core config changes
    this._coreConfigService.getConfig().subscribe(config => {
      // If Menu Collapsed Changes
      if (
        (config.layout.menu.collapsed === true || config.layout.menu.collapsed === false) &&
        localStorage.getItem('currentUser')
      ) {
      }
    });
  }
}
