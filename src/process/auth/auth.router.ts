import SignIn from "./sign-in/Sign-in.vue";
import SignUp from "./sign-up/Sign-Up.vue";
import ForgotPassword from "./forgot-password/ForgotPassword.vue";
import SendCode from "./forgot-password/SendCode.vue";
import ResetPassword from "./forgot-password/ResetPassword.vue";

export const AuthRouter = [
    {path: "/auth/sign-in", component: SignIn},
    {path: "/auth/sign-up", component: SignUp},
    {path: "/auth/forgot-password", component: ForgotPassword},
    {path: "/auth/send-code", component: SendCode},
    {path: "/auth/reset-password", component: ResetPassword},
]
