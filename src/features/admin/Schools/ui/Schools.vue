<script>
import { computed, onMounted, ref } from 'vue';
import { useSchoolsStore } from '../model/store';
import ModalConfirm from '../../../../shared/ui/modalConfirm/ModalConfirm.vue';
import SchoolFormModal from '../../../../shared/ui/SchoolFormModal/SchoolFormModal.vue';

export default {
  name: "Schools",
  components: { ModalConfirm, SchoolFormModal },
  setup() {
    const schoolsStore = useSchoolsStore();
    const showModal = ref(false);
    const showFormModal = ref(false);
    const modalTitle = ref("");
    const modalMessage = ref("");
    const selectedSchoolId = ref(null);
    const actionType = ref("");
    const formTitle = ref("");
    const search = ref('');
    const formInitialData = ref({});

    const handleConfirm = async () => {
      if (actionType.value === "delete") {
        try {
          await schoolsStore.deleteSchool(selectedSchoolId.value);
        } catch (error) {
          console.error("Ошибка при удалении школы:", error);
        }
      }
      showModal.value = false;
      selectedSchoolId.value = null;
    };

    const handleFormSubmit = async (schoolData) => {
      if (actionType.value === "edit") {
        try {
          await schoolsStore.putSchool({ ...schoolData, id: selectedSchoolId.value });
        } catch (error) {
          console.error("Ошибка при изменении школы:", error);
        }
      } else if (actionType.value === "add") {
        try {
          await schoolsStore.postSchool(schoolData);
        } catch (error) {
          console.error("Ошибка при добавлении школы:", error);
        }
      }
      showFormModal.value = false;
      selectedSchoolId.value = null;
    };
    const filteredSchools = computed(() => {
      return schoolsStore.schools.filter(school => {
        const searchTerm = search.value.toLowerCase();
        return (
          school.name.toLowerCase().includes(searchTerm) ||
          school.district.toLowerCase().includes(searchTerm) ||
          (school.schoolResponse?.name?.toLowerCase().includes(searchTerm) || '')
        );
      });
    });


    const requestAdd = () => {
      formTitle.value = "Добавить школу";
      formInitialData.value = { name: "", district: "" };
      actionType.value = "add";
      showFormModal.value = true;
    };

    const requestEdit = (school) => {
      formTitle.value = "Изменить школу";
      formInitialData.value = { name: school.name, district: school.district };
      selectedSchoolId.value = school.id;
      actionType.value = "edit";
      showFormModal.value = true;
    };

    const requestDelete = (schoolId) => {
      selectedSchoolId.value = schoolId;
      modalTitle.value = "Удаление школы";
      modalMessage.value = "Вы уверены, что хотите удалить эту школу?";
      actionType.value = "delete";
      showModal.value = true;
    };

    onMounted(() => {
      schoolsStore.getSchools();
    });

    return {
      schools: schoolsStore.schools,
      showModal,
      showFormModal,
      modalTitle,
      modalMessage,
      formTitle,
      formInitialData,
      search,
      filteredSchools,
      handleConfirm,
      handleFormSubmit,
      requestAdd,
      requestEdit,
      requestDelete,
    };
  },
};
</script>

<template>
  <div class="container mx-auto">
    <div class="flex items-center justify-between">
      <div class="flex items-center bg-white w-1/3 py-1 px-4 rounded-xl shadow-md">
        <input
          v-model="search"
          class="w-full px-3 py-2 border-none focus:outline-none rounded-lg text-gray-700"
          type="text"
          placeholder="Поиск"
        />
        <img class="ml-3 w-5 h-5" src="/assets/svg/search.svg" alt="search" />
      </div>
      <button @click="requestAdd" class="text-white py-3 px-4 border border-white rounded-xl hover:bg-[#575263]">
        + Добавить Школу
      </button>
    </div>

    <div class="mt-6 bg-white rounded-xl shadow-lg overflow-hidden">
      <div class="flex justify-between bg-gray-100 px-6 py-4 font-semibold text-gray-600">
        <p class="w-1/3 truncate">Школы</p>
        <p class="w-1/3 truncate">Районы</p>
        <p class="w-1/3 text-center">Действия</p>
      </div>

      <div class="h-[63vh] overflow-y-scroll">
        <div
          v-for="school in filteredSchools"
          :key="school.id"
          class="flex justify-between items-center px-6 py-4 border-b border-gray-200 hover:bg-gray-50 text-lg"
        >
          <p class="w-1/3 text-gray-700">{{ school.name }}</p>
          <p class="w-1/3 text-gray-700">{{ school.district }}</p>
          <div class="w-1/3 flex justify-center gap-2">
            <button @click="requestEdit(school)" class="p-2 bg-blue-100 hover:bg-blue-200 rounded-full">
              <img class="w-5 h-5" src="/assets/svg/edit.svg" alt="edit" />
            </button>
            <button @click="requestDelete(school.id)" class="p-2 bg-red-100 hover:bg-red-200 rounded-full">
              <img class="w-5 h-5" src="/assets/svg/delete.svg" alt="delete" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <ModalConfirm
      :isVisible="showModal"
      :title="modalTitle"
      :message="modalMessage"
      @confirm="handleConfirm"
      @cancel="showModal = false"
    />

    <SchoolFormModal
      :isVisible="showFormModal"
      :title="formTitle"
      :initialData="formInitialData"
      @submit="handleFormSubmit"
      @cancel="showFormModal = false"
    />
  </div>
</template>
