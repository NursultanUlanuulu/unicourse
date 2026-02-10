import emitter from "../../../../utils/eventBus.ts";
import {defineStore} from "pinia";
import {api} from "../api.ts";
import type {
    GetQuestionsListResponse,
    QuestionReq,
    QuestionUpdateState, SubjectPostReq,
    SubjectReq,
    TestFileState
} from "../type.ts";
import {ref} from "vue";
import axiosInstance from "../../../../process/auth/auth.interceptor.ts";
import {useRouter} from "vue-router";

const triggerToast = ({message, type}: { message: string, type: 'success' | 'error' }) => {
    emitter.emit('show-toast', {message, type});
};

export const defaultQuestion: TestFileState = {
    questionImageRequest: {
        description: "",
        subjectId: 1,
        image: ''
    },
    optionImageRequests: [
        {description: "", isCorrect: true, image: ''},
        {description: "", isCorrect: false, image: ''},
        {description: "", isCorrect: false, image: ''},
        {description: "", isCorrect: false, image: ''},
    ],
};

export const useStore = defineStore("store", () => {
    const testArray = ref<TestFileState[]>([defaultQuestion]);
    const fullQuestionById = ref<QuestionReq | null>(null);
    const questionsList = ref<QuestionReq[]>([]);
    const loading = ref(false);
    const currentPage = ref(1);
    const questionsPerPage = ref(15);
    const hasMore = ref(true);
    const subjects = ref<SubjectReq[]>([]);
    const fullSubject = ref()
    const resetTestArray = () => {
        testArray.value = [defaultQuestion];
    };
    const router = useRouter()

    const getQuestionsList = async (subjectId: number, page: number): Promise<GetQuestionsListResponse | undefined> => {
        try {
            const res = await api.getQuestions(subjectId, page);
            questionsList.value = res.data;
            return {status: "success", message: ""};
        } catch (err) {
            questionsList.value = []
            hasMore.value = false;
            return {status: "error", message: "Произошла ошибка при запросе данных"};
        }
    };

    const postQuestion = async (question: TestFileState) => {
        console.log("Question before request: ", question)
        try {
            question.questionImageRequest.image = await uploadService(question.questionImageRequest.image)

            for (let option of question.optionImageRequests) {
                option.image = await uploadService(option.image)
            }

            await axiosInstance.post('/api/question/save-with-image', question)

            triggerToast({message: 'Вопрос успешно добавлен', type: 'success'})
            // await router.push(`/admin-panel/test-list`)
        } catch (err) {
            triggerToast({message: 'Произошла ошибка с сервером', type: 'error'})
            throw err
        }
    };

    const deleteQuestion = async (questionId: number, subjectId: number, page: number) => {
        try {
            const res = await api.deleteQuestion(questionId);
            if (res.status === 200) {
                questionsList.value = questionsList.value.filter((q: QuestionReq) => q.id !== questionId);
                triggerToast({message: "Данные успешно удалены", type: "success"})
                await getQuestionsList(subjectId,page)
            }
        } catch (err) {
            console.log(err);
        }
    };

    const getQuestionById = async (questionId: number) => {
        try {
            const res = await api.getQuestionById(questionId);
            if (res.status === 200) {
                testArray.value = [res.data];
                fullQuestionById.value = res.data;
            } else {
                console.debug(`Ошибка при получении вопроса, статус: ${res.status}`);
            }
        } catch (err) {
            console.debug("Ошибка в getQuestionById:", err);
        }
    };

    const updateTest = async (data: QuestionUpdateState) => {
        loading.value = true;
        try {
            data.questionUpdateRequest.image = await uploadService(data.questionUpdateRequest.image)
            for (let option of data.optionUpdateRequests) {
                option.image = await uploadService(option.image)
            }

            const res = await api.updateQuestionById(data)
            if(res.status === 200) {
                triggerToast({message: 'Вопрос успешно добавлен', type: 'success'})
                router.back()
            }
        } catch (err) {
            console.debug(err);
        } finally {
            loading.value = false;
        }
    };

    const setCurrentPage = (page: number) => {
        currentPage.value = page;
    };
    const setHasMore = (value: boolean) => {
        hasMore.value = value;
    };
    const fetchSubjects = async () => {
        loading.value = true;
        questionsList.value = []
        try {
            const res = await api.getSubjects();
            if (res.status === 200) {
                subjects.value = res.data;
            } else {
                console.debug(`Ошибка при получении предметов, статус: ${res.status}`);
            }
        } catch (err) {
            console.debug("Ошибка в fetchSubjects:", err);
        } finally {
            loading.value = false;
        }
    };

    const postSubject = async (subject: SubjectPostReq) => {
        try {
            subject.id = 0
            await api.addSubject(subject)
            emitter.emit('show-toast', {message: 'Предмет успешно добавлен', type: 'success'})
        } catch (err) {
            emitter.emit('show-toast', {message: 'Похоже что-то пошло не так', type: 'error'})
            throw err
        }
    }

    const getSubjectById = async (subjectId: number) => {
        try {
            const res = await api.getSubjectById(subjectId)
            fullSubject.value = res.data
            console.log(res)
        } catch (err) {
            emitter.emit('show-toast', {message: 'Похоже что-то пошло не так', type: 'error'})
            throw err
        }
    }

    const updateSubject = async (subjectId: number, subject: SubjectPostReq) => {
        try {
            await api.editSubject(subjectId, subject)
            emitter.emit('show-toast', {message: 'Предмет успешно обновлен', type: 'success'})
        } catch (err) {
            emitter.emit('show-toast', {message: 'Похоже что-то пошло не так', type: 'error'})
            throw err
        }
    }

    const deleteSubject = async (subjectId: number) => {
        try {
            const response = await api.deleteSubject(subjectId)
            console.log(response)
            emitter.emit('show-toast', {message: 'Предмет успешно удален', type: 'success'})
        } catch (err) {
            emitter.emit('show-toast', {message: 'Ошибка при удалении предмета', type: 'error'})
            throw err
        }
    }

    const uploadService = async (image: File | string) => {
        try {
            if (image instanceof File && image instanceof Blob) {
                const {data} = await axiosInstance.post('/s3/upload',
                    {file: image},
                    {
                        headers: {"Content-Type": "multipart/form-data"}
                    });
                return data as string;
            }
            return image
        } catch (err) {
            console.error(err);
            return "err"
        }
    }

    return {
        testArray,
        fullQuestionById,
        questionsList,
        loading,
        currentPage,
        questionsPerPage,
        hasMore,
        subjects,
        fullSubject,
        resetTestArray,
        getQuestionsList,
        postQuestion,
        postSubject,
        deleteQuestion,
        getQuestionById,
        updateTest,
        setCurrentPage,
        setHasMore,
        fetchSubjects,
        deleteSubject,
        uploadService,
        updateSubject,
        getSubjectById
    };
});
