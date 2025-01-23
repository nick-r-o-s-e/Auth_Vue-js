<script setup lang="ts">
const { error } = defineProps<{ error: string }>();
</script>

<template>
  <div
    className="z-20 top-0 left-0 w-full flex justify-center   text-gray-900"
  >
    <div role="status">
      
      <div class="flex flex-col gap-2 mb-6 text-center">
        <h1 class="text-4xl font-bold">Oops</h1>
        <p class="text-xl">Something went wrong</p>
      </div>

      <hr class="mb-8 w-[25%] mx-auto border-1 rounded-lg border-zinc-400" />

      <p class="mb-4 text-2xl font-semibold text-center text-red-400 text-ter">
        {{ error }}
      </p>
      <div class="flex pt-6">
        <div class="w-full px-3 mb-5">
          <a
            href="/login"
            class="block w-full max-w-xs px-3 py-3 mx-auto font-semibold text-center text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 focus:bg-indigo-700"
            >LOGIN</a
          >
        </div>
        <div class="w-full px-3 mb-5">
          <a
            href="/register"
            class="block w-full max-w-xs px-3 py-3 mx-auto font-semibold text-center text-black bg-indigo-300 rounded-lg hover:bg-indigo-400 focus:bg-indigo-700"
            >REGISTER</a
          >
        </div>
      </div>

      <span class="sr-only">Fetching Error</span>
    </div>
  </div>
</template>
