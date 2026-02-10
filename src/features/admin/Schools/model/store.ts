import { defineStore } from "pinia";
import type { SchoolReq } from "../../Users/type.ts";
import { api } from "../api.ts";
import emitter from "../../../../utils/eventBus.js";

const toastTrigger = (message: string, type: 'success'| 'error') => {
    emitter.emit('show-toast', {message, type})
}

export const useSchoolsStore = defineStore("schools", {
    state: () : {
        schools: SchoolReq[],
    } => ({
        schools: [],
    }),
    actions: {
        async getSchools() {
            try {
                const res = await api.getSchools();
                this.schools = res.data;
            } catch (error) {
                console.error(error);
            }
        },

        async postSchool(school: SchoolReq) {
            try {
                const res = await api.postSchool(school);
                this.schools.push(res.data);
                console.log(res);
                if (res.status === 200) {
                    toastTrigger('Школа успешо добавлена', 'success');
                }
            } catch (error) {
                toastTrigger('Ошибка с сервером', 'error');
                console.error(error);
            }
        },

        async deleteSchool(schoolId: number) {
            try {
                await api.deleteSchool(schoolId);
                this.schools = this.schools.filter((school: SchoolReq) => school.id !== schoolId);
                toastTrigger('Школа успешно удалена','success')
            } catch (error) {
                toastTrigger('Ошибка с сервером', 'error');
                console.error(error);
            }
        },
        async putSchool(data: SchoolReq) {
            try {
                const res = await api.putSchool(data);
                const index = this.schools.findIndex((school: SchoolReq) => school.id === data.id);
                if (index !== -1) {
                    this.schools[index] = res.data;
                    toastTrigger('Школа успешно редактирована', 'success');
                }
            } catch (error) {
                toastTrigger('Ошибка с сервером', 'error');
                console.error(error);
            }
        },
        async getUserBySchoolId(schoolId: number) {
            try {
                const res = await api.UsersBySchoolId(schoolId);
                this.schools = res.data;
            } catch (error) {
                console.error(error);
            }
        }
    },
});