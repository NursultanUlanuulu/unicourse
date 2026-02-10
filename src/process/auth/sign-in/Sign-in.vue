<script setup lang="ts">
import AuthWrapper from "../../../components/auth-wrapper/AuthWrapper.vue";
import {ref} from "vue";
import {AuthService} from "../auth.service";
import emitter from "../../../utils/eventBus";

const loading = ref<boolean>(false);
const email = ref('')
const password = ref('')
const authService = new AuthService();

const visible = ref(false);
const handleVisible = () => {
  visible.value = !visible.value;
}


const handleSubmit = async (event: Event) => {
  event.preventDefault();
  loading.value = true
  try {
    const signInData = {email: email.value, password: password.value};
    await authService.login(signInData);
    emitter.emit('show-toast', {message: 'Вы успешно вошли в систему', type: 'success'});
  } catch (error: any ) {
    console.error(error);
    if (error.status === 401) {
      emitter.emit('show-toast', {message: "Неправильный пароль или логин", type: 'error'});
    } else {
      emitter.emit('show-toast', {message: 'Произошла ошибка с сервером', type: 'error'});
    }
  } finally {
    loading.value = false
  }
}

</script>


<template>
  <AuthWrapper>
    <form
      @submit="handleSubmit"
      class="flex flex-col gap-5 items-center bg-[#32183b] rounded-3xl p-6 sm:p-10 w-full sm:w-3/4 md:w-1/2 lg:w-1/3"
    >
      <h1 class="text-gradient text-2xl sm:text-3xl font-semibold">
        Авторизация
      </h1>

      <label class="flex flex-col gap-2 font-semibold w-full">
        <span class="text-[#616161]">{{ $t("authPage.email")}}</span>
        <input
          v-model="email"
          type="email"
          placeholder="e-mail"
          class="py-2 px-5 rounded-lg w-full"
          required
        />
      </label>

      <label class="relative flex flex-col gap-2 font-semibold w-full">
        <span class="text-[#616161]">{{ $t("authPage.password")}}</span>
        <input
          v-model="password"
          :type="visible ? 'text' : 'password'"
          placeholder="password"
          class="py-2 px-5 rounded-lg w-full"
          required
        />
        <span class="absolute top-10 right-3 cursor-pointer">
          <img v-if="visible" @click="handleVisible" src="/assets/icon/visible-eye.svg" alt="visible">
          <img v-if="!visible" @click="handleVisible" src="/assets/icon/invisible-eye.svg" alt="visible">
        </span>
      </label>

      <div class="w-full text-end">
        <p class="text-white text-sm sm:text-base">
          {{ $t("authPage.noAccount")}}
          <router-link class="text-blue-600" to="/auth/sign-up">{{$t("authPage.register")}}</router-link>
        </p>
      </div>

      <div class="flex flex-col gap-2 w-full items-end">
        <button type="submit" class="w-full bg-lime-500 text-white font-bold text-lg py-2 rounded-lg">
          {{ loading ? 'Загрузка...' : $t("authPage.login") }}
        </button>
        <router-link class="text-blue-600 text-sm sm:text-base" to="/auth/forgot-password">
          {{ $t("authPage.forgotPassword")}}
        </router-link>
      </div>
    </form>
  </AuthWrapper>
</template>
