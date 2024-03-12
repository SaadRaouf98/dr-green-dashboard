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

export interface EmployeeDetails {
  nationalId: string
  employeeStatus: number
  militaryStatus: number
  gender: number
  departmentId: number
  positionId: number
  university: string
  degree: string
  graduationDate: string
  hireDate: string
  dateOfBirth: string
  address: string
  id: number
  email: string
  phoneNumber: string
  lastLogin: any
  userType: number
  name: string
  password: any
  addresses: any[]
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
export interface AllPositions {
  statusCode: number
  totalItems: number
  success: boolean
  message: any
  data: Position[]
}
