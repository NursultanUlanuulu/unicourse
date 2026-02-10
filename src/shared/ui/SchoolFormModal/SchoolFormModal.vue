<template>
    <div v-if="isVisible" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-lg p-6 w-1/3">
        <h2 class="text-lg font-bold text-gray-800 mb-4">{{ title }}</h2>
        <form @submit.prevent="handleSubmit">
          <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-700 mb-2">Название школы</label>
            <input
              id="name"
              v-model="schoolData.name"
              type="text"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Введите название школы"
              required
            />
          </div>
          <div class="mb-4">
            <label for="district" class="block text-sm font-medium text-gray-700 mb-2">Район</label>
            <input
              id="district"
              v-model="schoolData.district"
              type="text"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Введите район"
              required
            />
          </div>
          <div class="flex justify-end gap-4">
            <button @click="cancel" type="button" class="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400">
              Отмена
            </button>
            <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "SchoolFormModal",
    props: {
      isVisible: {
        type: Boolean,
        required: true,
      },
      title: {
        type: String,
        default: "Форма школы",
      },
      initialData: {
        type: Object,
        default: () => ({ name: "", district: "" }),
      },
    },
    emits: ["submit", "cancel"],
    data() {
      return {
        schoolData: { ...this.initialData },
      };
    },
    watch: {
      initialData: {
        handler(newData) {
          this.schoolData = { ...newData };
        },
        deep: true,
        immediate: true,
      },
    },
    methods: {
      handleSubmit() {
        this.$emit("submit", this.schoolData);
      },
      cancel() {
        this.$emit("cancel");
      },
    },
  };
  </script>