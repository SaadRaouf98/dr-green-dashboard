import {Component, OnInit, ViewChild} from '@angular/core';
import {ColumnMode, DatatableComponent} from "@swimlane/ngx-datatable";
import {environment as env} from "../../../../../../../environments/environment";
import {EmployeesService} from "../../services/employees.service";
import {Employees, EmployeesData} from "../../modals/employees";
import {SharedService} from "../../../../../../core/shared/sahred-service/shared.service";

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;
  domain = env.domainUrl
  page = 1;
  modalStatus: any = 10
  protected readonly ColumnMode = ColumnMode;
  rowsUsers: EmployeesData[];
  collectionSize: any;
  filters: any;
  public selectedOption = 10;
  selected: any = []
  cards: any
  Filters = [
    {id: 1, name: 'Today'},
    {id: 2, name: 'Tomorrow'},
    {id: 3, name: 'This Week'},
    {id: 4, name: 'Last Week'},
    {id: 5, name: 'This Month'},
  ]
  Groups = [
    {id: 10, name: '10'},
    {id: 20, name: '20'},
    {id: 30, name: '30'},
    {id: 40, name: '40'},
    {id: 50, name: '50'},
  ]
  public selectedFilter = 1;
  public selectedGroup = 10;
  closeResult = '';

  constructor(
    private _employeesService: EmployeesService,
    private _sharedService: SharedService,
  ) {}
  ngOnInit() {
    this.getEmployees(1)
  }



  getEmployees(pageNumber?: any) {
    this.page = pageNumber
    let query = {
      pageNumber: pageNumber,
      pageSize: 10,
    }
    this._employeesService.getEmployeesApi(query).subscribe({
      next: (res: Employees) => {
        this.rowsUsers = res.data
        this.collectionSize = res.totalItems
      }
    })
  }

  deleteEmployees(id: number) {
    this._employeesService.deleteEmployeesApi(id).subscribe({
      next: res => {
        this.getEmployees(this.page)
        this._sharedService.handleResponseMessage('success', 'Delete', 'Employee Deleted Successfully')
      }
    })
  }
}
