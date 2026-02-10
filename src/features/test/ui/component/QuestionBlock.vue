<script setup lang="ts">
import type { OptionState, QuestionState } from "../../test.interface";
import OptionBlock from "./OptionBlock.vue";
import ChatUi from "../../../Ai/ui/ChatUi/ChatUi.vue";
import { ref } from "vue";
import { useChatStore } from "../../../Ai/model/store";
import { imageRedirection } from "../../../../utils/index.js";

const chatStore = useChatStore();
const isModalOpen = ref(false);
const aiHelpData = ref<any>(null);
const selectedOptionId = ref<number | null>(null);
const clearChat = chatStore.clearChat;
const isImageModalOpen = ref(false);

const props = defineProps<{
  question: QuestionState;
  index: number;
}>();

const handleOptionClick = (option: OptionState) => {
  selectedOptionId.value = option.id;
};

const handleOpenModal = () => {
  clearChat();
  aiHelpData.value = {
    question: props.question.description,
    options: props.question.optionsResponse.map((opt: any) => opt.description),
  };
  isModalOpen.value = true;
};

const handleCloseModal = () => {
  isModalOpen.value = false;
};

const selectedImage = ref<string | undefined>(undefined);

const openImageModal = (imageSrc: string) => {
  selectedImage.value = imageSrc;
  isImageModalOpen.value = true;
};

const closeImageModal = () => {
  isImageModalOpen.value = false;
  selectedImage.value = undefined;
};

</script>

<template>
  <li class="grid grid-cols-1 gap-4 py-4" :class="{ 'border-t-[3px] border-dashed': index !== 0 }">
    <div class="bg-white py-2 px-5 flex justify-between items-start gap-3 rounded-lg">
      <div class="flex flex-col sm:flex-row gap-2 justify-between flex-1 items-start cursor-default">
        <div class="flex flex-col">
          <span class="font-bold text-xl">{{ $t('userMainPage.test.question')}} № {{ index + 1 }} </span>
          <p class="text-2xl">{{ question?.description }}</p>
        </div>
        <div
            v-if="question?.image"
            class="md:w-[220px] md:h-[220px] w-[150px] h-[150px] overflow-hidden border-2 rounded-lg bg-black cursor-pointer"
            @click="openImageModal(imageRedirection(question.image))"
        >
          <img
              v-if="question.image"
              :src="imageRedirection(question.image)"
              alt="option-image"
              class="w-full h-full object-contain"
          >
        </div>
      </div>
      <div @click="handleOpenModal" class="cursor-pointer active:bg-blue-300 hover:bg-blue-200 w-7 h-7 flex items-center justify-center rounded-full select-none">
        <img src="/assets/icon/aiIcon.svg" alt="AI помощь" />
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-2 gap-x-5">
      <OptionBlock
          v-for="(option, i) in question.optionsResponse"
          :key="option.id"
          :option="option"
          :handleOptionClick="handleOptionClick"
          :selectedOptionId="selectedOptionId"
          :index="i"
      />
    </div>

    <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
      <ChatUi :aiHelpData="aiHelpData" :handleClose="handleCloseModal" />
    </div>

    <div v-if="isImageModalOpen" class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-40" @click="closeImageModal">
      <div class="w-[90%] h-[55vh] md:w-[500px] md:h-[500px] bg-white p-4 rounded-lg shadow-lg" >
        <img :src="selectedImage" alt="Enlarged Image" class="w-full h-full object-contain">
<!--        <button @click="closeImageModal" class="mt-4 w-full bg-red-500 text-white py-2 rounded">Закрыть</button>-->
      </div>
    </div>
  </li>
</template>
