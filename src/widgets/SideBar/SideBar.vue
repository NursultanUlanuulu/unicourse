<template>
  <div class="side-bar-container">
    <div style="display: flex; flex-direction: column; height: 100%; justify-content: space-between;">
      <div class="flex flex-col gap-5">
        <router-link
          v-for="item in navItems"
          :key="item.value"
          :to="item.path"
          style="text-decoration: none; color: inherit"
          @click="setSelectedPage(item.value)"
        >
          <button
            :class="['styled-list-item-button', { selected: selectedPage === item.value }]"
            class="border border-[#32183B] p-2 w-full flex justify-start gap-2 items-center rounded-lg text-[#32183B]"
          >
            <img
              :src="item.icon"
              :alt="item.label"
              class="icon"
              :class="{ selected: selectedPage === item.value }"
            />
            <span>{{ item.label }}</span>
          </button>
        </router-link>
      </div>
      <button
        :class="['styled-logout', { selected: selectedPage === 'logout' }]"
        @click="handleLogout"
        class="border border-gray-300 text-start px-4 py-2 w-full rounded-lg text-[#32183B]"
      >
        <div class="flex items-center gap-2">
          <img
            src="/assets/svg/logout.svg"
            alt="выйти"
            class="icon"
            :class="{ selected: selectedPage === 'logout' }"
          />
          <span>выйти</span>
        </div>
      </button>
    </div>
    <ModalLogout v-if="open" @close="open = false" />
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import ModalLogout from "../../shared/ui/modalSideBar/ModalLogout.vue";
import constructureSvg from "/assets/svg/constructure.svg";
import userSvg from "/assets/svg/users.svg";
import schoolSVG from "/assets/svg/schools.svg";

export default {
  name: "SideBar",
  components: {
    ModalLogout,
  },
  setup() {
    const route = useRoute();
    const open = ref(false);
    const selectedPage = ref("constructor");
    const navItems = [
      {
        label: "Конструктор теста",
        icon: constructureSvg,
        value: "constructor",
        path: "/admin-panel",
      },
      { label: "Пользователь", icon: userSvg, value: "user", path: "/admin-panel/user" },
      { label: "Школы", icon: schoolSVG, value: "school", path: "/admin-panel/school" },
    ];

    watch(
      () => route.path,
      (newPath) => {
        const currentItem = navItems.find((item) => item.path === newPath);
        if (currentItem) {
          selectedPage.value = currentItem.value;
        }
      },
      { immediate: true }
    );

    const setSelectedPage = (page) => {
      selectedPage.value = page;
    };

    const handleLogout = () => {
      selectedPage.value = "logout";
      open.value = true;
    };

    return {
      navItems,
      open,
      selectedPage,
      setSelectedPage,
      handleLogout,
    };
  },
};
</script>

<style scoped>
.side-bar-container {
  grid-area: menu;
  height: 100%;
  background-color: #ffffff;
  padding: 10px 30px;
  padding-top: 20px;
}
.styled-list-item-button {
  background-color: transparent;
  border-radius: 8px;
  margin-bottom: 8px;
  color: inherit;
  text-decoration: none;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.styled-list-item-button:hover {
  background-color: #f0f4f8;
  transform: scale(1.02);
}

.styled-list-item-button.selected {
  background-color: #575263;
  color: #ffffff;
  box-shadow: inset 4px 0 #575263;
}
.styled-logout {
  border-radius: 8px;
  text-decoration: none;
  cursor: pointer;
}
.styled-logout:hover {
  background-color: #f0f4f8;
  transform: scale(1.02);
}
.icon {
  filter: none;
  width: 24px;
  height: 24px;
  transition: filter 0.3s ease;
}
.icon.selected {
  filter: invert(1);
}
</style>
