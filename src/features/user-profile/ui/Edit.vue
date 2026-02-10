<script lang="ts">
import Avatar from "../../../shared/ui/image-ui/Avatar.vue"
import {useUserProfileStore} from "../user-profile.service";
import {TokenService} from "../../../utils/token.service";
import {computed, onMounted, ref, toRaw, unref, watchEffect} from "vue";
import type {PropType} from "vue";

export default {
  components: {
    Avatar
  },
  props: {
    handleChange: {
      type: Function as PropType<(event: MouseEvent) => void>,
      required: true
    }
  },
  setup(props) {
    const userProfileStore = useUserProfileStore()
    const selectedFile = ref<File | null>(null);

    const school = computed(() => {
      return userProfileStore.schoolsList.find(
          (x) => x.name === userProfileStore.userProfile?.schoolName
      );
    })

    const userData = ref({
      image: "",
      name: "",
      age: 0,
      schoolId: 0,
      phoneNumber: "",
    });

    watchEffect(() => {
      userData.value.image = unref(userProfileStore.userProfile?.image) || "";
      userData.value.name = unref(userProfileStore.userProfile?.name) || "";
      userData.value.age = unref(userProfileStore.userProfile?.age) || 0;
      userData.value.schoolId = unref(school.value?.id) || 0;
      userData.value.phoneNumber = unref(userProfileStore.userProfile?.phoneNumber) || "";
    });

    const handleUpdate = async () => {
      const userId = TokenService.getIdToken();
      if (userId) {
        await userProfileStore.updateUserProfile(toRaw(userData.value), Number(userId));
        props.handleChange({} as MouseEvent)
      }
    }


    const handleChangeImage = (e: any) => {
      if (e.target?.files?.[0]) {
        selectedFile.value = e.target.files[0];
        userData.value.image = e.target.files[0];
      }
    };

    // Загружаем данные при монтировании компонента
    onMounted(() => {
      userProfileStore.fetchProfile();
    });

    return {
      selectedFile,
      handleUpdate,
      handleChangeImage,
      userData,
      userProfileStore
    }
  }
}
</script>

<template>
  <form
      class="flex flex-col pt-2 items-center"
      @submit.prevent="handleUpdate"
  >
    <div class="flex flex-col items-center px-4 gap-1">
      <Avatar :name="userData.name" :size="100" :text-size="70" :photoUrl="userData.image"/>
      <label
          class="text-lg text-[#007aff] font-medium cursor-pointer"
      >
        <input type="file" hidden @change="handleChangeImage"/>
        {{ $t('userMainPage.personalData.changeImage') }}
      </label>
    </div>

    <div class="flex flex-col items-center gap-1 sm:p-1 p-5 w-full">
      <h1 class="text-xl text-center text-white">{{ $t('userMainPage.personalData.personalDataLabel') }}</h1>
      <label class="flex flex-col sm:w-10/12 md:w-8/12 w-4/5">
        <span class="text-zinc-500 font-semibold">
          {{ $t('userMainPage.personalData.fullName') }}
        </span>
        <input
            v-model="userData.name"
            id="name"
            type="text"
            class="border border-gray-300 rounded-lg px-4 py-2 outline-none transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm hover:shadow-md"
        />
      </label>

      <label class="flex flex-col sm:w-10/12 md:w-8/12 w-4/5">
        <span class="text-zinc-500 font-semibold">
          {{ $t('userMainPage.personalData.age') }}
        </span>
        <input
            v-model="userData.age"
            id="age"
            type="number"
            class="border border-gray-300 rounded-lg px-4 py-2 outline-none transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm hover:shadow-md"
        />
      </label>

      <label class="flex flex-col sm:w-10/12 md:w-8/12 w-4/5">
        <span class="text-zinc-500 font-semibold">{{ $t('userMainPage.personalData.school') }}</span>
        <select
            v-model="userData.schoolId"
            id="school"
            class="border border-gray-300 rounded-lg px-4 py-2 outline-none transition-all duration-200
           focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm hover:shadow-md"
        >
          <option :value="null" disabled>(нет школы)</option>
          <option v-for="school in userProfileStore.schoolsList" :key="school.id" :value="school.id">
            {{ school.name }}
          </option>
        </select>
      </label>

      <label class="flex flex-col sm:w-10/12 md:w-8/12 w-4/5">
        <span class="text-zinc-500 font-semibold">
          {{ $t('userMainPage.personalData.phoneNumber') }}
        </span>
        <input
            v-model="userData.phoneNumber"
            id="phone_number"
            type="text"
            placeholder="+996 (700) 000 000"
            class="border border-gray-300 rounded-lg px-4 py-2 outline-none transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm hover:shadow-md"
        />
      </label>
    </div>

    <div class="flex w-full justify-center gap-10 p-5">
      <button
          type="submit"
          class="bg-[#407bff] w-2/4 md:w-1/3 text-white px-5 py-2 rounded-lg shadow-[0px_3px_3px_0px_rgba(0,0,0,0.25)] hover:bg-blue-600 flex justify-center items-center">
        {{ $t('userMainPage.userActions.save') }}
      </button>

      <button type="button"
              class="bg-[#407bff] w-2/4 md:w-1/3 text-white px-5 py-2 rounded-lg shadow-[0px_3px_3px_0px_rgba(0,0,0,0.25)] hover:bg-blue-600"
              @click="handleChange">
        {{ $t('userMainPage.userActions.back') }}
      </button>
    </div>
  </form>
</template>