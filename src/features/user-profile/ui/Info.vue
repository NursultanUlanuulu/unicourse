<script lang="ts">
import {ref} from "vue";
import {onMounted} from "vue";
import Avatar from "../../../shared/ui/image-ui/Avatar.vue";
import {useUserProfileStore} from "../user-profile.service";
import ModalLogout from "../../../shared/ui/modalSideBar/ModalLogout.vue";
import type {PropType} from "vue";
import {useRouter} from "vue-router";

export default {
  components: {Avatar, ModalLogout},
  props: {
    handleChange: {
      type: Function as PropType<(event: MouseEvent) => void>,
      required: true
    }
  },
  setup() {
    const router = useRouter()
    const userProfileStore = useUserProfileStore();
    const open = ref(false);
    const formatter = new Intl.DateTimeFormat("ky-KG", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    })

    onMounted(() => {
      userProfileStore.fetchUserProfile();
    })

    const handleLogout = () => {
      open.value = true;
    };
    return {
      userProfileStore, formatter, open, handleLogout, router
    }
  }
}
</script>

<template>
  <div class="flex flex-col justify-between">
    <div class="grid grid-cols-3 justify-center">
      <div></div>
      <div class="flex flex-col items-center p-5 gap-3">
        <Avatar :name="userProfileStore.userProfile?.name" :size="100" :text-size="70"
                :photoUrl="userProfileStore.userProfile?.image"/>
        <h5 class="text-md text-white md:text-xl font-semibold text-center">
          {{ userProfileStore.userProfile?.name }}
        </h5>
      </div>
    </div>
    <h1 class="text-md text-white font-semibold md:text-xl text-center -mb-5">
      {{ $t('userMainPage.personalData.personalDataLabel')}}
    </h1>

    <div class="flex flex-col items-start sm:p-2 sm:py-5 p-5 sm:text-[14px]">
      <div class="flex flex-col sm:flex-row sm:gap-5 sm:items-center gap-1 border-b-2 w-full py-2 px-1 sm:px-10">
        <span class="text-white font-medium text-nowrap">{{ $t('userMainPage.personalData.fullName')}}:</span>
        <p class="text-[14px] text-white font-medium">{{ userProfileStore.userProfile?.name || "ФИО не указана" }}</p>
      </div>
      <div class="flex flex-col sm:flex-row sm:gap-5 sm:items-center gap-1 border-b-2 w-full py-2 px-1 sm:px-10">
          <span class="text-white font-medium text-nowrap">
            {{ $t('userMainPage.personalData.age')}} :
          </span>
        <p class="text-[14px] text-white font-medium">
          {{ userProfileStore.userProfile?.age || "возраст не указан" }}
        </p>
      </div>
      <div class="flex flex-col sm:flex-row sm:gap-5 sm:items-center gap-1 border-b-2 w-full py-2 px-1 sm:px-10">
        <span class="text-white font-medium text-nowrap">{{ $t('userMainPage.personalData.school')}} :</span>
        <p class="text-[14px] text-white font-medium">
          {{ userProfileStore.userProfile?.schoolName || "школа не указана" }}
        </p>
      </div>
      <div class="flex flex-col sm:flex-row sm:gap-5 sm:items-center gap-1 border-b-2 w-full py-2 px-1 sm:px-10">
        <span class="text-white font-medium text-nowrap">{{ $t('userMainPage.personalData.phoneNumber')}} :</span>
        <p class="text-[14px] text-white font-medium">
          {{ userProfileStore.userProfile?.phoneNumber || "номер не указан" }}
        </p>
      </div>
      <!-- <div class="flex flex-col sm:flex-row sm:gap-5 sm:items-center gap-1 border-b-2 w-full py-2 px-1 sm:px-10">
          <span class="text-white font-medium text-nowrap">
            Оканчание подписки :
          </span>
        <p class="text-[14px] text-white font-medium">
          {{ userProfileStore.userProfile?.endDate ? formatter.format(new Date(userProfileStore.userProfile?.endDate)) : "Нет подписки" }}
        </p>
      </div> -->
    </div>
    <div class="flex flex-col items-center gap-3 md:flex-row md:m-4 md:justify-between md:items-center">
      <div
          @click="handleLogout"
          class="flex justify-center items-center w-[230px] bg-slate-300 rounded-lg text-sm md:text-md h-[30px] md:h-[40px] cursor-pointer"
      >
        <div>
        </div>
        <p>{{$t('userMainPage.userActions.logout')}}</p>
      </div>
      <button
          class="bg-[#407bff] text-white w-[230px] px-5 h-[30px] text-sm md:text-md md:h-[40px] rounded-lg shadow-[0px_3px_3px_0px_rgba(0,0,0,0.25)] hover:bg-blue-600"
          @click="handleChange"
      >
        {{$t('userMainPage.userActions.edit')}}
      </button>
    </div>
    <ModalLogout v-if="open" @close="open = false"/>
  </div>
</template>
