<script setup lang="ts">
import AuthWrapper from "../../../components/auth-wrapper/AuthWrapper.vue";
import {useRouter} from "vue-router";
import {ref} from "vue";
import {AuthService} from "../auth.service";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const authService = new AuthService()
const router = useRouter();
const {email} = router.options.history.state

const code = ref()

const onSubmit = (event: Event) => {
  event.preventDefault()
  console.log(email, code.value)
  authService.sendCode({email:String(email), code: code.value})
}

</script>

<template>
  <AuthWrapper>
    <form
        @submit="onSubmit"
        class="flex flex-col gap-5 text-white items-center bg-[#32183b] rounded-3xl p-10 sm:p-10 w-full sm:w-3/4 md:w-1/2 lg:w-1/3"
    >
      <div class="w-full text-start flex items-center gap-2 text-2xl" @click="router.push('/auth/sign-in')">
        <img src="/assets/icon/backArrowIcon.svg" alt="backArrow" width="32" height="32"
             class="hover:scale-110 transition duration-150"/>
        {{ t('resetPasswordConfirmation.title')}}
      </div>

      <div>
        <p class="text-center">{{ t('resetPasswordConfirmation.message')}}</p>
        <p class="text-center">{{ email }}</p>
      </div>

      <label class="flex flex-col gap-2 font-semibold w-full">
        <span class="text-[#616161]">{{ t('resetPasswordConfirmation.codeLabel')}}</span>
        <input
            v-model="code"
            type="number"
            :placeholder="t('resetPasswordConfirmation.codePlaceholder')"
            class="py-2 px-5 rounded-lg bg-transparent border border-violet-500"
        >
      </label>

      <button type="submit" class="w-full bg-lime-500 text-[#32183b] font-bold text-xl py-3 rounded-lg">
        {{ t('resetPasswordConfirmation.resetButton')}}
      </button>
    </form>
  </AuthWrapper>
</template>
