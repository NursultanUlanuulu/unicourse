import {defineStore} from "pinia";
import axiosInstance from "../../process/auth/auth.interceptor.ts";
import type {ArchiveState, ResultQuestion, TestResult} from "./archive.interface.ts";

export const useArchiveStore = defineStore('archiveStore', {
    state: (): {
        archiveList: ArchiveState[],
        archiveResult: TestResult | null,
        archiveFullList: ResultQuestion[]
    } => ({
        archiveList: [],
        archiveResult: null,
        archiveFullList: []
    }),

    actions: {
        async getArchive(userId: string) {
            try {
                const response = await axiosInstance.get(`/api/users/tests?userId=${userId}`)
                if (response.data) {
                    this.archiveList = response.data
                }
            } catch (err) {
                console.error(err);
            }
        },
        getArchiveResult(testId: string) {
            this.getTestResult(testId)
            this.getTestFullList(testId)
        },

        async getTestResult(testId: string) {
            try {
                const response = await axiosInstance.get(`/api/question/result/${testId}`)
                if (response.data) {
                    this.archiveResult = response.data
                }
            } catch (err) {
                console.error(err);
                throw err
            }
        },

        async getTestFullList(testId: string) {
            try {
                const response = await axiosInstance.get(`/api/question/questions/${testId}`)
                if (response.data) {
                    this.archiveFullList = response.data
                    console.log(response)
                }
            } catch (err) {
                console.error(err);
            }
        }
    }
})