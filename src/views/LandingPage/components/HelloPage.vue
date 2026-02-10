<script setup lang="ts">
import { ref, onMounted } from "vue";
import gsap from "gsap";
import { useRouter } from "vue-router";
import Container from "../../../shared/ui/container/Container.vue";

const router = useRouter();

const titleBox = ref(null);
const buttons = ref([]);

onMounted(() => {
  gsap.from(titleBox.value, {
    opacity: 0,
    y: 50,
    duration: 1.5,
    ease: "power2.out"
  });

  gsap.from(buttons.value, {
    opacity: 0,
    scale: 0.5,
    stagger: 0.3,
    duration: 1,
    ease: "back.out(1.7)"
  });
});
</script>

<template>
  <div class="relative min-h-[78vh] bg-cover bg-no-repeat bg-center flex items-center justify-center px-6 md:px-24 lg:px-32"
       style="background-image: url('/assets/image/hello-img.png');">
    <Container>
      <div class="absolute inset-0 bg-black bg-opacity-80"></div>
      <div ref="titleBox" class="relative flex flex-col items-center gap-6 text-white text-center">
        <p class="text-xl md:text-4xl lg:text-5xl font-semibold drop-shadow-md">{{ $t('welcome') }}</p>
        <div class="flex gap-3 w-full max-w-sm">
          <button @click="router.push('/auth/sign-in')" ref="el => buttons.push(el)"
                  class="text-lg flex-1 md:text-xl font-normal py-2 bg-primary rounded-lg shadow-md bg-[#89b734] active:scale-95 active:bg-green-400">
            {{ $t('link') }}
          </button>
          <button @click="router.push('/auth/sign-up')" ref="el => buttons.push(el)"
                  class="text-lg flex-1 md:text-xl font-normal py-2 bg-primary rounded-lg shadow-md bg-[#89b734] active:scale-95 active:bg-green-400">
            {{ $t('pass') }}
          </button>
        </div>
      </div>
    </Container>
  </div>
</template>