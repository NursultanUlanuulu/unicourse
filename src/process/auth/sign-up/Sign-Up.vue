<script setup lang="ts">
import AuthWrapper from "../../../components/auth-wrapper/AuthWrapper.vue";
import {computed, onMounted, reactive, ref} from "vue";
import {AuthService} from "../auth.service";
import {useSchoolsStore} from "../../../features/admin/Schools/model/store.js";
import type {SchoolReq} from "../../../features/admin/Users/type.js";

const useSchoolStore = useSchoolsStore()
const schoolId = ref(0)
const fullName = ref('')
const age = ref('')
const email = ref('')
const passwordOne = ref('')
const passwordTwo = ref('')

const errors = reactive<{
  [key: string]: string;
}>({
  fullName: '',
  age: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
});
const loading = ref(false);
const visible = ref(false);
const visibleConfirm = ref(false);

const handleVisible = () => {
  visible.value = !visible.value;
}

const handleVisibleConfirm = () => {
  visibleConfirm.value = !visibleConfirm.value;
}

const authService = new AuthService();

const handleSubmit = async (event: Event) => {
  loading.value = true;
  event.preventDefault();
  const userData = {
    schoolId: schoolId.value,
    email: email.value,
    fullName: fullName.value,
    age: Number(age.value),
    passwordOne: passwordOne.value,
    passwordTwo: passwordTwo.value
  }

  Object.keys(errors).forEach((key) => (errors[key] = ''));

  try {
    await authService.register(userData);
    console.log("Registration successful");
  } catch (error: any) {
    if (error.response && Array.isArray(error.response.data)) {
      const serverErrors = error.response.data;
      serverErrors.forEach((errorMessage: string) => {
        const [field, message] = errorMessage.split(':').map((s) => s.trim());
        if (field in errors) {
          errors[field as keyof typeof errors] = message;
        }
      });
    }
  }
  loading.value = false;
}

onMounted(() => {
  useSchoolStore.getSchools()
})

const search = ref("");
const vis = ref(false);

const focus = () => {
  vis.value = true
}

const inFocus = () => {
  // if (vis === false) {
  setTimeout(() => {
    vis.value = false
  }, 100)
  // }
}

const filteredOptions = computed(() =>
    useSchoolStore.schools.filter((option) =>
        option.name.toLowerCase().includes(search.value.toLowerCase())
    )
);

const setSearch = (school:SchoolReq) => {
  search.value = school.name
  schoolId.value = school.id
  vis.value = false
}

</script>


<template>
  <AuthWrapper>
    <form
        @submit="handleSubmit"
        class="flex flex-col gap-2 items-center bg-[#32183b] rounded-3xl p-6 sm:p-10 w-full sm:w-3/4 md:w-1/2 lg:w-1/3"
    >
      <h1 class="text-gradient text-2xl sm:text-3xl font-semibold">
        Регистрация
      </h1>

      <div class="relative w-full" @focusin="focus" @focusout="inFocus">
        <span class="text-[#616161]">{{ $t("authPage.school") }}</span>
        <input v-model="search" placeholder="Поиск..." class="py-2 px-5 rounded-lg w-full"/>
        <div v-if="vis"
             class="flex flex-col absolute bg-white w-full py-1 z-10 rounded-lg overflow-hidden overflow-y-scroll max-h-[40vh]">
          <button
              v-for="school in filteredOptions"
              :key="school.id"
              class="hover:bg-amber-100 px-2 py-1 cursor-pointer text-start"
              @click="setSearch(school)"
          >
            {{ school.name }}
          </button>
        </div>
      </div>

<!--      <label class="flex flex-col font-semibold w-full relative">-->
<!--        <span class="text-[#616161]">{{ $t("authPage.school") }}</span>-->
<!--        <select-->
<!--            v-model="schoolId"-->
<!--            class="py-2 px-5 rounded-lg w-full"-->
<!--        >-->
<!--          <option v-for="school in useSchoolStore.schools" :value="school.id">-->
<!--            {{ school.name }}-->
<!--          </option>-->
<!--        </select>-->
<!--      </label>-->

      <label class="flex flex-col font-semibold w-full relative">
        <span class="text-[#616161]">{{ $t("authPage.email") }}</span>
        <input
            v-model="email"
            type="email"
            placeholder="..."
            class="py-2 px-5 rounded-lg w-full"
            required
        />
        <p v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</p>
      </label>

      <label class="flex flex-col font-semibold w-full">
        <span class="text-[#616161]">{{ $t("authPage.fullName") }}</span>
        <input
            v-model="fullName"
            type="text"
            placeholder="..."
            class="py-2 px-5 rounded-lg w-full"
            required
        />
        <p v-if="errors.fullName" class="text-red-500 text-sm">{{ errors.fullName }}</p>
      </label>

      <label class="flex flex-col font-semibold w-full">
        <span class="text-[#616161]">{{ $t("authPage.age") }}</span>
        <input
            v-model="age"
            type="number"
            placeholder="..."
            class="py-2 px-5 rounded-lg w-full"
            required
        />
        <p v-if="errors.age" class="text-red-500 text-sm">{{ errors.age }}</p>
      </label>

      <label class="relative flex flex-col font-semibold w-full">
        <span class="text-[#616161]">{{ $t("authPage.password") }}</span>
        <input
            v-model="passwordOne"
            :type="visible ? 'text' : 'password'"
            placeholder="..."
            class="py-2 px-5 rounded-lg w-full"
            required
        />
        <span class="absolute top-9 right-3 cursor-pointer">
          <img v-if="visible" @click="handleVisible" src="/assets/icon/visible-eye.svg" alt="visible">
          <img v-if="!visible" @click="handleVisible" src="/assets/icon/invisible-eye.svg" alt="visible">
        </span>
        <p v-if="errors.passwordOne" class="text-red-500 text-sm">{{ errors.passwordOne }}</p>
      </label>

      <label class="relative flex flex-col font-semibold w-full">
        <span class="text-[#616161]">{{ $t("authPage.repeatPassword") }}</span>
        <input
            v-model="passwordTwo"
            :type="!visibleConfirm ? 'password' : 'text'"
            placeholder="..."
            class="py-2 px-5 rounded-lg w-full"
            required
        />
        <span class="absolute top-9 right-3 cursor-pointer">
          <img v-if="visibleConfirm" @click="handleVisibleConfirm" src="/assets/icon/visible-eye.svg" alt="visible">
          <img v-if="!visibleConfirm" @click="handleVisibleConfirm" src="/assets/icon/invisible-eye.svg" alt="visible">
        </span>
        <p v-if="errors.passwordTwo" class="text-red-500 text-sm">{{ errors.passwordTwo }}</p>
      </label>

      <div class="w-full text-end">
        <p class="text-white text-sm sm:text-base">
          {{ $t("authPage.haveAccount") }}
          <router-link class="text-blue-600" to="/auth/sign-in">{{ $t("authPage.login") }}</router-link>
        </p>
      </div>

      <button type="submit" class="w-full text-white bg-lime-500 font-bold text-lg py-2 rounded-lg">
        {{ loading ? "Загрузка..." : $t("authPage.register") }}
      </button>
    </form>
  </AuthWrapper>
</template>
