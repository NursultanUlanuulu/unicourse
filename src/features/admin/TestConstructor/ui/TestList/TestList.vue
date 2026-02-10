<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useStore} from "../../model/store";
import {useRoute} from "vue-router";
import {useRouter} from "vue-router";
import ModalConfirm from "../../../../../shared/ui/modalConfirm/ModalConfirm.vue";
import type {QuestionReq, SubjectPostReq} from "../../type";
import ModalAddSubject from "../../../../../shared/ui/modalAddSubject/ModalAddSubject.vue";

const route = useRoute();
const router = useRouter();
const testConstructorStore = useStore();
const subjectId = Number(route.params.id);
const subjectName = route.query.subjectName as string;
const questionCount = Number(route.query.questionCount);
const currentPage = ref(1);
const showModal = ref(false);
const modalTitle = ref("");
const modalMessage = ref("");
const actionType = ref("");
const selectedQuestionId = ref<number | null>(null);
const editing = ref<boolean>(false);

const loadQuestions = () => {
  testConstructorStore.getQuestionsList(subjectId, currentPage.value);
};

const navigateToAddQuestion = (subjectId: number) => {
  router.push({
    path: `/admin-panel/test-list/${subjectId}/addQuestion`,
  });
};

const navigateToQuestionDetail = (questionId: number) => {
  router.push({
    path: `/admin-panel/test-list/${subjectId}/addQuestion/${questionId}`,
  })
}

const deleteQuestion = async (questionId: number) => {
  if (!questionId) {
    console.error("ID вопроса отсутствует из DeleteQuestion!");
    return;
  } else {
    console.log(questionId);
  }
  if (actionType.value === "delete") {
    try {
      await testConstructorStore.deleteQuestion(questionId,subjectId, currentPage.value);
    } catch (error) {
      console.log(error);
    }
  }
  showModal.value = false;
  selectedQuestionId.value = null;
}
const deleteSubject = (subjectId: number) => {
  if (actionType.value === "delete") {
    try {
      testConstructorStore.deleteSubject(subjectId);
      router.push('/admin-panel');
    } catch (error) {
      console.log(error);
    }
  }
}
const editQuestion = (question: QuestionReq) => {
  router.push({
    path: `/admin-panel/test-list/${subjectId}/editQuestion/${question.questionId}`,
  })
}

const goToPreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
    loadQuestions();
  }
};

const goToNextPage = () => {
  currentPage.value += 1;
  loadQuestions();
};

const maxPageCalculate = () => {
  return Math.ceil(questionCount / 15);
};

const requestDelete = (id: number, type: "question" | "subject") => {
  if (!id) {
    console.error("ID отсутствует!");
    return;
  }

  selectedQuestionId.value = type === "question" ? id : null;
  actionType.value = "delete";
  modalTitle.value = type === "question" ? "Удаление вопроса" : "Удаление предмета";
  modalMessage.value = type === "question"
      ? "Вы уверены, что хотите удалить этот вопрос?"
      : "Вы уверены, что хотите удалить этот предмет и все вопросы, относящиеся к нему?";
  showModal.value = true;
};
const confirmDelete = async () => {
  if (selectedQuestionId.value !== null) {
    await deleteQuestion(selectedQuestionId.value);
  } else {
    deleteSubject(subjectId);
  }
  showModal.value = false;
};


const formInitialData = ref<SubjectPostReq>({
  subjectName: "",
  questionCount: 0,
  main: false,
  countQuestionInTest: 0,
  time: 0,
  kgLanguage: false
});

const requestEdit = async () => {
  await testConstructorStore.getSubjectById(subjectId);
  console.log(testConstructorStore.fullSubject);
  formInitialData.value = {
    subjectName: testConstructorStore.fullSubject.subjectName,
    questionCount: testConstructorStore.fullSubject.questionCount,
    main: testConstructorStore.fullSubject.main,
    countQuestionInTest: testConstructorStore.fullSubject.countQuestionInTest,
    time: testConstructorStore.fullSubject.time,
    kgLanguage: false
  };
  editing.value = true;
};

const closeModal = () => {
  editing.value = false
  formInitialData.value = {
    subjectName: "",
    questionCount: 0,
    main: false,
    countQuestionInTest: 0,
    time: 0,
    kgLanguage: false
  }
}

