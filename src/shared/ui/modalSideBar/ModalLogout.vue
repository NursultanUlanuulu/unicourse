<template>
  <div class="modal">
    <div class="modal-content" ref="modalRef">
      <div class="logo">
        <p>UNIKURS</p>
      </div>
      <div class="line">
        <span>{{ $t('userMainPage.logoutConfirmation.message') }}</span>
      </div>
      <div class="flexing">
        <button class="" @click="confirmLogout">{{ $t('userMainPage.logoutConfirmation.confirm') }}</button>
        <button @click="onClose">{{ $t('userMainPage.logoutConfirmation.cancel') }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { TokenService } from "../../../utils/token.service";

export default {
  name: "ModalLogout",
  props: {
    onClose: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const modalRef = ref(null);
    const router = useRouter();

    const confirmLogout = () => {
      TokenService.removeToken();
      router.push("/");
      props.onClose();
    };

    const handleClickOutside = (event) => {
      if (modalRef.value && !modalRef.value.contains(event.target)) {
        props.onClose();
      }
    };

    onMounted(() => {
      document.addEventListener("mousedown", handleClickOutside);
    });

    onBeforeUnmount(() => {
      document.removeEventListener("mousedown", handleClickOutside);
    });

    return {
      modalRef,
      confirmLogout,
    };
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  width: 90%;
  max-width: 500px;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px;
}

button {
  width: 80%;
  max-width: 200px;
  padding: 10px 20px;
  margin: 10px;
  border: none;
  border-radius: 5px;
  background: #372b4a;
  color: white;
  cursor: pointer;
  font-size: 18px;
  font-weight: 500;
  font-family: Montserrat;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #582e96;
}

@media (min-width: 768px) {
  button {
    width: 250px;
    font-size: 20px;
  }
}

.logo img {
  margin-top: 10px;
  max-width: 100px;
}

@media (min-width: 768px) {
  .logo img {
    max-width: 150px;
  }
}

.line {
  padding: 30px;
  border-bottom: 1px solid gray;
  width: 100%;
  text-align: center;
  font-size: 20px;
}

@media (max-width: 768px) {
  .line {
    padding: 20px;
    font-size: 14px;
  }
}

.highlight {
  color: red;
  font-weight: 600;
}

.flexing {
  display: flex;
  gap: 10px;
  width: 100%;
}

.flexing button {
  width: 50%;
  font-size: 10px;
}

@media (min-width: 768px) {
  .flexing {
    flex-direction: row;
    gap: 20px;
  }

  .flexing button {
    font-size: 16px;
  }
}
</style>

