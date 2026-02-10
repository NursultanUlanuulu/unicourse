<script lang="ts">
import {useRoute, useRouter} from "vue-router";
import {computed, onMounted} from "vue";
import {useArchiveStore} from "../archive.store";
import ResultBar from "../../../shared/ui/resultBar/ResultBar.vue";
import {imageRedirection} from "../../../utils/index.js";

export default {
  methods: {imageRedirection},
  components: {ResultBar},
  setup: function () {
    const route = useRoute()
    const router = useRouter()
    const archiveStore = useArchiveStore()

    const testId = computed(() => route.params.testId)

    const progressOffset = computed(() => {
      const percent = archiveStore.archiveResult?.percent || 0;
      return 251.2 - (251.2 * percent) / 100;
    });

    const nav = () => {
      router.back()
    }

    onMounted(() => {
      if (testId) {
        archiveStore.getArchiveResult(String(testId.value))
      }
    })

    const corrector = (correct: boolean, chose: boolean): string => {
      if (correct && chose) return '!bg-[#00ff00]';
      if (correct) return '!bg-[#00ff00]';
      if (chose) return '!bg-red-500';

      return '';
    };

    return {testId, archiveStore, progressOffset, nav, corrector}
  }
}
</script>

<template>
  <div class="h-[80vh] overflow-y-scroll w-10/12 mx-auto flex flex-col gap-2">
    <div>
      <span class="flex items-center gap-5 text-white">
        <div class="hover:scale-125 transition hover:bg-lime-500 rounded-full w-7 h-7"
             @click="nav">
        <img src="/assets/icon/backArrowIcon.svg" alt="click" class="w-full h-full "/>
        </div>
        <p class="text-2xl font-semibold">Архив</p>
      </span>
    </div>

    <ResultBar
        :sum-question="archiveStore.archiveResult?.sumQuestion"
        :not-correct="archiveStore.archiveResult?.notCorrect"
        :correct="archiveStore.archiveResult?.correct"
        :percent="archiveStore.archiveResult?.percent"/>

    <div class="grid grid-cols-1 gap-3 pr-2">

      <div v-for="(question, index) in archiveStore.archiveFullList" :key="index"
           class="bg-white p-2 rounded-lg border-2 flex flex-col gap-1">
        <div class="bg-white py-2 px-5 flex flex-col sm:flex-row justify-between rounded-lg">
          <div class="flex flex-col">
            <span class="font-bold text-xl">{{ $t('userMainPage.test.question')}} № {{ index + 1 }} </span>
            <p class="text-2xl">{{ question?.description }}</p>
          </div>
          <div v-if="question?.image" class="md:w-[120px] md:h-[120px] w-[150px] h-[150px] overflow-hidden border-2 rounded-lg bg-black">
            <img
                v-if="question.image"
                :src="imageRedirection(question.image)"
                alt="option-image"
                class="w-full h-full object-cover hover:object-contain"
            >
          </div>
        </div>

        <div class="grid sm:grid-cols-2 grid-cols-1 gap-1">
          <div v-for="(option, i) in question?.optionsResponse" :key="i"
               :class="corrector(option.correct, option.chose)"
               class="bg-gray-300 py-1 px-4 rounded-md flex flex-col gap-2">
            <p class="text-start">{{ ['а', 'б', 'в', 'г'][i] }}) {{ option?.description }}</p>
            <div v-if="option.image" class="md:w-[90px] md:h-[90px] w-[120px] h-[120px] overflow-hidden flex flex-col justify-center items-center border-2 rounded-lg bg-black">
              <img
                  v-if="option.image !== 'err'"
                  :src="imageRedirection(option.image)"
                  alt="option-image"
                  class="w-full h-full object-cover hover:object-contain"
              >
              <p v-if="option.image === 'err'" class="text-white">Без фото</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>