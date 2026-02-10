<script setup lang="ts">

</script>

<template>
  <div class="w-10/12 mx-auto flex md:flex-row justify-between text-white py-20 flex-col">
    <span class="text-lime-500 text-[20px] md:text-[50px] font-semibold">Unikurs.kg</span>
    <div class="flex gap-10 pt-5 text-nowrap">
      <div>
        <h5 class="text-xl">{{ $t("footer.title") }}</h5>
        <p>+996 (501) 122 121</p>
        <p>Email: Unikurs.kg@gmail.com</p>
      </div>
      <div class="text-xl hidden md:flex">
        <h5>{{ $t("aboutUs") }}</h5>
      </div>
    </div>
  </div>
</template>
