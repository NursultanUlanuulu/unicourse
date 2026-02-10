<script setup lang="ts" xmlns="http://www.w3.org/1999/html">
import { useTestStore } from "../../test.store";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import type { QuestionState } from "../../test.interface";
import ProgressBar from "../component/ProgressBar.vue";
import { imageRedirection } from "../../../../utils/index.js";
import emitter from "../../../../utils/eventBus.js";

const router = useRouter();
const { subjectId, subjectName, questionLimit, time } = router.options.history.state;
const testStore = useTestStore();

const currentQuestionIndex = ref<number>(0);
const question = computed<QuestionState | null>(() => {
  return testStore.testData[currentQuestionIndex.value] || null;
});

const currentOptionId = ref<number | null>();

const isImageModalOpen = ref(false); // Состояние для отображения модального окна
const modalImageSrc = ref(""); // Источник изображения для модального окна

const setAnswer = () => {
  if (!!currentOptionId.value) {
    if (!!question.value?.questionId) {
      if (!!question.value.testId) {
        console.log(currentOptionId.value, question.value.questionId, question.value.testId);
        testStore.setAnswer(question.value.questionId, currentOptionId.value, question.value.testId);
        if (currentQuestionIndex.value === Number(questionLimit) - 1) {
          router.push({ path: "/user-panel/finish", state: { testId: question.value?.testId } });
        }
        currentQuestionIndex.value += 1;
      }
    }
  } else {
    emitter.emit("show-toast", { message: "Выберите вариант ответа", type: "info" });
  }
  currentOptionId.value = null;
};

const times = Number(time) * 60;

onMounted(() => {
  testStore.fetchTestData(Number(questionLimit), String(subjectId));
});

// Функция для открытия модального окна
const openImageModal = (imageSrc: string) => {
  modalImageSrc.value = imageSrc;
  isImageModalOpen.value = true;
};

// Функция для закрытия модального окна
const closeImageModal = () => {
  isImageModalOpen.value = false;
  modalImageSrc.value = "";
};
</script>

<template>
  <div class="md:w-10/12 w-11/12 mx-auto">
    <div class="flex gap-4 text-white text-2xl py-2">
      <img
          src="/assets/icon/backArrowIcon.svg"
          alt="Back Arrow"
          width="24px"
          height="24px"
          @click="router.push('/user-panel')"
      />
      <p>{{ subjectName + `, ${$t('userMainPage.test.questionCount')}: ` + testStore.testData?.length }}</p>
    </div>

    <ProgressBar v-if="time" :time="times" redirect-to="/user-panel" />

    <div class="flex flex-col gap-2 justify-center my-5 mb-16">
      <div class="bg-[#32183b] flex flex-col gap-3 border border-black rounded-2xl p-5 shadow-[0px_0px_30px_-10px_purple]">
        <div class="bg-white py-2 px-5 flex flex-col sm:flex-row justify-between rounded-lg">
          <div class="flex flex-col">
            <span class="font-bold text-xl">{{ $t('userMainPage.test.question') }} № {{ currentQuestionIndex + 1 }} </span>
            <p class="text-2xl">{{ question?.description }}</p>
          </div>
          <div
              v-if="question?.image"
              class="md:w-[120px] md:h-[120px] w-[150px] h-[150px] overflow-hidden border-2 rounded-lg bg-black"
              @click="openImageModal(imageRedirection(question.image))"
          >
            <img
                v-if="question.image"
                :src="imageRedirection(question.image)"
                alt="option-image"
                class="w-full h-full object-contain"
            />
          </div>
        </div>

        <div class="grid md:grid-cols-2 grid-cols-1 gap-2 gap-x-5">
          <button
              v-for="(option, index) in question?.optionsResponse"
              :key="index"
              @click="currentOptionId = option.id"
              :class="{ '!bg-lime-200': option.id === currentOptionId }"
              class="bg-white py-2 px-5 rounded-lg border-2 flex flex-col sm:flex-row gap-2 justify-between"
          >
            <p class="text-start">{{ ['а', 'б', 'в', 'г'][index] }}) {{ option?.description }}</p>
            <div
                v-if="option.image"
                class="md:w-[90px] md:h-[90px] w-[120px] h-[120px] overflow-hidden flex flex-col justify-center items-center border-2 rounded-lg bg-black"
                @click="openImageModal(imageRedirection(option.image))"
            >
              <img
                  v-if="option.image !== 'err'"
                  :src="imageRedirection(option.image)"
                  alt="option-image"
                  class="w-full h-full object-contain"
              />
              <p v-if="option.image === 'err'" class="text-white">Без фото</p>
            </div>
          </button>
        </div>
      </div>

      <div class="flex justify-center gap-10">
        <button
            class="bg-lime-500 py-2 px-10 rounded-lg font-semibold disabled:opacity-40 text-2xl"
            @click="setAnswer"
        >
          {{ $t("userMainPage.test.nextButton") }}
        </button>
      </div>
    </div>
  </div>

  <!-- Модальное окно для увеличенного изображения -->
  <div v-if="isImageModalOpen" class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-40" @click="closeImageModal">
    <div class="w-[90%] h-[55vh] md:w-[500px] md:h-[500px] bg-white p-4 rounded-lg shadow-lg">
      <img :src="modalImageSrc" alt="Enlarged Image" class="w-full h-full object-contain" />
    </div>
  </div>
</template>
