<script setup lang="ts">
import type { OptionState } from "../../test.interface";
import { imageRedirection } from "../../../../utils/index.js";
import { ref } from "vue";

defineProps<{
  option: OptionState;
  handleOptionClick: Function;
  selectedOptionId: number | null;
  index: number;
}>();

const isImageModalOpen = ref(false);
const modalImageSrc = ref("");

const openImageModal = (imageSrc: string) => {
  modalImageSrc.value = imageSrc;
  isImageModalOpen.value = true;
};

const closeImageModal = () => {
  isImageModalOpen.value = false;
};
</script>

<template>
  <button
      class="bg-white py-2 px-5 rounded-lg border-2 text-start flex flex-col md:flex-row justify-between gap-2"
      :class="{
      '!bg-lime-400': selectedOptionId !== null && option.correct,
      '!bg-red-400': selectedOptionId === option.id && !option.correct,
      '!bg-gray-300': selectedOptionId !== null && selectedOptionId !== option.id,
    }"
      @click="handleOptionClick(option)"
      :disabled="selectedOptionId !== null"
  >
    <p class="text-start">{{ ['а', 'б', 'в', 'г'][Number(index)] }}) {{ option?.description }}</p>
    <div
        v-if="option.image"
        class="md:w-[90px] md:h-[90px] w-[120px] h-[120px] overflow-hidden flex flex-col justify-center items-center border-2 rounded-lg bg-black cursor-pointer"
        @click.stop="openImageModal(imageRedirection(option.image))"
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

  <div v-if="isImageModalOpen" class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-40" @click="closeImageModal">
    <div class="w-[90%] h-[55vh] md:w-[500px] md:h-[500px] bg-white p-4 rounded-lg shadow-lg" >
      <img :src="modalImageSrc" alt="Enlarged Image" class="w-full h-full object-contain">
    </div>
  </div>
</template>
