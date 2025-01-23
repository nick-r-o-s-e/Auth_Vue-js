<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <header></header>
  <div class="flex justify-center w-full min-h-screen px-5 pt-24 min-w-screen">
    <RouterView />
  </div>
</template>

<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.min.css");
</style>
