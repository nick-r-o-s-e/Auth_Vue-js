<script setup lang="ts">
import type { LoginFormData } from "@/utils/types";
import { reactive, ref } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/authStore";
import { loginSchema } from "@/validation/formSchemas";
import FormWrapper from "@/components/FormWrapper.vue";
import Form from "@/components/Form.vue";
import FormInput from "@/components/FormInput.vue";

const { authenticate } = useAuthStore();

const { errors } = storeToRefs(useAuthStore());

const loading = ref(false);

const formData = reactive<LoginFormData>({
  email: "",
  password: "",
});

const submitHandler = async () => {
  return await authenticate("login", formData).catch(() => {
    loading.value = false;
  });
};
</script>

<template>
  <FormWrapper>
    <Form
      :formData="formData"
      :submit-handler="submitHandler"
      :validation-schema="loginSchema"
      :disabled="!!errors.fetchError?.[0] || loading"
      v-model:loading="loading"
      title="login"
      description="Enter your information to login"
      second-option="register"
    >
      <div>
        <!-- EMAIL INPUT -->
        <FormInput
          id="email"
          type="email"
          v-model="formData.email"
          label="Email"
          placeholder="email@email.com"
          :error="errors?.email?.[0]"
          icon-class="mdi mdi-email-outline"
        />

        <!-- PASSWORD INPUT -->
        <FormInput
          id="password"
          type="password"
          v-model="formData.password"
          label="Password"
          placeholder="************"
          :error="errors?.password?.[0]"
          icon-class="mdi mdi-lock-outline"
        />

        <!-- PASSWORD RESET LINK -->
        <div class="flex justify-center w-full mb-5">
          <RouterLink
            to="forgot-password"
            class="text-blue-400 underline duration-200 hover:text-blue-700"
          >
            Forgot your password?
          </RouterLink>
        </div>
      </div>
    </Form>
  </FormWrapper>
</template>
