export interface Products {
  statusCode: number
  totalItems: number
  success: boolean
  message: any
  data: ProductsData[]
}

export interface ProductsData {
  id: number
  name: string
  description: string
  status: number
  publishDate: string
  createdDate: string
  price: number
  priceAfterDiscount: number
  code: string
  stockStatus: number
  overAllRating: any
  productImages: string[]
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
