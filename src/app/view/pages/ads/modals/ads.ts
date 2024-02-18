export interface Ads {
  totalItems: number
  data: AdsData[]
}

export interface AdsData {
  id: number
  titleAr: string
  titleEn: string
  status: number
  displayPage: number
  endDate: string
  datePublished: string
  adsImages: string[]
}
export interface AdsList {
  data: AdsListData
}

export interface AdsListData {
  id: number
  titleAr: string
  titleEn: string
  status: number
  displayPage: number
  endDate: string
  datePublished: string
  adsImages: string[]
}
