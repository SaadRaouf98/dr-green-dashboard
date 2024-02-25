export interface Reviews {
  statusCode: number
  totalItems: number
  success: boolean
  message: any
  data: ReviewsData[]
}

export interface ReviewsData {
  id: number
  title: string
  name: string
  jopTitle: string
  review: string
  imagePath: string
  videoPath: string
}


export interface EachReview {
  statusCode: number
  totalItems: number
  success: boolean
  message: any
  data: EachReviewData
}

export interface EachReviewData {
  id: number
  titleEn: string
  titleAr: string
  nameEn: string
  nameAr: string
  jopTitleEn: string
  jopTitleAr: string
  reviewEn: string
  reviewAr: string
  imagePath: string
  videoPath: string
}
