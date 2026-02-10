<script>
export default {
  props: {
    time: {
      type: Number,
      required: true,
    },
    redirectTo: {
      type: String,
      required: false,
      default: "/",
    }
  },

  data() {
    return {
      timeLeft: this.time, // Устанавливаем начальное время из пропса
      timer: null, // ID таймера
    };
  },
  computed: {
    formattedTime() {
      const hours = Math.floor(this.timeLeft / 3600); // Количество часов
      const minutes = Math.floor((this.timeLeft % 3600) / 60); // Количество минут
      const seconds = this.timeLeft % 60; // Количество секунд

      return `${hours.toString().padStart(2, '0')}:${minutes
          .toString()
          .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    },
    progressPercentage() {
      return (this.timeLeft / this.time) * 100; // Процент оставшегося времени
    },
  },
  methods: {
    startTimer() {
      this.timer = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          this.handleTimerEnd()
        }
      }, 1000);
    },
    handleTimerEnd() {
      this.stopTimer();
      this.$router.push(this.redirectTo);
    },
    stopTimer() {
      clearInterval(this.timer);
    },
  },
  mounted() {
    this.startTimer();
  },
  beforeDestroy() {
    this.stopTimer();
  },
};
</script>

<template>
  <div class="timer text-white">
  <h1>{{ $t('userMainPage.test.time')}}: {{ formattedTime }}</h1>
    <div class="progress-bar">
      <div
          class="progress"
          :style="{ width: progressPercentage + '%' }">
      </div>
    </div>
  </div>
</template>

<style>
.timer {
  text-align: center;
  font-family: Arial, sans-serif;
  font-size: 24px;
  width: 100%;
}

.progress-bar {
  width: 100%;
  height: 20px;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  margin-top: 20px;
}

.progress {
  height: 100%;
  background-color: #76c7c0;
}
</style>