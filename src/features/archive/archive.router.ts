import ListOfArchive from "./ui/ListOfArchive.vue";
import FullArchive from "./ui/FullArchive.vue";

export const ArchiveRouter = [
    {path: 'archive', component: ListOfArchive},
    {path: ':testId', component: FullArchive},
]