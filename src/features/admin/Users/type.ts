export interface UserRes {
    id: number
    name: string
    email: string
    age: number
    userInfoId: number
    schoolResponse: SchoolReq
    dateRegister: string
    startDate: string
    endDate: string
    access: boolean
}
export interface SchoolReq {
    id: number
    name: string
    district: string
}