<script lang="ts">
import { useI18n } from "vue-i18n";
import { computed, onMounted, ref, nextTick } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default {
  name: "ReadingComponent",
  setup() {
    const { t } = useI18n();

    const readingList = computed(() => [
      { icon: "icon-one", text: t("HowItWorks.description") },
      { icon: "icon-two", text: t("HowItWorks.description2") },
      { icon: "icon-three", text: t("HowItWorks.description3") }
    ]);

    // Явно указываем тип ref
    const cardsRef = ref<HTMLDivElement | null>(null);
    const donutRef = ref<HTMLDivElement | null>(null);

    onMounted(async () => {
      gsap.registerPlugin(ScrollTrigger);

      await nextTick(); // Ждём, пока Vue обновит DOM

      if (cardsRef.value) {
        gsap.from(cardsRef.value.children as HTMLCollection, { // 👈 Добавили явное указание типа
          opacity: 0,
          y: 50,
          stagger: 0.2,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardsRef.value,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }

      if (donutRef.value) {
        gsap.from(donutRef.value, {
          opacity: 0,
          x: -50,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: donutRef.value,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });
      }
    });

    return { readingList, cardsRef, donutRef };
  },
};

</script>

<template>
  <div class="relative">
    <div class="w-10/12 mx-auto py-20 flex flex-col gap-10">
      <h1 class="text-gradient text-[20px] md:text-[36px] font-bold text-center">{{ $t("HowItWorks.title") }}</h1>
      <div ref="cardsRef" class="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-10 py-5 px-5 md:px-32">
        <div
          v-for="(item, index) in readingList" :key="index"
          class="border-2 border-[#32183b] rounded-xl flex flex-col gap-5 items-center p-5"
        >
          <div class="bg-lime-500 rounded-full w-12 h-12 md:w-16 md:h-16 flex justify-center items-center">
            <img :src="'/assets/svg/' + item.icon + '.svg'" alt="icon" class="w-8 h-8 md:w-10 md:h-10">
          </div>
          <p class="text-white text-base md:text-xl font-normal text-center">{{ item.text }}</p>
        </div>
      </div>
    </div>

    <div ref="donutRef" class="absolute -left-10 -bottom-10 w-1/2">
      <img src="/assets/image/half-donut.png" alt="half-donut">
    </div>
  </div>
</template>


