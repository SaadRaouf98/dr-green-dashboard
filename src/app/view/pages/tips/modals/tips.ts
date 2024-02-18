export interface Departments {
  data: DepartmentsData[]
}

export interface DepartmentsData {
  id: number
  nameEn: string
  nameAr: string
}

export interface Tips {
  totalItems: number
  data: TipsData[]
}

export interface TipsData {
  titleAr: string
  titleEn: string
  authorAr: string
  authorEn: string
  descriptionAr: string
  descriptionEn: string
  contentAr: string
  contentEn: string
  url: string
  tipsDepartmentNameEn: string
  tipsDepartmentNameAr: string
  visibleStatus: number
  status: number
  datePublished: string
  id: number
}
export interface TipById {
  statusCode: number
  totalItems: number
  success: boolean
  message: any
  data: TipByIdData
}

export interface TipByIdData {
  titleAr: string
  titleEn: string
  authorAr: string
  authorEn: string
  descriptionAr: string
  descriptionEn: string
  contentAr: string
  contentEn: string
  url: string
  tipsDepartmentNameEn: string
  tipsDepartmentNameAr: string
  visibleStatus: number
  tipsDepartmentId: number
  status: number
  datePublished: string
  id: number
}
