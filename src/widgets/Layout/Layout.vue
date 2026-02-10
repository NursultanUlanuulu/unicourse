<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import Admin from "../../views/AdminPanel/Admin.vue";
import User from "../../views/UserPanel/User.vue";

export default {
  name: "Layout",
  components: {
    Admin,
    User,
  },
  setup() {
    const route = useRoute();

    const isUserRoute = computed(() => route.path.startsWith("/user"));
    const isAdminRoute = computed(() => route.path.startsWith("/admin"));

    return {
      isUserRoute,
      isAdminRoute,
    };
  },
};
</script>

<template>
  <div>
    <template v-if="isUserRoute">
      <User/>
    </template>
    <template v-else-if="isAdminRoute">
      <Admin />
    </template>
    <template v-else>
      <router-view />
    </template>
  </div>
</template>

<style scoped></style>
