import ListOfSubject from "./ui/list-of-subject/ListOfSubject.vue";
import Training from "./ui/training/Training.vue";
import Trial from "./ui/trial/Trial.vue";
import Finish from "./ui/trial/Finish.vue";

export const TestRouter = [
    {path: "", component: ListOfSubject},
    {path: "training-test", component: Training},
    {path: "trial-test", component: Trial},
    {path: "finish", component: Finish},
]