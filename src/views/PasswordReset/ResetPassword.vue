<script setup lang="ts">
import type { ResetPasswordFormData } from "@/utils/types";
import { reactive, ref } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/authStore";
import { resetPasswordSchema } from "@/validation/formSchemas";
import FormWrapper from "@/components/FormWrapper.vue";
import Form from "@/components/Form.vue";
import FormInput from "@/components/FormInput.vue";

const { token } = defineProps<{ token: string }>();

const { resetPassword } = useAuthStore();

const { errors } = storeToRefs(useAuthStore());

const loading = ref(false);

const resetSuccess = ref(false);

const formData = reactive<ResetPasswordFormData>({
  email: "",
  password: "",
  password_confirmation: "",
});

const submitHandler = async () => {
  await resetPassword(formData, token).then(() => {
    resetSuccess.value = true;
  });

  loading.value = false;
};
</script>

<template>
  <FormWrapper>
    <Form
      :formData="formData"
      :submit-handler="submitHandler"
      :validation-schema="resetPasswordSchema"
      v-model:loading="loading"
      :disabled="resetSuccess || loading"
      title="reset"
      description="Change your password"
      second-option="login"
    >
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
        label="New Password"
        placeholder="************"
        :error="errors?.password?.[0]"
        icon-class="mdi mdi-lock-outline"
      />

      <!-- PASSWORD CONFIRM INPUT -->
      <FormInput
        id="confirm-password"
        type="password"
        v-model="formData.password_confirmation"
        :error="errors?.password_confirmation?.[0]"
        label="Confirm New Password"
        placeholder="************"
        icon-class="mdi mdi-lock-outline"
      />

      <p v-if="resetSuccess" class="mb-4 text-xl text-center text-green-600">
        Your password has been reset.
      </p>

      <p
        v-if="errors.fetchError?.[0]"
        class="mb-4 text-xl text-center text-red-500"
      >
        {{ errors.fetchError[0] }}
      </p>
    </Form>
  </FormWrapper>
</template>
