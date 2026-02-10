<template>
  <form @submit.prevent="onSubmit" class="flex flex-col h-full gap-5">
    <div class="flex justify-between bg-white py-5 px-10 rounded-xl">
      <div class="flex items-center gap-3 cursor-pointer" @click="router.back()">
        <img src="/assets/svg/back.svg" alt="back"/>
        <h1>Создание новой задачи</h1>
      </div>
      <button type="submit" class="bg-[#575263] text-white py-2 px-7 text-2xl font-medium rounded-lg">Создать</button>
    </div>

    <div class="flex flex-col gap-2 bg-white p-4 flex-1 rounded-xl">
      <div class="bg-white p-4 flex gap-2 rounded-xl">

        <label class="flex gap-5 bg-white p-3 w-36 h-36 rounded-xl cursor-pointer">
          <div v-if="imageUrl[0]" class="w-full h-full">
            <img
                :src="imageUrl[0]"
                alt="main-image" class="w-full h-full rounded-lg object-cover border">
          </div>
          <img :hidden="!!imageUrl[0]" src="/assets/icon/upload.svg" alt="upload" class="w-full h-full"/>
          <input hidden type="file" @change="handleFileChange($event, -1)">
        </label>

        <div class="flex items-center gap-2 border border-gray-500 p-2 flex-1 rounded-xl">
          <input type="text" v-model="questionForm.questionImageRequest.description" placeholder="question"
            class="py-1 px-5 rounded-lg h-full flex-1 resize-none">
        </div>
      </div>
      <div class="grid grid-cols-2 gap-2 border-t border-gray-500">
        <div v-for="(option, i) in questionForm.optionImageRequests" :key="i"
             class="bg-white p-4 flex gap-2 rounded-xl">

          <label class="flex gap-5 bg-white p-3 w-28 h-28 rounded-xl cursor-pointer">
            <div v-if="imageUrl[i + 1]" class="w-full h-full">
              <img
                  :src="imageUrl[i + 1]"
                  alt="main-image" class="w-full h-full rounded-lg object-cover border">
            </div>
            <img :hidden="!!imageUrl[i + 1]" src="/assets/icon/upload.svg" alt="upload"
                 class="w-full h-full"/>
            <input hidden type="file" @change="handleFileChange($event, i)">
          </label>

          <div class="flex items-start gap-2 border border-gray-500 p-2 flex-1 rounded-xl">
            <label class="w-6 h-6 cursor-pointer">
              <div class="rounded-full w-full h-full"
                   :class="{'bg-blue-500' : option.isCorrect, 'bg-gray-500' : !option.isCorrect}"/>
              <input type="radio" :checked="option.isCorrect" hidden @change="setCorrectOption(i)">
            </label>

            <input type="text"
              :placeholder="'вариант ' + (i + 1)"
              class="flex-1 py-1 px-5 rounded-lg resize-none h-full"
              v-model="option.description">
          </div>

        </div>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import {useRoute, useRouter} from "vue-router";
import {reactive, ref} from "vue";
import {useStore} from "../../model/store";

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    const testStore = useStore()
    const subjectId = route.params.itemId
    const loading = ref<boolean>(false)

    const imageUrl = reactive<string[]>(['', '', '', '', ''])

    const questionForm = reactive({
      questionImageRequest: {
        subjectId: Number(subjectId),
        description: '',
        image: ''
      },
      optionImageRequests: Array.from({length: 4}, (_, index) => ({
        description: '',
        image: '',
        isCorrect: index === 0,
      }))
    })

    const setCorrectOption = (index: number) => {
      questionForm.optionImageRequests.forEach((option, i) => {
        option.isCorrect = i === index;
      });
    };

    const handleFileChange = (e: any, index: number) => {
      if (index === -1) {
        questionForm.questionImageRequest.image = e.target.files[0]
        imageUrl[0] = URL.createObjectURL(e.target.files[0]);
      }
      questionForm.optionImageRequests[index].image = e.target.files[0]
      imageUrl[index + 1] = URL.createObjectURL(e.target.files[0]);
    }

    const onSubmit = async () => {
      try {
        loading.value = true
        if (!!questionForm.questionImageRequest.description)
          await testStore.postQuestion(questionForm)
          router.push(`/admin-panel/test-list/${subjectId}`)
      } catch (err) {
        console.error(err)
      } finally {
        loading.value = false
      }
    }

    return {onSubmit, questionForm, handleFileChange, setCorrectOption, imageUrl, router}
}
}
</script>