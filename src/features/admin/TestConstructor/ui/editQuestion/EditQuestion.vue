<script setup lang="ts">
import {ref, onMounted} from "vue";
import {useStore} from "../../model/store";
import {useRoute} from "vue-router";
import type {QuestionUpdateState} from "../../type";
import {imageRedirection} from "../../../../../utils";

const store = useStore();
const route = useRoute();

const testData = ref<QuestionUpdateState>({
  questionUpdateRequest: {
    questionId: 0,
    image: "",
    description: "",
  },
  optionUpdateRequests: Array(4).fill({
    optionId: undefined,
    image: "",
    description: "",
    isCorrect: false,
  }),
});

const handleQuestionImageUpload = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    testData.value.questionUpdateRequest.image = file
  }
};

const handleOptionImageUpload = (e: Event, index: number) => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    testData.value.optionUpdateRequests[index].image = file
  }
};

const handleRemoveOptionImage = (index: number) => {
  testData.value.optionUpdateRequests[index].image = "";
};

const setCorrect = (index: number) => {
  testData.value.optionUpdateRequests.forEach((option, i) => {
    option.isCorrect = i === index;
  })
}

const onSave = async () => {
  const {questionId} = testData.value.questionUpdateRequest;

  if (questionId === 0) {
    console.error("Invalid question ID");
    return;
  }

  try {
    await store.updateTest(testData.value);
    // router.back();
  } catch (error) {
    console.error("Failed to update the question", error);
  }
};

const loadQuestion = async (questionId: number) => {
  try {
    await store.getQuestionById(questionId);
    const question: any = store.fullQuestionById


    testData.value = {
      questionUpdateRequest: {
        questionId: question.questionId,
        image: question.image || "",
        description: question.description || "",
      },
      optionUpdateRequests: question.optionsResponse.map((option: any) => ({
        optionId: option.id,
        image: option.image || "",
        description: option.description || "",
        isCorrect: option.correct || false,
      })),
    };
  } catch (error) {
    console.error("Error loading question", error);
  }
};

onMounted(() => {
  const questionId = parseInt(route.params.questionId as string, 10);
  if (!isNaN(questionId)) {
    loadQuestion(questionId);
  } else {
    console.error("Invalid question ID in route params");
  }
});

</script>

<template>
  <div class="p-4 w-full mx-auto bg-white shadow-md rounded-lg">
    <div class="mb-4">
      <div class="flex justify-between">
        <span class="block text-2xl font-semibold text-gray-700">Описание вопроса</span>

        <div class="flex items-center gap-4">
          <input
              type="file"
              accept="image/*"
              @change="handleQuestionImageUpload"
              class="hidden"
              ref="questionImageInput"
          />
          <div v-if="testData.questionUpdateRequest.image" class="relative w-24 h-24 border rounded-lg overflow-hidden">
            <img
                v-if="testData.questionUpdateRequest.image"
                :src="imageRedirection(testData.questionUpdateRequest.image)"
                alt="Question"
                class="object-cover w-full h-full"
            />
            <button
                class="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                @click="testData.questionUpdateRequest.image = ''"
            >
              ×
            </button>
          </div>
          <button
              class="px-3 py-2 bg-[#575263] text-white text-sm font-medium rounded-lg"
              @click="$refs.questionImageInput.click()"
          >
            Добавить изображение
          </button>
        </div>
      </div>
      <textarea
          v-model="testData.questionUpdateRequest.description"
          class="w-full border rounded-lg p-2 mt-2 text-sm"
          placeholder="Введите описание вопроса"
      ></textarea>
    </div>

    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700">Изображение вопроса</label>

    </div>

    <div class="grid grid-cols-2 gap-4">
      <div
          v-for="(option, index) in testData.optionUpdateRequests"
          :key="index"
          class="border px-2 py-1 rounded-lg"
      >
        <div>
          <div class="flex justify-between items-center">
          <span class="block text-sm font-medium text-gray-700">
            Описание варианта {{ index + 1 }}
          </span>
            <input type="checkbox" :checked="option.isCorrect" @click="setCorrect(index)" />

            <label>
              <input
                  type="file"
                  accept="image/*"
                  @change="handleOptionImageUpload($event, index)"
                  hidden
                  :ref="`optionImageInput${index}`"
              />
              <div v-if="option.image" class="relative w-24 h-24 border rounded-lg overflow-hidden">
                <img
                    :src="imageRedirection(option.image)"
                    alt="Option {{ index + 1 }}"
                    class="object-cover w-full h-full"
                />
                <button
                    class="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    @click="handleRemoveOptionImage(index)"
                >
                  ×
                </button>
              </div>
              <span
                  class="px-3 py-2 bg-[#575263] text-white text-sm font-medium rounded-lg"
              >
                Добавить изображение
              </span>
            </label>
          </div>
          <textarea
              v-model="option.description"
              class="w-full border rounded-lg p-2 mt-2 text-sm resize-none"
              placeholder="Введите описание варианта"
          ></textarea>
        </div>
      </div>
    </div>

    <div class="mt-6 text-right">
      <button
          class="px-4 py-2 bg-green-500 text-white font-medium rounded-lg"
          @click="onSave"
      >
        Сохранить
      </button>
    </div>
  </div>
</template>