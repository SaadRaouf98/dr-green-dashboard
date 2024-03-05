export interface RecommendedMeals {
  statusCode: number
  totalItems: number
  success: boolean
  message: any
  data: RecommendedMealData[]
}

export interface RecommendedMealData {
  id: number
  name: string
  description: any
  calories: number
  path: string
  type: number
}
export interface EachRecommendedMeal {
  statusCode: number
  totalItems: number
  success: boolean
  message: any
  data: EachRecommendedMealData
}

export interface EachRecommendedMealData {
  id: number
  nameEn: string
  nameAr: string
  descriptionEn: string
  descriptionAr: string
  calories: number
  path: string
  type: number
  file: any
}