const editSubjectHandler = async (data: SubjectPostReq) => {
  try {
    await testConstructorStore.updateSubject(subjectId, data);
    editing.value = false;
    await testConstructorStore.fetchSubjects()
    await router.push("/admin-panel")
  } catch (err) {
    console.log(err)
  }
};


onMounted(() => {
  loadQuestions();
});

</script>


<template>
  <div class="flex flex-col justify-between">
    <div class="flex justify-between items-center">
      <div class="flex items-center gap-3 cursor-pointer" @click="router.back()">
        <img src="/assets/svg/back.svg" alt="back"/>
        <h1 class="text-[#291A40] text-3xl font-bold">{{ subjectName }}</h1>
      </div>
      <div class="flex items-center gap-3">
        <button
            @click="requestEdit"
            class="border border-gray-400 rounded-xl bg-zinc-400 shadow-[0px_3px_3px_0px_rgba(0,0,0,0.25)] hover:bg-[#EFEFEF]"
        >
          <img src="/assets/svg/edit.svg" alt="edit" class="cursor-pointer w-[45px] h-[45px]"/>
        </button>
        <button
            class="border border-gray-400 rounded-xl bg-zinc-400 shadow-[0px_3px_3px_0px_rgba(0,0,0,0.25)] hover:bg-[#EFEFEF]"
            @click="requestDelete(subjectId, 'subject'); $event.stopPropagation()"
        >
          <img src="/assets/svg/delete.svg" alt="delete" class="cursor-pointer w-[45px] h-[45px]"/>
        </button>
        <button @click="navigateToAddQuestion(subjectId)"
                class="text-white py-3 px-4 bg-[#3c3846] border-none rounded-xl hover:bg-[#575263]">
          + Добавить вопрос
        </button>
      </div>
    </div>
    <div class="flex flex-col gap-2 mt-5 h-[67vh] overflow-y-scroll">
      <div
          class="bg-white w-[98%] p-2 h-min rounded-lg shadow-md border-l-4 border-[#291A40] cursor-pointer hover:border-lime-400 transition-all hover:translate-x-2"
          v-for="(question, index) in testConstructorStore.questionsList"
          :key="index"
          @click="navigateToQuestionDetail(question.questionId)"
      >
        <div class="flex items-center gap-3">
          <p class="px-4">{{ index + 1 + (currentPage - 1) * 15 }}</p>
          <div class="bg-[#F4F4F4] p-2 rounded-xl w-full flex justify-between items-center">
            <p class="text-[17px] w-[90%]">{{ question.description }}</p>
            <div class="flex gap-5">
              <img @click="editQuestion(question); $event.stopPropagation()"
                   class="cursor-pointer w-[25px] h-[25px] hover:scale-110 transition-all" src="/assets/svg/edit.svg"
                   alt="edit"/>
              <img @click="requestDelete(question.questionId, 'question'); $event.stopPropagation()"
                   class="cursor-pointer w-[25px] h-[25px] hover:scale-110 transition-all" src="/assets/svg/delete.svg"
                   alt="delete"/>
            </div>
          </div>
        </div>
      </div>
      <div v-if="testConstructorStore.questionsList.length === 0">Список пуст</div>
    </div>
    <div class="flex gap-10 items-center mt-2 text-white font-normal">
      <button
          @click="goToPreviousPage"
          class="cursor-pointer w-[100px] h-[30px] rounded-lg border-2 border-[#291A40] flex items-center justify-center"
          :disabled="currentPage <= 1"
      >
        <img src="/assets/icon/arrow-icon.svg" alt="arrow" class="rotate-180"/>
      </button>
      <p>{{ currentPage }}</p>
      <button
          @click="goToNextPage"
          :disabled="currentPage >= maxPageCalculate()"
          :class="{
          'cursor-pointer': currentPage < maxPageCalculate(),
          'cursor-not-allowed': currentPage >= maxPageCalculate()
        }"
          class="cursor-pointer w-[100px] h-[30px] rounded-lg border-2 border-[#291A40] flex items-center justify-center"
      >
        <img src="/assets/icon/arrow-icon.svg" alt="arrow"/>
      </button>
    </div>
  </div>
  <ModalConfirm
      :isVisible="showModal"
      :title="modalTitle"
      :message="modalMessage"
      @confirm="confirmDelete"
      @cancel="showModal = false"
  />
  <ModalAddSubject v-if="editing" :initialData="formInitialData" @submit="editSubjectHandler" :close="closeModal"/>

</template>
