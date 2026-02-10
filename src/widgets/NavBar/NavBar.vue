<template>
  <div class="styled-app-bar">
    <p class="typography">
      UNIKURS.KG
    </p>
    <button>
      Admin
    </button>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import {inject} from "vue";

export default defineComponent({
  name: "NavBar",
  methods: {},
  components: {},
});
</script>

<style scoped>
.styled-app-bar {
  grid-area: header;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
  color: #000000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  z-index: 10;
}

.typography {
  width: 100%;
  font-weight: 600;
  font-size: 28px;
  color: black;
  display: flex;
  justify-content: flex-start;
  font-family: Roboto, sans-serif;
}
</style>
  