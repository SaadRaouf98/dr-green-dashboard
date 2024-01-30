import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-ads',
  templateUrl: './add-ads.component.html',
  styleUrls: ['./add-ads.component.scss']
})
export class AddAdsComponent {
  addFrom: FormGroup
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

  constructor(
    private _formBuilder: FormBuilder,
  ) {
    this.addFrom = _formBuilder.group({
      Id: ['', Validators.required],
      TitleAr: ['', Validators.required],
      TitleEn: ['', Validators.required],
      Status: ['', Validators.required],
      DisplayPage: ['', Validators.required],
      DatePublished: ['', Validators.required],
      DateEnd: ['', Validators.required],
    })
  }

  onFileChanged(event) {
    const file = event.target.files[0]
  }
  submit() {
    console.log(this.addFrom.value)
  }
}
