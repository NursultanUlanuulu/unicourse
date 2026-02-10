import LandingPage from "../views/LandingPage/LandingPage.vue";
import {AuthRouter} from "../process/auth/auth.router.ts";
import { AdminRouter } from "../views/AdminPanel/admin.route.ts";
import User from "../views/UserPanel/User.vue"
import {TestRouter} from "../features/test/test.router.ts";
import {UserProfileRouter} from "../features/user-profile/user-profile.router.ts";
import {ArchiveRouter} from "../features/archive/archive.router.ts";

export const AppRouter = [
    {path: "", component: LandingPage},
    ...AuthRouter,
    AdminRouter,
    {
        path: '/user-panel',
        component: User,
        children: [
            ...TestRouter,
            ...UserProfileRouter,
            ...ArchiveRouter
        ]
    }
]