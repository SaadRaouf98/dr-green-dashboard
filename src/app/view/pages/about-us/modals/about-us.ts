export interface AllLookups {
  message: string
  totalItems: number
  data: AllLookupsData[]
}

export interface AllLookupsData {
  content: string
  headlin: string
  id: number
  type: number
  url: string
}

export interface EachLookup {
  data: EachLookupData
}

export interface EachLookupData {
  id: number
  headlinEr: string
  headlinAr: string
  contentEn: string
  contentar: string
  type: number
  file: any
  url: any
}
