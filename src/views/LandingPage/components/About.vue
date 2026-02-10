<script lang="ts">
import { onMounted, ref, nextTick } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default {
  name: "AboutComponent",
  setup() {
    const list = ["adamUniversity.jpg"];

    // Указываем тип ref
    const containerRef = ref<HTMLDivElement | null>(null);
    const partnersRef = ref<HTMLDivElement | null>(null);
    const aboutRef = ref<HTMLDivElement | null>(null);
    const testingRef = ref<HTMLDivElement | null>(null);

    onMounted(async () => {
      gsap.registerPlugin(ScrollTrigger);
      await nextTick(); // Ждём обновления DOM перед запуском анимации

      // Анимация логотипов партнеров
      if (partnersRef.value) {
        gsap.from(Array.from(partnersRef.value.children), { // Используем Array.from()
          opacity: 0,
          scale: 0.5,
          stagger: 0.2,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: partnersRef.value,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      }

      // Анимация блока "О нас"
      if (aboutRef.value) {
        gsap.from(aboutRef.value, {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: aboutRef.value,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });
      }

      // Анимация тестов
      if (testingRef.value) {
        gsap.from(Array.from(testingRef.value.children), { // Используем Array.from()
          opacity: 0,
          x: (i) => (i % 2 === 0 ? -100 : 100),
          stagger: 0.3,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: testingRef.value,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      }
    });

    return { list, containerRef, partnersRef, aboutRef, testingRef };
  },
};
</script>


<template>
  <div ref="partnersRef" class="flex flex-col items-center md:gap-5 md:flex-row md:justify-center py-20 text-white">
    <div class="flex items-center" v-for="icon in list" :key="icon">
      <a href="https://adam.kg/ru/">
      <img class="w-[70px] md:w-[120px]" :src="`/${icon}`" alt="duolingo">
      </a>
    </div>
    <div class="flex items-center w-2/3 md:w-[420px] text-center text-[12px] md:text-[16px]">
      <p>
      {{$t("partner")}}
      </p>
    </div>
  </div>

  <div ref="aboutRef" class="text-white py-24 grid grid-cols-1 justify-items-center gap-y-44 gap-20 md:px-36 relative">
    <div class="flex flex-col gap-5 z-10">
      <h1 class="text-[20px] md:text-3xl text-gradient w-[150px]">{{ $t('aboutUs') }}</h1>
      <p class="text-[16px] md:text-[24px] px-10"><b class="text-lime-400">Unikurs.kg</b> {{ $t('platform') }}</p>
    </div>

    <div class="flex flex-col gap-10 z-10">
      <div ref="aboutRef" class="flex flex-col gap-10">
        <h1 class="text-[20px] md:text-3xl text-gradient w-[300px]">{{ $t('testing.title') }}</h1>
        <p class="text-[16px] md:text-[24px] text-center">{{ $t('testing.description') }}</p>
      </div>

      <div class="flex justify-between items-center px-2 sm:px-0">
        <ul ref="testingRef" class="flex flex-col gap-3 text-xl">
          <li class="flex items-center gap-5">
            <svg class="w-12 md:w-20" viewBox="0 0 69 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M68.7105 8.20711C69.101 7.81658 69.101 7.18342 68.7105 6.79289L62.3465 0.428932C61.956 0.0384078 61.3229 0.0384078 60.9323 0.428932C60.5418 0.819457 60.5418 1.45262 60.9323 1.84315L66.5892 7.5L60.9323 13.1569C60.5418 13.5474 60.5418 14.1805 60.9323 14.5711C61.3229 14.9616 61.956 14.9616 62.3465 14.5711L68.7105 8.20711ZM-0.00390625 8.5H68.0034V6.5H-0.00390625L-0.00390625 8.5Z"
                fill="#A8E727"/>
            </svg>
            <p class="text-[16px] md:text-[24px] w-1/2">{{ $t('chapterMath') }}</p>
          </li>
          <li class="flex items-center gap-5">
            <svg class="w-12 md:w-20" viewBox="0 0 69 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M68.7105 8.20711C69.101 7.81658 69.101 7.18342 68.7105 6.79289L62.3465 0.428932C61.956 0.0384078 61.3229 0.0384078 60.9323 0.428932C60.5418 0.819457 60.5418 1.45262 60.9323 1.84315L66.5892 7.5L60.9323 13.1569C60.5418 13.5474 60.5418 14.1805 60.9323 14.5711C61.3229 14.9616 61.956 14.9616 62.3465 14.5711L68.7105 8.20711ZM-0.00390625 8.5H68.0034V6.5H-0.00390625L-0.00390625 8.5Z"
                fill="#A8E727"/>
            </svg>
            <p class="text-[16px] md:text-[24px] w-1/2">{{ $t('chapterVerbal') }}</p>
          </li>
          <li class="flex items-center gap-5">
            <svg class="w-12 md:w-20" viewBox="0 0 69 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M68.7105 8.20711C69.101 7.81658 69.101 7.18342 68.7105 6.79289L62.3465 0.428932C61.956 0.0384078 61.3229 0.0384078 60.9323 0.428932C60.5418 0.819457 60.5418 1.45262 60.9323 1.84315L66.5892 7.5L60.9323 13.1569C60.5418 13.5474 60.5418 14.1805 60.9323 14.5711C61.3229 14.9616 61.956 14.9616 62.3465 14.5711L68.7105 8.20711ZM-0.00390625 8.5H68.0034V6.5H-0.00390625L-0.00390625 8.5Z"
                fill="#A8E727"/>
            </svg>
            <p class="text-[16px] md:text-[24px] w-1/2">{{ $t('chapterGrammar') }}</p>
          </li>
        </ul>

        <div>
          <img class="drop-sha" src="/assets/image/plus.png" alt="plus">
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>

.drop-sha {
  filter: drop-shadow(10px 10px 20px #000000);
}

.drop-sha-2 {
  filter: drop-shadow(10px 10px 20px rgb(4, 131, 202));
}

</style>
