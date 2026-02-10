export interface SignIn {
    email: string;
    password: string;
}

export interface SignUp {
    schoolId: number;
    fullName: string
    age: number
    email: string
    passwordOne: string
    passwordTwo: string
}

export interface AuthResponse {
    id: string
    role: 'ADMIN' | 'USER'
    token: string
    username: string
}