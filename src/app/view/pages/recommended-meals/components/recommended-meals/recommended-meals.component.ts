import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {environment as env} from "../../../../../../environments/environment";
import {RecommendedMealsService} from "../../services/recommended-meals.service";
import {
  EachRecommendedMeal,
  RecommendedMealData,
  RecommendedMeals
} from "../../modals/recommended-meals";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SharedService} from "../../../../../core/shared/sahred-service/shared.service";

@Component({
  selector: 'app-recommended-meals',
  templateUrl: './recommended-meals.component.html',
  styleUrls: ['./recommended-meals.component.scss']
})

export class RecommendedMealsComponent implements OnInit {
  @ViewChild('FileInput') FileInput: any;
  domain = env.domainUrl
  addFrom: FormGroup;
  adsList: any;
  modalStatus: number;
  valueId: number;
  allRecommendedMealData: RecommendedMealData[];
  Filters = [
    {id: 1, name: 'Today'},
    {id: 2, name: 'Tomorrow'},
    {id: 3, name: 'This Week'},
    {id: 4, name: 'Last Week'},
    {id: 5, name: 'This Month'},
  ]
  public selectedFilter = 1;
  public selectedGroup = 10;
  private modalService = inject(NgbModal)
  closeResult = '';
  files: any[] = []
  images: any[] = []
  isForm: boolean = false
  Groups = [
    {id: 10, name: '10'},
    {id: 20, name: '20'},
    {id: 30, name: '30'},
    {id: 40, name: '40'},
    {id: 50, name: '50'},
  ];
  Meals = [
    {id: 10, name: 'Breakfast'},
    {id: 20, name: 'Lunch'},
    {id: 30, name: 'Dinner'},
  ];

  constructor(
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    public _sharedService: SharedService,
    private _aboutUsService: RecommendedMealsService,
  ) {
    this.addFrom = this._formBuilder.group({
      Id: ['', Validators.required],
      NameEn: ['', Validators.required],
      NameAr: ['', Validators.required],
      DescriptionEn: ['', Validators.required],
      DescriptionAr: ['', Validators.required],
      Calories: ['', Validators.required],
      Type: ['', Validators.required],
      File: ['', Validators.required],
    })
  }

  ngOnInit() {
    this.getAllLookUps()
  }

  getAllLookUps() {
    let query = {
      filterValue: '40',
    }
    this._aboutUsService.getRecommendedMealApi(query).subscribe({
      next: (res: RecommendedMeals) => {
        this.allRecommendedMealData = res['data']
      },
    })
  }

  delete(id: number) {
    this._aboutUsService.deleteApi(id).subscribe({
      next: (res) => {
        this._sharedService.handleResponseMessage('success', 'Delete', 'The Recommended Meal Deleted Successfully')
        this.getAllLookUps()
        this.modalService.dismissAll()
      }
    })
  }

  onFileChanged(event: any) {
    if (event.target.files && event.target.files[0]) {
      let filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        let reader = new FileReader();
        this.files.push(event.target.files.item(i));
        reader.onload = (event: any) => {
          this.images.push({path: event.target.result, completePath: event.target.result});
        };
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  getEachRecommendedMeal(id: number) {
    this._aboutUsService.getRecommendedMealByIdApi(id).subscribe({
      next: (res: EachRecommendedMeal) => {
        console.log(res)
        this.addFrom.patchValue({
          Id: id,
          NameEn: res.data.nameEn,
          NameAr: res.data.nameAr,
          DescriptionEn: res.data.descriptionEn,
          DescriptionAr: res.data.descriptionAr,
          Calories: res.data.calories,
          Type: res.data.type,
        })
        this.removeImage()
        this.images.push({completePath: this.domain + 'MealDrGreenMedia/' + res.data.path, path: res.data.path})
      }
    })
  }

  removeImage() {
    this.files.splice(0, this.files.length)
    this.images.splice(0, this.images.length)
    this.FileInput.nativeElement.value = '';
  }


  submit() {
    this.addFrom.get('File').patchValue(this.files);
    if (this.modalStatus == 0){
      this._aboutUsService.addNewRecommendedApi(this.addFrom.value).subscribe({
        next: (res) => {
          this._sharedService.handleResponseMessage('success', 'All LookUps', 'Values Added Successfully')
          this.getAllLookUps()
          this.modalService.dismissAll()
        },
        error: (err) => {
          console.log(err)
        },
      })
    } else if (this.modalStatus == 1){
      this._aboutUsService.updateRecommendedMealApi(this.addFrom.value, this.valueId).subscribe({
        next: (res) => {
          this.getAllLookUps()
          this.modalService.dismissAll()
        },
        error: (err) => {
          console.log(err)
        },
      })
    }
  }

  resetForm() {
    this.addFrom.reset();
    this.files.splice(0, this.files.length);
    this.images.splice(0, this.images.length);
    this.FileInput.nativeElement.value = '';
  }

  open(content: any, modalStatus: number, id?: number) {
    this.modalService.open(content, {centered: true, size: 'lg', ariaLabelledBy: 'modal-basic-title'})
    modalStatus == 0? this.isForm = true : modalStatus == 1? this.isForm = true : this.isForm = false
    if (modalStatus === 1 || modalStatus === 2) {
      this.getEachRecommendedMeal(id)
    } else {
      this.resetForm()
    }
    this.modalStatus = modalStatus
    this.valueId = id ? id : null
  }
}
