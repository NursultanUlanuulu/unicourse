<script lang="ts">
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { onMounted, ref } from "vue";
import gsap from "gsap";

export default {
  name: "HeaderComponent",
  setup() {
    const router = useRouter();
    const { locale } = useI18n();
    const headerRef = ref(null);
    const buttonRef = ref(null);
    const selectRef = ref(null);

    // При загрузке страницы — загружаем язык из LocalStorage
    onMounted(() => {
      const savedLang = localStorage.getItem("lang");
      if (savedLang) locale.value = savedLang;

      // GSAP анимация появления шапки
      gsap.from(headerRef.value, {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      });

      // Анимация кнопки входа
      gsap.from(buttonRef.value, {
        scale: 0.5,
        opacity: 0,
        duration: 0.8,
        delay: 0.5,
        ease: "back.out(1.7)",
      });

      // Анимация выбора языка
      gsap.from(selectRef.value, {
        opacity: 0,
        scale: 0.5,
        duration: 0.8,
        delay: 0.7,
        ease: "back.out(1.7)",
      });
    });

    function navigateToSignIn() {
      router.push("/auth/sign-in");
    }

    function changeLanguage(event: Event) {
      const target = event.target as HTMLSelectElement;
      locale.value = target.value;
      localStorage.setItem("lang", target.value);

      // GSAP анимация при смене языка
      gsap.fromTo(
        selectRef.value,
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
      );
    }

    return {
      navigateToSignIn,
      changeLanguage,
      locale,
      headerRef,
      buttonRef,
      selectRef,
    };
  },
};
</script>

<template>
  <header ref="headerRef" class="w-[90%] md:w[80%] absolute mt-[20px] rounded-2xl bg-[#151515] flex justify-between items-center z-10 header">
    <h2 className="text-[20px] md:text-[30px] text-[#89b734] font-[900]">UNIKURS.KG</h2>
    <span class="text-white hidden md:flex"></span>
    <div class="btn-box">
      <select ref="selectRef" v-model="locale" @change="changeLanguage">
        <option value="ky">🇰🇬 Кырг</option>
        <option value="ru">🇷🇺 Русс</option>
      </select>
      <button ref="buttonRef" @click="navigateToSignIn">{{ $t("buttonEnter") }}</button>
    </div>
  </header>
</template>


<style scoped>
.header {
  position: absolute;
  margin-top: 20px;
  /* width: 80%; */
  border-radius: 0 15px 15px 0;
  background-color: rgba(21, 21, 21, 0.9);
  display: flex;
  justify-content: space-between;
  /* padding: 0 100px; */
  align-items: center;
  z-index: 10;
}
.header .btn-box {
  display: flex;
  gap: 20px;
  background-color: transparent;
}

.header .btn-box > select,
.header .btn-box > button {
  border: 1px solid var(--primary-color);
  padding: 5px 12px;
  border-radius: 5px;
  color: var(--primary-color);
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
}

.header .btn-box > button:hover {
  background-color: var(--primary-color);
  color: white;
}

.header .btn-box > select {
  cursor: pointer;
}
</style>