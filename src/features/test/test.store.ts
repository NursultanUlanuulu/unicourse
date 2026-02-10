import {defineStore} from "pinia";
import axiosInstance from "../../process/auth/auth.interceptor.ts";

import type {QuestionState, ResultState} from "./test.interface.ts";

export const useTestStore = defineStore('testStore', {
    state: () => ({
        testData: [] as QuestionState[],
        resultTestData: null as ResultState | null,
    }),

    actions: {
        async fetchTestData(limit: number, subjectId: string) {
            try {
                const response = await axiosInstance.post(`/api/question/random/questions/${subjectId}/${limit}`, null)
                this.testData = response.data
            } catch (error) {
                console.error("Error in sendEmail:");
            }
        },

        async setAnswer(questionId: number, optionId: number | null | undefined, testId: number) {
            try {
                const response = await axiosInstance.post(`/api/options/answer/${questionId}/${optionId}/${testId}`)
                console.log(response);
            } catch (error) {
                console.error("Error in sendEmail:", error);
            }
        },

        async fetchResult(testId: number) {
            try {
                const response = await axiosInstance.get(`/api/question/result/${testId}`);
                this.resultTestData = response.data;
                console.log(response);
            } catch (error) {
                console.log(error)
            }
        }
    }
})