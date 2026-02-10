<script>
import {useRoute} from "vue-router";
import Header from "../../widgets/Header/Header.vue";

export default {
  name: "User",
  components: {
    Header,
  },
  setup() {
    const route = useRoute();
    return {
      route,
    };
  },
};
</script>

<template>
  <div class="linear-gradient min-h-screen flex flex-col gap-5">
    <div class="w-full">
      <Header/>
    </div>
    <div>
      <router-view/>
    </div>
  </div>
</template>
