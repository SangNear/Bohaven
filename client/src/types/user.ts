export interface User {
    _id: string
    username: string
    email: string
    displayName: string
    role?: string
    avatar?: string
    phone? : string
    address?: string
    createdAt?: string
    updatedAt?: string
}