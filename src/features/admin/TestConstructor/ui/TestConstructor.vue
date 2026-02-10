<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useStore} from "../model/store";
import {useRouter} from "vue-router";
import ModalAddSubject from "../../../../shared/ui/modalAddSubject/ModalAddSubject.vue";
import type {SubjectPostReq} from "../type";

const subject = useStore();
const router = useRouter();
const formInitialData = ref<SubjectPostReq>({
  subjectName: "",
  questionCount: 1,
  main: false,
  countQuestionInTest: 0,
  time: 0,
  kgLanguage: false
});

const showFormModal = ref(false);

onMounted(() => {
  subject.fetchSubjects();
});

const requestAdd = () => {
  showFormModal.value = true;
};

const closeModal = () => {
  showFormModal.value = false
  // formInitialData.value = {}
}

const navigateToQuestion = (
    subjectId: number,
    subjectName: string,
    questionCount: number
) => {
  router.push({
    path: `/admin-panel/test-list/${subjectId}`,
    query: {subjectName, questionCount: Number(questionCount)},
  });
};

const addSubjectHandler = async (data: SubjectPostReq) => {
  try {
    await subject.postSubject(data);
    showFormModal.value = false;
    await subject.fetchSubjects()
  } catch (err) {
    console.log(err)
  }
};
</script>


<template>
  <div class="flex flex-col gap-5">
    <div class="flex justify-between items-center">
      <h1 class="text-[#291A40] text-3xl">Предметы</h1>
      <button @click="requestAdd" class="text-white py-3 px-4 bg-[#3c3846] border-none rounded-xl hover:bg-[#575263]">
        Добавить предмет
      </button>
    </div>
    <div v-if="subject.subjects.length > 0" class="grid grid-cols-2 gap-5 max-h-[72vh] overflow-y-auto pr-5">
      <button
          v-for="(subjectItem, index) in subject.subjects"
          :key="index"
          @click="navigateToQuestion(subjectItem.id, subjectItem.subjectName, subjectItem.questionCount)"
          class="border border-white py-2 px-4 rounded-lg flex justify-between shadow-md text-[#dad8de] cursor-pointer hover:shadow-lg hover:border-gray-400"
      >
        <p class="text-start">{{ subjectItem.subjectName }}</p>
        <p>{{ subjectItem.questionCount }}</p>
      </button>
    </div>
    <p v-else >Загрузка предметов...</p>
  </div>
  <ModalAddSubject v-if="showFormModal" :initialData="formInitialData" @submit="addSubjectHandler" :close="closeModal"/>
</template>