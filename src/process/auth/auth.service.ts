import type {SignIn, SignUp} from "./auht.interface.ts";
import axios, {type AxiosInstance} from "axios";
import {config} from "../../config.ts";
import {TokenService} from "../../utils/token.service.ts";
import {useRouter} from "vue-router";
import emitter from "../../utils/eventBus.ts";

export class AuthService {
    private http: AxiosInstance;
    private router = useRouter();
    private statusOk = 200

    constructor() {
        this.http = axios.create({
            baseURL: config.baseUrl,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    login = async (signIn: SignIn) => {
        try {
            const response = await this.http.post("/api/v1/auth/sign-in", signIn);
            switch (response.data.role) {
                case 'ADMIN':
                    TokenService.setAdminToken(response.data.token)
                    await this.router.push("/admin-panel")
                    break;
                case 'USER':
                    TokenService.setUserToken(response.data.token, response.data.id)
                    await this.router.push("/user-panel")
                    break;
                default:
                    console.error("error");
            }

            return response.data;
        } catch (error: any) {
            throw error;
        }
    }

    register = async (signUp: SignUp) => {
        try {
            const response = await this.http.post("/api/v1/auth/register", signUp);
            if (response.status === this.statusOk) {
                await this.router.push("/auth/sign-in");
                emitter.emit('show-toast', {message: 'Вы успешно вошли в систему', type: 'success'})
            } else {
                emitter.emit('show-toast', {message: 'Неверный логин или пароль', type: 'error'})
            }
        } catch (error: any) {
            emitter.emit('show-toast', {message: 'Произошла ошибка с сервером', type: 'error'})
            throw error;
        }
    }

    sendEmail = async (email: string) => {
        try {
            const response = await this.http.post("/api/v1/auth/reset-password/code/" + email);
            if (response.status === this.statusOk) {
                await this.router.push({path: "/auth/send-code", state: {email: email}});
                emitter.emit('show-toast', {message: 'Код отправлен на ваш email адрес', type: 'success'})
            } else {
                emitter.emit('show-toast', {message: 'Аккунта не существует', type: 'info'})
            }
        } catch (error: any) {
            emitter.emit('show-toast', {message: 'Произошла ошибка с сервером', type: 'error'})
            throw error;
        }
    }

    sendCode = async ({email, code}: { email: string, code: string }) => {
        try {
            const response = await this.http.put(`/api/v1/auth/confirm/reset/${email}?code=${code}`);
            console.log(response);
            if (response.status === this.statusOk) {
                await this.router.push({path: "/auth/reset-password", state: {email: email}});
            }
        } catch (error: any) {
            console.error("Error in sendCode:", error.response?.data || error.message);
            throw error;
        }
    }

    resetPassword = async ({email, newPassword, confirmPassword}: {
        email: string,
        newPassword: string,
        confirmPassword: string
    }) => {
        try {
            const response = await this.http.put(`/api/v1/auth/reset/password/${email}?newPassword=${newPassword}&confirmPassword=${confirmPassword}`);
            console.log(response)
            if (response.status === this.statusOk) {
                await this.router.push("/auth/sign-in");
            }
        } catch (error: any) {
            console.error("Error in resetPassword:", error.response?.data || error.message);
            throw error;
        }
    }
}