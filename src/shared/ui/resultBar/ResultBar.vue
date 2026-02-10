<script lang="ts">
import {computed} from "vue";
import {useI18n} from "vue-i18n";

export default {
  props: {
    percent: {
      type: Number,
      required: false,
    },
    correct: {
      type: Number,
      required: false,
    },
    notCorrect: {
      type: Number,
      required: false,
    },
    sumQuestion: {
      type: Number,
      required: false,
    }
  },
  setup(props) {
    const calculateProgressOffset = () => {
      const percent = props.percent || 0;
      return 251.2 - (251.2 * percent) / 100;
    };

    const {t} = useI18n();
    const progressOffset = computed(calculateProgressOffset);

    return {progressOffset, t}
  }
}
</script>

<template>
  <div class="flex md:flex-row flex-col items-center gap-10 text-white">
    <div class="w-32 h-32 relative">
      <svg class="w-full h-full" viewBox="0 0 100 100">
        <circle
            cx="50"
            cy="50"
            r="40"
            stroke="#E5E7EB"
            stroke-width="10"
            fill="none"
        />
        <circle
            cx="50"
            cy="50"
            r="40"
            stroke="lime"
            stroke-width="10"
            fill="none"
            stroke-dasharray="251.2"
            :stroke-dashoffset="progressOffset"
            stroke-linecap="round"
            transform="rotate(-90 50 50)"
        />
      </svg>
      <div class="absolute inset-0 flex flex-col items-center justify-center text-xl font-bold">
        {{ percent || 0 }}%
        <div>
          {{ correct }} / {{ sumQuestion }}
        </div>
      </div>

    </div>

    <div class="flex md:flex-row flex-col items-center gap-5">
      <div class="flex gap-3">
        <img src="/assets/icon/checkMarkIcon.svg" alt="click" class="w-9 h-9 bg-lime-500 rounded-full p-1"/>
        <span class="flex items-center gap-5">{{ t("userMainPage.test.correct")}}: {{ correct }}</span>
      </div>
      <div class="flex gap-3">
        <img src="/assets/icon/crossMarkIcon.svg" alt="click" class="w-9 h-9 bg-red-500 rounded-full p-1"/>
        <span class="flex items-center gap-5">{{ t("userMainPage.test.notCorrect")}}: {{ notCorrect }}</span>
      </div>
    </div>
  </div>
</template>