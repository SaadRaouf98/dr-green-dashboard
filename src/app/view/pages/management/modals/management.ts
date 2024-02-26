export interface Departments {
  statusCode: number
  totalItems: number
  success: boolean
  message: any
  data: AllDepartmentData[]
}

export interface AllDepartmentData {
  id: number
  name: string
  isActive: boolean
  positions: Position[]
}

export interface Position {
  id: number
  name?: string
  isActive: boolean
  departmentId: number
}
