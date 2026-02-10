<template>
    <div v-if="isVisible" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-lg p-6 w-1/3">
        <h2 class="text-lg font-bold text-gray-800 mb-4">{{ title }}</h2>
        <p class="text-gray-600 mb-6">{{ message }}</p>
        <div class="flex justify-end gap-4">
          <button @click="cancel" class="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400">
            Отмена
          </button>
          <button @click="confirm" class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
            Удалить
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ModalConfirm",
    props: {
      isVisible: {
        type: Boolean,
        required: true,
      },
      title: {
        type: String,
        default: "Подтверждение",
      },
      message: {
        type: String,
        required: true,
      },
    },
    emits: ["confirm", "cancel"],
    methods: {
      confirm() {
        this.$emit("confirm");
      },
      cancel() {
        this.$emit("cancel");
      },
    },
  };
  </script>
  
  <style>
  </style>
  