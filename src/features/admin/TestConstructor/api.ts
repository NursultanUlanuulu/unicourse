import type { QuestionUpdateState, SubjectPostReq, TestFileState } from "./type.ts"
import { notImage, uploadImageAndGetUrl } from "./model/image.service.ts"
import axiosInstance from "../../../process/auth/auth.interceptor.ts"

export const api = {
  createTest: async (question: TestFileState) => {
    if (question.questionImageRequest.image) {
      const questionImageUrl = await uploadImageAndGetUrl(question)
      return axiosInstance.post("api/question/save-with-image", questionImageUrl)
    }
    const questionNoImage = notImage(question)
    return axiosInstance.post("api/question/save", questionNoImage)
  },

  getQuestions: (subjectId: number, page: number) => {
    return axiosInstance.get(
      `api/question/getAllQuestionsBySubject/${subjectId}?page=${page}`,
    )
  },

  getQuestionById: (questionId: number) => {
    return axiosInstance.get(`api/question/find/by/question/${questionId}`)
  },
  deleteQuestion: (questionId: number) => {
    return axiosInstance.delete(`api/question/delete/${questionId}`)
  },
  updateQuestionById: (question: QuestionUpdateState) => {
    return axiosInstance.put("api/question/update/question", question)
  },

  getSubjects: () => {
    return axiosInstance.get("api/subjects/list/of/subjects")
  },
  getSubjectById: (subjectId: number) => {
    return axiosInstance.get(`api/subjects/${subjectId}`)
  },
  addSubject: (data: SubjectPostReq) => {
    return axiosInstance.post("api/subjects/save", data)
  },
  deleteSubject: (subjectId: number) => {
    return axiosInstance.delete(`api/subjects/${subjectId}`)
  },
  editSubject: (subjectId: number, subject: SubjectPostReq) => {
    return axiosInstance.put(`api/subjects/${subjectId}`, subject)
  },

  upload: (file: File) => {
    return axiosInstance.post(
      "s3/upload",
      { file: file },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    )
  },
}
