<script lang="ts">
import Info from "./Info.vue";
import Edit from "./Edit.vue"
import {ref} from "vue";
import {useRouter} from "vue-router";

export default {
  components: {
    Info, Edit
  },
  setup() {
    const router = useRouter()
    const editing = ref<boolean>(false)
    const handleChange = () => {
      editing.value = !editing.value;
    }

    const nav = () => {
      router.push('/user-panel')
    }

    return {
      editing, handleChange, nav
    }
  }
};
</script>

<template>
  <div class="w-8/12 mx-auto">
      <span class="flex items-center gap-5 text-white">
        <div class="hover:scale-125 transition hover:bg-lime-500 rounded-full w-7 h-7"
             @click="nav">
          <img src="/assets/icon/backArrowIcon.svg" alt="click" class="w-full h-full "/>
        </div>
        <p class="text-2xl font-semibold">Профиль</p>
      </span>
  </div>
  <div class="bg-[#32183b] w-10/12 md:w-8/12 mx-auto rounded-xl mb-3 py-6 flex flex-col shadow-xl">
    <Info v-if="!editing" :handleChange="handleChange"/>
    <Edit v-if="editing" :handleChange="handleChange"/>
  </div>
</template>