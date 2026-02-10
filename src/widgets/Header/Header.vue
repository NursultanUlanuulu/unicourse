<script lang="ts">
import {ref, onMounted} from 'vue';
import {useRouter} from 'vue-router';
import {useUserProfileStore} from '../../features/user-profile/user-profile.service';
import Avatar from "../../shared/ui/image-ui/Avatar.vue";
import {useI18n} from "vue-i18n";

export default {
  components: {Avatar},
  setup() {
    const userProfileStore = useUserProfileStore();
    const router = useRouter();
    const isMenuOpen = ref(false);
    const { locale } = useI18n();

    onMounted(() => {
      userProfileStore.fetchUserProfile();
      const savedLang = localStorage.getItem("lang");
      if (savedLang) locale.value = savedLang;
    });

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
    };

    const changeLanguage = (event: Event) => {
      const target = event.target as HTMLSelectElement;
      locale.value = target.value;
      localStorage.setItem("lang", target.value);
    }

    return {
      userProfileStore,
      router,
      isMenuOpen,
      toggleMenu,
      changeLanguage,
      locale,
    };
  }
};
</script>

<template>
  <header class="pt-5 px-5 ">
    <div class="flex justify-between bg-[#191519] rounded-md text-white py-2 px-10 relative">
      <h2 class="text-3xl font-semibold text-gradient cursor-pointer"
          @click="router.push('/user-panel')"
      >UNIKURS.kg</h2>

      <select ref="selectRef" class="select hidden sm:inline" v-model="locale" @change="changeLanguage">
        <option value="ky">🇰🇬 Кырг</option>
        <option value="ru">🇷🇺 Русс</option>
      </select>


      <!-- Бургер-иконка (только для мобильных экранов) -->
      <div class="sm:hidden flex items-center cursor-pointer" @click="toggleMenu">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"/>
        </svg>
      </div>

      <!-- Профиль (на больших экранах) -->
      <div class="hidden sm:flex items-center sm:gap-5 cursor-pointer"
           @click="router.push('/user-panel/profile')">
        <span class="sm:text-xl text-[12px] text-end">{{ userProfileStore.userProfile?.name }}</span>
        <div class="w-10 h-10 overflow-hidden rounded-full">
          <Avatar :name="userProfileStore.userProfile?.name" :photo-url="userProfileStore.userProfile?.image"
                  :text-size="35" :size="40"/>
        </div>
      </div>
    </div>

    <!-- Боковое меню (только на мобильных) -->
    <transition name="fade">
      <div v-if="isMenuOpen" class="fixed inset-0 bg-black bg-opacity-50 z-50" @click="toggleMenu"></div>
    </transition>

    <transition name="slide">
      <div v-if="isMenuOpen" class="fixed top-0 right-0 w-64 h-full bg-[#191519] text-white p-5 z-50">
        <button class="absolute top-4 left-4 text-white text-4xl hover:text-red-500" @click="toggleMenu">&times;
        </button>
        <div class="flex flex-col items-center gap-5 mt-10">
          <Avatar :name="userProfileStore.userProfile?.name" :photo-url="userProfileStore.userProfile?.image"
                  :text-size="35" :size="40"/>
          <span class="text-lg text-center">{{ userProfileStore.userProfile?.name }}</span>

          <div class="flex flex-col gap-5 w-full">
            <button class="py-2 font-semibold bg-white text-black rounded-lg hover:bg-lime-200 w-full"
                    @click="router.push('/user-panel/profile'); toggleMenu()">Профиль
            </button>
            <button class="py-2 font-semibold bg-white text-black rounded-lg hover:bg-lime-200 w-full"
                    @click="router.push('/user-panel/archive'); toggleMenu()">Архив
            </button>
            <select ref="selectRef" class="select" v-model="locale" @change="changeLanguage">
              <option value="ky">🇰🇬 Кырг</option>
              <option value="ru">🇷🇺 Русс</option>
            </select>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s ease-in-out;
}

.slide-enter {
  transform: translateX(100%);
}

.slide-leave-to {
  transform: translateX(100%);
}

.select {
  border: 1px solid var(--primary-color);
  padding: 5px 12px;
  border-radius: 5px;
  color: var(--primary-color);
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
}
</style>
