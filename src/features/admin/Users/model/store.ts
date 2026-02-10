import {defineStore} from "pinia";
import {api} from "../api.ts";
import type {UserRes} from "../type.ts";
import emitter from "../../../../utils/eventBus.js";

export const useUsersStore = defineStore("users", {
    state: (): {
        users: UserRes[],
    } => ({
        users: [],
    }),
    actions: {
        async fetchUsers() {
            try {
                const response = await api.getUsers();
                this.users = response.data;
            } catch (error) {
                console.error(error);
            }
        },

        async getUserById(userId: number) {
            try {
                const response = await api.getUserById(userId);
                return response.data;
            } catch (error) {
                console.error(error);
            }
        },

        async deleteUser(userId: number) {
            try {
                await api.deleteUser(userId);
                this.users = this.users.filter(user => user.id !== userId);
                emitter.emit('show-toast', {message: 'Пользователь успешно удален', type: 'success'})
            } catch (error) {
                console.error(error);
                emitter.emit('show-toast', {message: 'Произошла ошибка с сервером', type: 'error'})
            }
        },

        async updateAccess(userId: number, available: boolean) {
            try {
                let response;
                console.log(available)
                if (available === null) {
                    response = await api.createAccess(userId, true)
                } else {
                    response = await api.updateAccess(userId, !available)
                }
                if (response.status === 200) {
                    return true
                }
                emitter.emit('show-toast', {message: 'Успех', type: 'success'})
            } catch (error) {
                console.error(error)
                emitter.emit('show-toast', {message: 'Произошла ошибка с сервером', type: 'error'})
            }
        }
    }
});