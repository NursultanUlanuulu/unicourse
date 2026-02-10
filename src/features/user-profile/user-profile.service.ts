import {defineStore} from 'pinia';
import axiosInstance from "../../process/auth/auth.interceptor.ts";
import type {NewUserProfile, UserProfile, SchoolState} from "./user-profile.interface.ts";
import {TokenService} from "../../utils/token.service.ts";
import emitter from "../../utils/eventBus.js";

export const useUserProfileStore = defineStore('userProfile', {
    state: (): {
        userProfile: UserProfile | null,
        schoolsList: SchoolState[],
        loading: boolean,
        error: string | null
    } => ({
        userProfile: null,
        schoolsList: [],
        loading: false,
        error: null
    }),

    actions: {
        async fetchProfile() {
            await this.fetchSchool()
            await this.fetchUserProfile()
        },

        async fetchUserProfile() {
            this.loading = true;
            this.error = null;

            try {
                const userId = TokenService.getIdToken()
                const response = await axiosInstance.get(`/api/users/${userId}/profile`);
                this.userProfile = response.data;
            } catch (err) {
                this.error = 'Failed to load user profile.';
            } finally {
                this.loading = false;
            }
        },

        async updateUserProfile(newUserProfile: NewUserProfile, userId: number) {
            try {
                newUserProfile.image = String(await this.uploadService(newUserProfile.image))

                const response = await axiosInstance.put(`/api/users/update/by/${userId}`, newUserProfile);
                if (response.status === 200) {
                    emitter.emit('show-toast',{message: 'Данные успешно обновлены', type: 'success'});
                }
            } catch (err) {
                emitter.emit('show-toast',{message: 'Ошибка при изменении данных', type: 'error'});
                this.error = 'Failed to update user profile.';
            }
        },

        async fetchSchool() {
            try {
                const response = await axiosInstance.get("/schools");
                this.schoolsList = response.data;
            } catch (err) {
                this.error = 'Failed to fetch school.';
            }
        },

        async uploadService(image: File | string) {
            try {
                if (image instanceof File) {
                    const {data} = await axiosInstance.post('/s3/upload',
                        {file: image},
                        {
                            headers: {"Content-Type": "multipart/form-data"}
                        });
                    return data;
                }
                return image
            } catch (err) {
                return 'error'
            }
        }
    },
});
