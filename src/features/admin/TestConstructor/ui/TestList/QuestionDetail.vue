<script setup lang="ts">
import {useRoute, useRouter} from 'vue-router';
import {onMounted} from 'vue';
import {useStore} from '../../model/store';
import {imageRedirection} from "../../../../../utils";

const route = useRoute();
const router = useRouter();
const questionId = Number(route.params.questionId);
const testConstructorStore = useStore();

onMounted(async () => {
  try {
    await testConstructorStore.getQuestionById(questionId);
  } catch (error) {
    console.log(error);
  }
});

</script>
<template>

  <div
      class="bg-white p-6 rounded-2xl shadow-xl max-h-[80vh] overflow-y-scroll w-full transform transition-all duration-300 scale-100"
  >
    <div class="flex gap-3 items-center">
      <img @click="router.back()" class="cursor-pointer" src="/assets/svg/back.svg" alt="back"/>
      <h2 class="text-2xl font-bold text-[#291A40]">Детали вопроса</h2>
    </div>

    <div class="flex justify-between items-center mb-4">

      <p class="text-gray-700 text-lg mb-6">
        {{ testConstructorStore.fullQuestionById?.description }}
      </p>

      <div v-if="testConstructorStore.fullQuestionById?.image" class="w-32 h-32 overflow-hidden border-2 rounded-lg">
        <img :src="imageRedirection(testConstructorStore.fullQuestionById.image)" alt="avatar" class="object-contain">
      </div>
    </div>

    <div class="grid grid-cols-2 gap-2">
      <div
          v-for="(option, optionIndex) in testConstructorStore.fullQuestionById?.optionsResponse"
          :key="optionIndex"
          class="flex justify-between items-center gap-4 p-4 bg-[#F9F9F9] rounded-lg shadow-md hover:shadow-lg hover:bg-[#EFEFEF] transition-all duration-200"
      >
        <div class="flex gap-4">
          <p class="w-8 h-8 flex justify-center items-center bg-[#6C63FF] text-white font-bold rounded-full shadow-sm">
            {{ ['A', 'B', 'C', 'D'][optionIndex] }}
          </p>
          <input
              type="radio"
              :name="'question-' + testConstructorStore.fullQuestionById?.id"
              :checked="option.correct"
              class="cursor-pointer accent-[#6C63FF] scale-125"
              readonly
          />
          <label class="text-gray-800 font-medium">{{ option?.description }}</label>
        </div>
        <div v-if="option.image" class="w-32 h-32 overflow-hidden border-2 rounded-lg">
          <img :src="imageRedirection(option.image)" alt="avatar"
               class="object-contain">
        </div>
      </div>
    </div>
  </div>
</template>