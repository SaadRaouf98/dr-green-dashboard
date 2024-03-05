export interface TrainingVideo {
  statusCode: number
  totalItems: number
  success: boolean
  message: any
  data: TrainingVideoData[]
}

export interface TrainingVideoData {
  id: number
  title: string
  description: string
  path: string
  type: number
}
export interface EachTrainingVideo {
  statusCode: number
  totalItems: number
  success: boolean
  message: any
  data: EachTrainingVideoData
}

export interface EachTrainingVideoData {
  id: number
  titleEn: string
  titleAr: string
  descriptionEn: string
  descriptionAr: string
  path: string
  type: number
}
