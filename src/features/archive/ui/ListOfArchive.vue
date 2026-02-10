<script lang="ts">
import {onMounted} from "vue";
import {useArchiveStore} from "../archive.store";
import {useRoute, useRouter} from "vue-router";
import {TokenService} from "../../../utils/token.service";

export default {
  setup() {
    const archiveStore = useArchiveStore()
    const router = useRouter()
    const route = useRoute()

    const handleClick = (testId: number) => {
      if (route.path.includes('/admin-panel')) {
        router.push(`/admin-panel/user/archive/${testId}`)
      } else {
        router.push(`/user-panel/${testId}`);
      }
    };

    const nav = () => {
      router.back();
    }

    onMounted(() => {
      let userId = router.options.history.state.adminUserId
      if (!userId) {
        userId = TokenService.getIdToken()
      }
      if (userId) {
        archiveStore.getArchive(String(userId))
      }
    })

    return {
      archiveStore, nav, handleClick
    }
  }
}
</script>

<template>
  <div class="w-10/12 mx-auto flex flex-col gap-2">
    <div>
      <span class="flex items-center gap-5 text-white">
        <div class="hover:scale-125 transition hover:bg-lime-500 rounded-full w-7 h-7"
             @click="nav">
        <img src="/assets/icon/backArrowIcon.svg" alt="click" class="w-full h-full "/>
        </div>
        <p class="text-2xl font-semibold">Архив</p>
      </span>
    </div>
    <div class="flex flex-col pr-1 gap-4 max-h-[77vh] overflow-y-auto">

      <button v-for="(archive, index) in archiveStore.archiveList" :key="index"
              class="bg-white text-black pl-4 pr-2 py-2 rounded-md flex justify-between items-center shadow hover:bg-gray-300 h-min"
              @click="handleClick(archive.testId)">

        <p>{{ "№" + (index + 1) + ": " + archive.subjectName }}</p>

        <span class="w-5 h-5">
          <img src="/assets/icon/arrow-icon.svg" alt="click" class="w-full h-full"/>
        </span>

      </button>

    </div>
  </div>
</template>