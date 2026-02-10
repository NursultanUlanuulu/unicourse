import Admin from "./Admin.vue";
import TestConstructor from "../../features/admin/TestConstructor/ui/TestConstructor.vue";
import Users from "../../features/admin/Users/ui/Users.vue";
import School from "../../features/admin/Schools/ui/Schools.vue";
import TestList from "../../features/admin/TestConstructor/ui/TestList/TestList.vue";
import AddQuestion from "../../features/admin/TestConstructor/ui/addQuestion/AddQuestion.vue";
import UserDetail from "../../features/admin/Users/ui/UserDetail.vue";
import QuestionDetail from "../../features/admin/TestConstructor/ui/TestList/QuestionDetail.vue";
import EditQuestion from "../../features/admin/TestConstructor/ui/editQuestion/EditQuestion.vue";
import ListOfArchive from "../../features/archive/ui/ListOfArchive.vue";
import FullArchive from "../../features/archive/ui/FullArchive.vue";

export const AdminRouter = {
    path: "/admin-panel",
    component: Admin,
    children: [
        {path: "", component: TestConstructor},
        {path: "test-list/:id", component: TestList},
        {path: "test-list/:itemId/addQuestion", component: AddQuestion},
        {path: "test-list/:itemId/editQuestion/:questionId", component: EditQuestion},
        {path: "test-list/:itemId/addQuestion/:questionId", component: QuestionDetail},
        {path: "user", component: Users},
        {path: "user/:userId", component: UserDetail},
        {path: "user/archive" , component: ListOfArchive},
        {path: "user/archive/:testId", component: FullArchive},
        {path: "school", component: School}
    ]
}