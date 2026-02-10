<script lang="ts">
import {computed} from "vue";
import {imageRedirection} from "../../../utils/index.js";

export default {
  props: {
    name: {
      type: String,
      required: false,
      default: "", // Add this line
    },
    size: {
      type: Number,
      default: 100,
    },
    textSize: Number,
    photoUrl: {
      type: [String, File],
      default: "",
    },
  },
  setup(props) {
    const photo = computed(() => {
        if (props.photoUrl instanceof File) {
          console.log(URL.createObjectURL(props.photoUrl));
          return URL.createObjectURL(props.photoUrl);
        }
        return imageRedirection(props.photoUrl);
    });
    console.log();

    return {photo}
  }
}
</script>

<template>

  <div class="flex flex-col items-center">
    <div :style="{width: size + 'px', height: size + 'px'}" class="rounded-full overflow-hidden">
      <img
          v-if="photoUrl"
          :src="photo"
          alt="avatar" class="w-full h-full object-cover"
      />
      <div v-if="photoUrl === null || photoUrl == ''"
           class="flex justify-center items-center h-full font-[900] bg-gray-500 text-white" :style="{fontSize: textSize + 'px'}">
        {{name.charAt(0).toUpperCase()}}
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>