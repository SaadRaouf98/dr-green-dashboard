export interface LoginModal {
  token: string;
  user: userModal
}
export interface userModal {
  createdDate: string
  lastEditDate: string
  lastLogin: string
  name: string
  email: string
  phoneNumber: string
  id: number
  roles: string[]
  userType: string
}
