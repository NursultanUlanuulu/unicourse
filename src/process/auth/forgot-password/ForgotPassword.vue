<script setup lang="ts">

import AuthWrapper from "../../../components/auth-wrapper/AuthWrapper.vue";
import {useRouter} from "vue-router";
import {ref} from "vue";
import {AuthService} from "../auth.service";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const authService = new AuthService()
const router = useRouter();

const email = ref()

const onSubmit = (event: Event) => {
  event.preventDefault()
  authService.sendEmail(email.value)
}

</script>

<template>
  <AuthWrapper>
      <form
          @submit="onSubmit"
          class="flex flex-col gap-5 text-white items-center bg-[#32183b] rounded-3xl p-10 sm:p-10 w-full sm:w-3/4 md:w-1/2 lg:w-1/3"
      >
        <div class="w-full text-start flex items-center gap-2 text-2xl" @click="router.back()">
          <img src="/assets/icon/backArrowIcon.svg" alt="backArrow" width="32" height="32" class="hover:scale-110 transition duration-150" />
          {{t("forgotPasswordPage.title")}}}
        </div>
        <p>{{t("forgotPasswordPage.description")}}}</p>

        <label class="flex flex-col gap-2 font-semibold w-full">
          <span class="text-[#616161]">{{t("forgotPasswordPage.emailLabel")}}}</span>
          <input
              v-model="email"
              type="email"
              :placeholder="t('forgotPasswordPage.emailPlaceholder')"
              class="py-2 px-5 rounded-lg bg-transparent border border-violet-500"
          >
        </label>

        <button type="submit" class="w-full bg-lime-500 text-white font-bold text-xl py-3 rounded-lg">
          {{ t('forgotPasswordPage.resetButton') }}
        </button>
    </form>
  </AuthWrapper>
</template>

<style scoped>

</style>