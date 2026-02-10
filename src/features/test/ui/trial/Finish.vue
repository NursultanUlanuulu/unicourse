<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted} from "vue";
import {useTestStore} from "../../test.store";
import ResultBar from "../../../../shared/ui/resultBar/ResultBar.vue";

const router = useRouter()
const testStore = useTestStore()
const {testId} = router.options.history.state

onMounted(() => {
  testStore.fetchResult(Number(testId))
})
</script>

<template>
  <div class="mx-auto w-8/12 flex flex-col justify-center h-[70vh] items-center">
    <ResultBar
        :correct="testStore.resultTestData?.correct"
        :not-correct="testStore.resultTestData?.notCorrect"
        :sum-question="testStore.resultTestData?.sumQuestion"
        :percent="testStore.resultTestData?.percent"/>
    {{ "Test ID: " + testId }}

    <div class="flex md:flex-row flex-col gap-5 md:w-1/2 w-4/5">
      <button class="w-full py-1 px-5 bg-transparent border-2 border-lime-400 text-lime-400 font-bold"
              @click="router.push('/user-panel/archive')"
      >Архив</button>
      <button class="w-full py-1 px-5 bg-lime-400 border-lime-400 text-black font-bold"
              @click="router.push('/user-panel')"
      >Меню</button>
    </div>
  </div>
</template>