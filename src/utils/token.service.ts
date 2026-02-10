
export class TokenService {
    static setUserToken(token: string, id: string) {
        localStorage.setItem("token", token);
        localStorage.setItem("userId", id);
    }

    static setAdminToken(token: string) {
        localStorage.setItem("token", token);
    }

    static getToken() {
        return localStorage.getItem("token");
    }

    static getIdToken() {
        return localStorage.getItem("userId");
    }

    static removeToken() {
        localStorage.clear();
    }
}
