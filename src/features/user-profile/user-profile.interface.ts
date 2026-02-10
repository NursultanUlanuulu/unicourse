export interface UserProfile {
    age: number
    dateRegister: Date
    email: string
    endDate: Date
    image: string
    name: string
    phoneNumber: string
    schoolName: string
    startDate: Date
    surname: string
    userId: number
    access: number
}

export interface NewUserProfile {
    image: File | string
    name: string
    age: number
    schoolId: number | null
    phoneNumber: string
}

export interface SchoolState {
    id: number, name: string, district: string
}