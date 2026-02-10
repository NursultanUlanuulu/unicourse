<template>
  <Transition name="fade">
    <div v-if="visible" class="toast" :class="toastType">
      {{ message }}
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import emitter from '../../utils/eventBus.ts';

const visible = ref(false);
const message = ref('');
const toastType = ref('success');

const showToast = ({ message: msg, type, duration = 3000 }) => {
  message.value = msg;
  toastType.value = type;
  visible.value = true;

  setTimeout(() => {
    visible.value = false;
  }, duration);
};

onMounted(() => {
  emitter.on('show-toast', showToast);
});

onUnmounted(() => {
  emitter.off('show-toast', showToast);
});
</script>

<style scoped>
.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 10px 20px;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  z-index: 1000;
}

.success {
  background-color: #4caf50;
}

.error {
  background-color: #f44336;
}

.info {
  background-color: #2d8be0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
