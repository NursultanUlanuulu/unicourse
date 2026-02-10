import axiosInstance from "../../../process/auth/auth.interceptor.ts"
import type { SchoolReq } from "../Users/type.ts"

export const api = {
    getSchools: async () => {
        return axiosInstance.get("/schools")
    },
    deleteSchool: async (schoolId: number) => {
        return axiosInstance.delete(`/schools/${schoolId}`)
    },
    UsersBySchoolId: async (schoolId: number) => {
        return axiosInstance.get(`/api/users/bySchoolId?schoolId=${schoolId}`)
    },
    postSchool: async (school: SchoolReq) => {
        return axiosInstance.post("/schools", school)
    },
    putSchool: (data: SchoolReq) => {
        return axiosInstance.put(`/schools/${data.id}`, {
          name: data.name,
          district: data.district,
        })
    },
}