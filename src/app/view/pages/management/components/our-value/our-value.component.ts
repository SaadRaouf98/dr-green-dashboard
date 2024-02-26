import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {environment as env} from "../../../../../../environments/environment";
import {ManagementService} from "../../services/management.service";
import {AllLookups, AllLookupsData, EachLookup} from "../../modals/management";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ErrorInterface} from "../../../../../core/interceptor/error.interface";
import {SharedService} from "../../../../../core/shared/sahred-service/shared.service";

@Component({
  selector: 'app-our-value',
  templateUrl: './our-value.component.html',
  styleUrls: ['./our-value.component.scss']
})

export class OurValueComponent implements OnInit {
  @ViewChild('FileInput') FileInput: any;
  domain = env.domainUrl
  addFrom: FormGroup;
  adsList: any;
  modalStatus: number;
  valueId: number;
  allLookupsData: AllLookupsData[];
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

  constructor(
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    public _sharedService: SharedService,
    private _aboutUsService: ManagementService,
  ) {
    this.addFrom = this._formBuilder.group({
      Id: ['', Validators.required],
      HeadlinEr: ['', Validators.required],
      HeadlinAr: ['', Validators.required],
      ContentEn: ['', Validators.required],
      Contentar: ['', Validators.required],
      Type: ['40', Validators.required],
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
    this._aboutUsService.getLookUpsApi(query).subscribe({
      next: (res: AllLookups) => {
        this.allLookupsData = res['data']
      },
      error: (err: ErrorInterface) => {
        this._sharedService.handleError(err)
      }
    })
  }

  delete(id: number) {
    this._aboutUsService.deleteApi(id).subscribe({
      next: (res) => {
        this._sharedService.handleResponseMessage('success', 'Delete', 'The Value Deleted Successfully')
        this.getAllLookUps()
        this.modalService.dismissAll()
      },
      error: (err: ErrorInterface)=> {
        this._sharedService.handleError(err)
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

  getLookUpsById(id: number) {
    this._aboutUsService.getLookUpsByIdApi(id).subscribe({
      next: (res: EachLookup) => {
        console.log(res)
        this.addFrom.patchValue({
          Id: id,
          HeadlinEr: res.data.headlinEr,
          HeadlinAr: res.data.headlinAr,
          ContentEn: res.data.contentEn,
          Contentar: res.data.contentar,
          Type: 10,
        })
        this.removeImage()
        this.images.push({completePath: this.domain + 'LookUpsImages/' + res.data.url, path: res.data.url})
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
      this._aboutUsService.addLookUpsApi(this.addFrom.value).subscribe({
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
      this._aboutUsService.updateLookUpsApi(this.addFrom.value, this.valueId).subscribe({
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
    this.addFrom.reset()
    this.files.splice(0, this.files.length)
    this.images.splice(0, this.images.length)
    this.FileInput.nativeElement.value = '';
    this.addFrom.get('Type').patchValue('40')
  }

  open(content: any, modalStatus: number, id?: number) {
    this.modalService.open(content, {centered: true, size: 'lg', ariaLabelledBy: 'modal-basic-title'})
    modalStatus == 0? this.isForm = true : modalStatus == 1? this.isForm = true : this.isForm = false
    if (modalStatus === 1 || modalStatus === 2) {
      this.getLookUpsById(id)
    } else {
      this.resetForm()
    }
    this.modalStatus = modalStatus
    this.valueId = id ? id : null
  }
}
