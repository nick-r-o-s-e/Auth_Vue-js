<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  id: string;
  type?: string;
  modelValue: string;
  label: string;
  placeholder?: string;
  error?: string;
  iconClass?: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const inputClasses = computed(() =>
  props.error
    ? "border-red-500 focus:border-red-500"
    : "border-gray-200 focus:border-indigo-500"
);
</script>

<template>
  <div class="flex -mx-3">
    <div class="w-full px-3 mb-5">
      <label :for="id" class="px-1 text-xs font-semibold">{{ label }}</label>
      <div class="flex">
        <div
          v-if="iconClass"
          class="z-10 flex items-center justify-center w-10 pl-1 text-center pointer-events-none"
        >
          <i :class="['text-lg text-gray-400', iconClass]"></i>
        </div>

        <input
          :id="id"
          :type="type || 'text'"
          :placeholder="placeholder || label"
          class="w-full py-2 pl-10 pr-3 -ml-10 border-2 rounded-lg outline-none"
          :class="inputClasses"
          :value="modelValue"
          @input="
            emit('update:modelValue', ($event.target as HTMLInputElement).value)
          "
        />
      </div>

      <p v-if="error" class="text-sm text-red-500">{{ error }}</p>
    </div>
  </div>
</template>
