export interface Employees {
  statusCode: number
  totalItems: number
  success: boolean
  message: any
  data: EmployeesData[]
}

export interface EmployeesData {
  employeeStatus: number
  positionName: string
  name: string
  phoneNumber: string
  id: number
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
export interface Departments {
  statusCode: number
  totalItems: number
  success: boolean
  message: any
  data: DepartmentsData[]
}

export interface DepartmentsData {
  id: number
  name: string
  positions: Position[]
}

export interface Position {
  id: number
  name: string
}
