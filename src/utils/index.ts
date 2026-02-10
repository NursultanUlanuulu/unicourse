import {config} from "../config.ts"

export const imageRedirection = (filePath: string | null | File | undefined) => {
    if (filePath instanceof File) {
        return URL.createObjectURL(filePath)
    } 
    if (filePath) {
        return config.baseUrl + '/s3/image/' + filePath
    }
    return '/assets/image/avatarIcon.png'
}