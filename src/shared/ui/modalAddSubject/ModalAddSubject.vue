<template>
  <div class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-lg p-6 w-1/2">
      <h2 class="modal-title mb-4">Добавить предмет</h2>
      <form @submit.prevent="handleSubmit">
        <label class="flex-1">
          <span>Название предмета</span>
          <input
              v-model="formData.subjectName"
              type="text"
              class="modal-input"
              placeholder="Информатика"
              required
          />
        </label>
        <div class="flex gap-5 justify-between">
          <label class="flex-1">
            <span>Кол-во вопросов</span>
            <input
                v-model.number="formData.countQuestionInTest"
                type="number"
                class="modal-input"
                placeholder="Количество вопросов в тесте"
                min="3"
                required
            />
          </label>
          <label class="flex-1">
            <span>Время на тест</span>
            <input
                v-model.number="formData.time"
                type="number"
                class="modal-input"
                placeholder="Время на тест (минуты)"
                min="3"
                required
            />
          </label>
        </div>

        <div class="flex justify-between gap-10">
          <label>
            <span>Язык пердмета</span>
            <select v-model="formData.kgLanguage" class="modal-input">
              <option :value="true">Кыргызский язык</option>
              <option :value="false">Русский язык</option>
            </select>
          </label>
          <div class="flex justify-end items-center gap-4">
            <button
                type="button"
                @click="() => close()"
                class="modal-button modal-button-cancel"
            >
              Отмена
            </button>
            <button type="submit" class="modal-button modal-button-submit">
              Добавить
            </button>
          </div>
        </div>

      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SubjectPostReq } from "../../../features/admin/TestConstructor/type.js";

// Убедитесь, что initialData передается правильно через пропсы
const props = defineProps<{
  initialData: SubjectPostReq;
  close: () => void;
}>();

const emit = defineEmits<{
  (event: "close"): void;
  (event: "submit", data: SubjectPostReq): void;
}>();

import { ref } from "vue";

// Создание реактивной копии initialData
const formData = ref({ ...props.initialData });

const handleSubmit = () => {
  emit("submit", formData.value);
};

// const handleClose = () => {
//   emit("close");
// };
</script>

<style scoped>
.modal-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #291a40;
}

.modal-input {
  border: 1px solid #ddd;
  padding: 0.3rem 1rem;
  border-radius: 0.5rem;
  width: 100%;
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.modal-button {
  height: min-content;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: background-color 0.3s;
}

.modal-button-cancel {
  background-color: #f5f5f5;
  color: #333;
}

.modal-button-cancel:hover {
  background-color: #e0e0e0;
}

.modal-button-submit {
  background-color: #3c3846;
  color: #fff;
}

.modal-button-submit:hover {
  background-color: #575263;
}
</style>
  