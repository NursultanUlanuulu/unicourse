<script lang="ts">
import { useI18n } from "vue-i18n";
import { computed, onMounted, ref } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default {
  name: "ReasonComponent",
  setup() {
    const { t } = useI18n();

    const reasonArray = computed(() => [
      { id: 1, title: t("ai.title"), text: t("ai.description") },
      { id: 2, title: t("unikal.title"), text: t("unikal.description") },
      { id: 3, title: t("real.title"), text: t("real.description") },
      { id: 4, title: t("support.title"), text: t("support.description") }
    ]);

    const reasonRefs = ref([]);
    const titleRef = ref(null);

    onMounted(() => {
      gsap.registerPlugin(ScrollTrigger);

      // Анимация заголовка
      gsap.from(titleRef.value, {
        opacity: 0,
        y: -20,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: titleRef.value,
          start: "top 90%",
        },
      });

      // Анимация карточек
      reasonRefs.value.forEach((el, index) => {
        gsap.from(el, {
          opacity: 0,
          x: -50,
          scale: 0.95,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          delay: index * 0.2, // Поочередное появление карточек
        });
      });
    });

    return { reasonArray, reasonRefs, titleRef };
  }
};
</script>

<template>
  <div class="w-10/12 mx-auto flex flex-col gap-10 py-10">
    <h1 ref="titleRef" class="text-2xl md:text-4xl text-gradient text-center">{{ $t("whyChoseUs.title") }}</h1>

    <div class="grid grid-cols-1 gap-5 px-5 md:px-20">
      <div
        v-for="(reason) in reasonArray" :key="reason.id"
        ref="reasonRefs"
        class="grid grid-cols-1 md:grid-cols-[30%_10%_60%] bg-[#32183b] relative items-center p-5 md:pl-20 md:px-10 md:py-7 text-white rounded-xl"
      >
        <h5 class="text-lg md:text-2xl font-bold text-center md:text-left">
          {{ reason.title }}
        </h5>
        <span class="hidden md:block h-2/3 bg-white w-[2px] mx-auto"/>
        <p class="text-[14px] md:text-2xl font-normal text-center md:text-left">{{ reason.text }}</p>
        <span 
          class="w-12 h-12 md:w-16 md:h-16 flex justify-center items-center absolute top-1/2 transform -translate-y-1/2 -left-5 md:-left-8 bg-lime-500 rounded-full text-black font-bold text-lg md:text-[30px]"
        >
          {{ reason.id }}
        </span>
      </div>
    </div>
  </div>
</template>

