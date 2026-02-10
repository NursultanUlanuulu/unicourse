<script>
import NavBar from "../../widgets/NavBar/NavBar.vue";
import SideBar from "../../widgets/SideBar/SideBar.vue";

export default {
  name: "Admin",
  components: {
    NavBar,
    SideBar,
  },
};
</script>

<template>
  <div class="GridContainer">
    <NavBar />
    <SideBar />
    <div class="Content">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
.GridContainer {
  display: grid;
  grid-template-areas:
    "header header header header"
    "menu main main main"
    "menu main main main";
  background: linear-gradient(to right bottom, #B6B6B6, #291A40);
  grid-template-rows: 10% auto;
  height: 100vh;
  grid-template-columns: 23% auto;
  font-size: 24px;
  font-weight: 500;
}

.Content {
  margin: 20px 40px;
  grid-area: main;
  max-height: 100vh;
}
</style>
