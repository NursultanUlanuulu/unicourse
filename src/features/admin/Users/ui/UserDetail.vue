<template>
  <div v-if="user" class="container mx-auto p-6 bg-white rounded-xl shadow-lg">
    <div class="flex gap-5 border-b">
      <div>
        <img @click="goBack" class="cursor-pointer" src="/assets/svg/back.svg" alt="back"/>
      </div>
      <div class="flex items-center gap-6 pb-4 mb-6">
        <div class="w-24 h-24 rounded-full bg-gray-200 overflow-hidden">
          <img :src='imageRedirection(user.image)' alt="User Photo" class="w-full h-full object-cover"/>
        </div>
        <div class="flex-1">
          <h1 class="text-2xl font-semibold text-gray-800">{{ user.name }}</h1>
          <button class="mt-2 px-4 py-2 bg-[#1b3658] text-white text-sm font-medium rounded-lg hover:bg-[#334f71]"
                  @click="goTest">
            Результаты теста
          </button>
        </div>
      </div>
    </div>

    <div>Персональная информация</div>

    <div class="mt-5 flex flex-col justify-between">
      <div class="flex gap-5 w-full py-2 border-b border-gray-300">
        <p class="font-medium text-gray-500 text-[20px]">ФИО:</p>
        <p class="text-[#273138] text-[20px]">{{ user.name }}</p>
      </div>
      <div class="flex gap-5 w-full py-2 border-b border-gray-300">
        <p class="font-medium text-gray-600 text-[20px]">Почта:</p>
        <p class="text-[#273138] text-[20px]">{{ user.email }}</p>
      </div>
      <div class="flex gap-5 w-full py-2 border-b border-gray-300">
        <p class="font-medium text-gray-600 text-[20px]">Возраст:</p>
        <p class="text-[#273138] text-[20px]">{{ user.age }}</p>
      </div>
      <div class="flex gap-5 w-full py-2 border-b border-gray-300">
        <p class="font-medium text-gray-600 text-[20px]">Школа:</p>
        <p class="text-[#273138] text-[20px]">{{ user.schoolName || 'Не указано' }}</p>
      </div>
      <div class="flex gap-5 w-full py-2 border-b border-gray-300">
        <p class="font-medium text-gray-600 text-[20px]">Дата регистрации:</p>
        {{ new Date(user.dateRegister).toLocaleDateString('ky-KG') }}
      </div>
      <div class="flex gap-5 w-full py-2 border-b border-gray-300">
        <p class="font-medium text-gray-600 text-[20px]">Подписка:</p>
        <p class="text-[#273138] text-[20px]">{{ user.access ? 'Есть подписка' : 'Нет подписки' }}</p>
      </div>
    </div>
  </div>
  <div v-else class="text-center py-6">
    <p class="text-gray-500">Загрузка данных...</p>
  </div>
</template>


<script>
import {useRoute} from "vue-router";
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {useUsersStore} from "../model/store";
import {imageRedirection} from "../../../../utils/index.ts";

export default {
  name: "UserDetails",
  methods: {imageRedirection},
  setup() {
    const route = useRoute();
    const router = useRouter();
    const userId = Number(route.params.userId);
    const usersStore = useUsersStore();
    const user = ref(null);
    console.log(user)

    onMounted(async () => {
      try {
        user.value = await usersStore.getUserById(userId);
      } catch (error) {
        console.error("Ошибка при загрузке данных пользователя:", error);
      }
    });

    const goTest = () => {
      router.push({path: "/admin-panel/user/archive", state: {adminUserId: userId}});
    }

    const goBack = () => {
      router.back();
    }

    return {
      user,
      goBack,
      goTest
    };
  },
};
</script>

<style>
</style>
  