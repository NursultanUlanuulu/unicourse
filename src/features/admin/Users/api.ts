import axiosInstance from "../../../process/auth/auth.interceptor.ts"

export const api = {
    getUsers: async () => {
        return axiosInstance.get("/api/users/find/all/user")
    },
    getUserById: async (userId: number) => {
        return axiosInstance.get(`/api/users/${userId}/profile`)
    },
    deleteUser: async (userId: number) => {
        return axiosInstance.delete(`/api/users/delete/by/${userId}`)
    },
    createAccess: async (userId: number, available: boolean) => {
      return axiosInstance.post(`/api/users/accessToTest?userId=${userId}&available=${available}`)
    },
    updateAccess: async (userId: number,available: boolean) => {
        return axiosInstance.put(`/api/users/updateAccess?userId=${userId}&available=${available}`)
    }
}