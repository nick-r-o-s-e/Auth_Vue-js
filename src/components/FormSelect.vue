<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  id: string;
  modelValue: string;
  label: string;
  options: { id: number; name: string }[];
  placeholder?: string;
  error?: string;
}>();

const emit = defineEmits(["update:modelValue", "change"]);

const selectClasses = computed(() =>
  props.error
    ? "border-red-500 focus:border-red-500"
    : "border-gray-200 focus:border-indigo-500"
);
</script>

<template>
  <div class="w-[50%] px-3 mb-5">
    <label :for="id" class="px-1 text-xs font-semibold">{{ label }}</label>
    <select
      :id="id"
      class="w-full py-2 pl-1 pr-3 border-2 rounded-lg outline-none cursor-pointer"
      :class="selectClasses"
      :value="modelValue"
      @change="
        emit('update:modelValue', ($event.target as HTMLSelectElement).value);
        emit('change', ($event.target as HTMLSelectElement).value);
      "
    >
      <option value="" disabled>{{ placeholder || "Select an option" }}</option>
      <option v-for="option in options" :key="option.id" :value="option.name">
        {{ option.name }}
      </option>
    </select>
    <p v-if="error" class="text-sm text-red-500">{{ error }}</p>
  </div>
</template>
