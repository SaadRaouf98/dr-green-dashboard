import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {environment as env} from "../../../../../../environments/environment";
import {ReviewsService} from "../../services/reviews.service";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ErrorInterface} from "../../../../../core/interceptor/error.interface";
import {SharedService} from "../../../../../core/shared/sahred-service/shared.service";
import {EachReview, Reviews, ReviewsData} from "../../modals/reviews";

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})

export class ReviewsComponent implements OnInit {
  @ViewChild('ImageInput') ImageInput: any;
  @ViewChild('VideoInput') VideoInput: any;
  domain = env.domainUrl
  addFrom: FormGroup;
  adsList: any;
  modalStatus: number;
  valueId: number;
  allLookupsData: ReviewsData[];
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
  imageFiles: any[] = []
  images: any[] = []
  videoFiles: any[] = []
  videos: any[] = []
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
    private _reviewsService: ReviewsService,
  ) {
    this.addFrom = this._formBuilder.group({
      Id: ['', Validators.required],
      TitleEn: ['', Validators.required],
      TitleAr: ['', Validators.required],
      NameEn: ['', Validators.required],
      NameAr: ['', Validators.required],
      JopTitleEn: ['', Validators.required],
      JopTitleAr: ['', Validators.required],
      ReviewEn: ['', Validators.required],
      ReviewAr: ['', Validators.required],
      Image: ['', Validators.required],
      Video: ['', Validators.required],
    })
  }

  ngOnInit() {
    this.getAllReview()
  }

  getAllReview() {
    let query = {

    }
    this._reviewsService.getAllReviews(query).subscribe({
      next: (res: Reviews) => {
        this.allLookupsData = res['data']
      },
      error: (err: ErrorInterface) => {
        this._sharedService.handleError(err)
      }
    })
  }

  delete(id: number) {
    this._reviewsService.deleteApi(id).subscribe({
      next: (res) => {
        this._sharedService.handleResponseMessage('success', 'Delete', 'The Value Deleted Successfully')
        this.getAllReview()
        this.modalService.dismissAll()
      },
      error: (err: ErrorInterface)=> {
        this._sharedService.handleError(err)
      }
    })
  }

  onImgFileChanged(event: any) {
    if (event.target.files && event.target.files[0]) {
      let filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        let reader = new FileReader();
        this.imageFiles.push(event.target.files.item(i));
        reader.onload = (event: any) => {
          this.images.push({path: event.target.result, completePath: event.target.result});
        };
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }
  onVidFileChanged(event: any) {
    if (event.target.files && event.target.files[0]) {
      let filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        let reader = new FileReader();
        this.videoFiles.push(event.target.files.item(i));
        reader.onload = (event: any) => {
          this.videos.push({path: event.target.result, completePath: event.target.result});
        };
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  getLookUpsById(id: number) {
    this._reviewsService.getReviewByIdApi(id).subscribe({
      next: (res: EachReview) => {
        console.log(res)
        this.addFrom.patchValue({
          Id: id,
          TitleEn: res.data.titleEn,
          TitleAr: res.data.titleAr,
          NameEn: res.data.nameEn,
          NameAr: res.data.nameAr,
          JopTitleEn: res.data.jopTitleEn,
          JopTitleAr: res.data.jopTitleAr,
          ReviewEn: res.data.reviewEn,
          ReviewAr: res.data.reviewAr,
        })
        this.removeImage()
        this.removeVideo()
        this.images.push({completePath: this.domain + 'ReviewSectionClientImages/' + res.data.imagePath, path: res.data.imagePath})
        this.videos.push({completePath: this.domain + 'ReviewSectionVideos/' + res.data.videoPath, path: res.data.videoPath})
      }
    })
  }

  removeImage() {
    this.imageFiles.splice(0, this.imageFiles.length)
    this.images.splice(0, this.images.length)
    this.ImageInput.nativeElement.value = '';
  }
  removeVideo() {
    this.videoFiles.splice(0, this.videoFiles.length)
    this.videos.splice(0, this.videos.length)
    this.VideoInput.nativeElement.value = '';
  }


  submit() {
    this.addFrom.get('Image').patchValue(this.imageFiles);
    this.addFrom.get('Video').patchValue(this.videoFiles);
    if (this.modalStatus == 0){
      this._reviewsService.addReviewsApi(this.addFrom.value).subscribe({
        next: (res) => {
          this._sharedService.handleResponseMessage('success', 'Reviews', 'Review has been added successfully')
          this.getAllReview()
          this.modalService.dismissAll()
        },
        error: (err) => {
          console.log(err)
        },
      })
    } else if (this.modalStatus == 1){
      this._reviewsService.updateReviewApi(this.addFrom.value, this.valueId).subscribe({
        next: (res) => {
          this.getAllReview()
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
    this.imageFiles.splice(0, this.imageFiles.length)
    this.images.splice(0, this.images.length)
    this.videoFiles.splice(0, this.videoFiles.length)
    this.videos.splice(0, this.videos.length)
    this.ImageInput.nativeElement.value = '';
    this.VideoInput.nativeElement.value = '';
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
