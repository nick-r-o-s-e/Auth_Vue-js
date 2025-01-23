<script setup lang="ts">
import { onBeforeMount, watch } from "vue";
import * as yup from "yup";
import { ValidationError } from "yup";
import { storeToRefs } from "pinia";
import type { FormData } from "@/utils/types";
import { useAuthStore } from "@/stores/authStore";
import FormLoadingOverlay from "./FormLoadingOverlay.vue";
import FormErrorOverlay from "./FormErrorContent.vue";

const { formData, submitHandler, validationSchema, title, description } =
  defineProps<{
    title: string;
    description: string;
    secondOption: "login" | "register";
    formData: FormData;
    submitHandler: () => Promise<void>;
    validationSchema: yup.ObjectSchema<FormData>;
    btnText?: string;
    disabled?: boolean;
  }>();

const { clearAllErrors, clearError, setError } = useAuthStore();

const loading = defineModel("loading", { type: Boolean, required: true });

const { errors } = storeToRefs(useAuthStore());

const emit = defineEmits(["update:formData", "update:loading"]);

onBeforeMount(async () => {
  clearAllErrors();
});

const setLoading = (val: boolean) => {
  emit("update:loading", val);
};

async function validateForm() {
  clearAllErrors();

  try {
    await validationSchema.validate(formData, { abortEarly: false });

    return true;
  } catch (err) {
    if (err instanceof ValidationError) {
      err.inner.forEach((err) => {
        if (typeof err.path !== "undefined") {
          setError(err.path, err.message);
        }
      });
    } else {
      throw new Error("Failed to validate Form");
    }

    return false;
  }
}
const handleSubmit = async () => {
  if (await validateForm()) {
    if (!loading.value) {
      setLoading(true);

      await submitHandler().catch(() => {
        setLoading(false);
      });
    }
  } else {
    return;
  }
};

/// Remove input errors on change ///
(Object.keys(formData) as Array<keyof FormData>).forEach((key) => {
  watch(
    () => formData[key],
    () => {
      if (errors.value?.[key]) {
        clearError(key);
      }
    }
  );
});
</script>

<template>
  <form
    @submit.prevent="handleSubmit"
    class="relative w-full px-5 py-10 md:w-1/2 md:px-10"
    v-bind:class="loading && 'animate-pulse pointer-events-none'"
  >
    <FormLoadingOverlay v-if="loading" />

    <FormErrorOverlay
      v-if="errors.fetchError?.[0]"
      :error="errors.fetchError[0]"
    />
    <div v-else>
      <!-- TITLE & DESCRIPTION -->
      <div class="mb-10 text-center">
        <h1 class="text-3xl font-bold text-gray-900">
          {{ title.toUpperCase() }}
        </h1>
        <p>{{ description }}</p>
      </div>

      <!-- CONTENT -->
      <fieldset :disabled="disabled">
        <slot></slot>
      </fieldset>

      <!-- ACTION BUTTONS -->
      <div class="flex -mx-3">
        <div class="w-full px-3 mb-5">
          <button
            v-bind:disabled="disabled || loading"
            class="block w-full max-w-xs px-3 py-3 mx-auto font-semibold text-white bg-indigo-500 rounded-lg disabled:bg-indigo-200 hover:bg-indigo-700 focus:bg-indigo-700"
          >
            {{ (btnText || title + " NOW").toUpperCase() }}
          </button>
        </div>
        <div class="w-full px-3 mb-5">
          <RouterLink
            class="block w-full max-w-xs px-3 py-3 mx-auto font-semibold text-center text-black bg-indigo-300 rounded-lg hover:bg-indigo-400 focus:bg-indigo-700"
            :to="secondOption"
            >{{ secondOption.toUpperCase() }}</RouterLink
          >
        </div>
      </div>
    </div>
  </form>
</template>
