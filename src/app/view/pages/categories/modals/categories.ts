export interface Categories {
  statusCode: number
  totalItems: number
  success: boolean
  message: any
  data: CategoriesData[]
}

export interface CategoriesData {
  id: number
  nameAr: string
  description: string
  categoryStatus: number
  categoryParentId?: number
  datePublished?: string
  categoryImages: string[]
}
export interface CategoriesList {
  data: CategoriesListData[]
}

export interface CategoriesListData {
  nameAr: string
  nameEn: string
  id: number
}
