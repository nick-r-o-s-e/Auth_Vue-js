<script setup lang="ts"></script>

<template>
  <div
    class="w-full mb-56 overflow-hidden text-gray-500 bg-gray-100 shadow-xl h-fit rounded-3xl"
    style="max-width: 1000px"
  >
    <div class="w-full md:flex">
      <div class="hidden w-1/2 px-10 py-10 bg-indigo-500 md:block">
        <div class="flex items-center h-full">
          <img class="" src="/authImage.svg" />
        </div>
      </div>
      <slot></slot>
    </div>
  </div>
</template>
