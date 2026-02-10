<script setup lang="ts">
import {useRouter} from "vue-router";
import axiosInstance from "../../../../process/auth/auth.interceptor";
import {computed, onMounted, ref, watch} from "vue";
import type {QuestionState} from "../../test.interface";
import QuestionBlock from "../component/QuestionBlock.vue";

const router = useRouter()
const {subjectId, subjectName, questionCount} = router.options.history.state
const questions = ref<QuestionState[]>([])
const loading = ref<boolean>(false);


const fetchQuestionBySubjectId = async () => {
  loading.value = true;
  try {
    const response = await axiosInstance.get(`/api/question/getAllQuestionsBySubject/${subjectId}?page=${currentPage.value}`);
    questions.value = response.data;
    if (response.status === 404) {
      router.push('/user-panel')
    }

  } catch (error) {
    console.error('Error fetching data:', error);
  }
  loading.value = false;
}

const currentPage = ref<number>(1)
const scrollContainer = ref<HTMLElement | null>(null);

const maxPageCalculate = () => {
  return Math.ceil(Number(questionCount) / 15);
}

const visiblePages = computed(() => {
  const pages = [];
  const totalPages = maxPageCalculate();
  const maxVisible = 5;

  if (totalPages <= maxVisible + 2) {
    return Array.from({length: totalPages}, (_, i) => i + 1);
  }

  pages.push(1);

  if (currentPage.value > 3) {
    pages.push("...");
  }

  let start = Math.max(2, currentPage.value - 1);
  let end = Math.min(totalPages - 1, currentPage.value + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (currentPage.value < totalPages - 2) {
    pages.push("...");
  }

  pages.push(totalPages);

  return pages;
});

// Функция установки страницы
const setPage = (page: string) => {
  if (page !== "...") {
    currentPage.value = Number(page);
  }
  if (scrollContainer.value) {
    scrollContainer.value.scrollTop = 0
  }
};

const prev = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1
    if (scrollContainer.value) {
      scrollContainer.value.scrollTop = 0
    }
  }
}
const next = () => {
  if (currentPage.value < maxPageCalculate()) {
    currentPage.value += 1
    if (scrollContainer.value) {
      scrollContainer.value.scrollTop = 0
    }
  }
}

watch(currentPage, () => {
  fetchQuestionBySubjectId();
});

onMounted(fetchQuestionBySubjectId);
</script>

<template>
  <div class="md:w-10/12 w-11/12 mx-auto">
    <div class="flex gap-4 text-white text-2xl py-2">
      <img src="/assets/icon/backArrowIcon.svg" alt="Back Arrow" width="24px" height="24px"
           @click="router.push('/user-panel')"/>
      <p>{{ subjectName }}</p>
    </div>

    <ul class="flex flex-col md:px-10 px-2 md:py-4 bg-[#32183b] rounded-xl shadow-[0px_0px_30px_-10px_purple] overflow-y-auto h-[69vh]"
        ref="scrollContainer"
    >
      <QuestionBlock
          v-for="(question, index) in questions"
          :key="index + ((currentPage - 1) * 15)"
          :question="question"
          :index="index + ((currentPage - 1) * 15)"
      />
    </ul>

    <div class="bg-gray-300 flex flex-col gap-2 px-4 py-1 mb-2 rounded-lg">
      <div class="flex sm:hidden gap-3 justify-center ">
          <span v-for="(page, index) in visiblePages"
                :key="index"
                class="bg-blue-300 font-bold w-6 h-6 flex items-center justify-center cursor-pointer border-2 border-zinc-400"
                :class="{'bg-lime-200': page === currentPage, 'cursor-default': page === '...'}"
                @click="setPage(String(page))"
          >
          {{ page }}
          </span>
      </div>
      <div class="flex sm:justify-between justify-evenly items-center">
        <!-- Кнопка "Назад" -->
        <button class="border-2 border-lime-600 rounded-lg py-1 px-5 hover:bg-lime-600 transition-all"
                @click="prev"
                :disabled="currentPage === 1">
          <img src="/assets/icon/arrow-icon.svg" alt="ArrowLeft" class="rotate-180"/>
        </button>

        <!-- Пагинация -->
        <div class="sm:flex gap-3 hidden">
          <span v-for="(page, index) in visiblePages"
                :key="index"
                class="bg-blue-300 font-bold w-6 h-6 flex items-center justify-center cursor-pointer border-2 border-zinc-400"
                :class="{'bg-lime-200': page === currentPage, 'cursor-default': page === '...'}"
                @click="setPage(String(page))"
          >
          {{ page }}
          </span>
        </div>

        <!-- Кнопка "Вперед" -->
        <button class="border-2 border-lime-600 rounded-lg py-1 px-5 hover:bg-lime-600 transition-all"
                @click="next"
                :disabled="currentPage === maxPageCalculate()">
          <img src="/assets/icon/arrow-icon.svg" alt="ArrowRight"/>
        </button>
      </div>
    </div>
  </div>
</template>
