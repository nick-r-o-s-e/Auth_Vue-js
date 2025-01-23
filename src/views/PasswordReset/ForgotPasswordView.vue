<script setup lang="ts">
import type { EmailOnlyFormData } from "@/utils/types";
import { reactive, ref } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/authStore";
import { emailOnlySchema } from "@/validation/formSchemas";
import FormWrapper from "@/components/FormWrapper.vue";
import Form from "@/components/Form.vue";
import FormInput from "@/components/FormInput.vue";

const { sendResetLink } = useAuthStore();

const { errors } = storeToRefs(useAuthStore());

const loading = ref(false);

const emailSent = ref(false);

const formData = reactive<EmailOnlyFormData>({
  email: "",
});

const submitHandler = async () => {
  if (!emailSent.value) {
    await sendResetLink(formData.email).then(() => {
      emailSent.value = true;
    });

    loading.value = false;
  }
};
</script>

<template>
  <FormWrapper>
    <Form
      :formData="formData"
      :submit-handler="submitHandler"
      :validation-schema="emailOnlySchema"
      v-model:loading="loading"
      :disabled="emailSent || loading"
      title="reset"
      btnText="send"
      description="Request a password reset email"
      second-option="login"
    >
      <FormInput
        id="email"
        type="email"
        v-model="formData.email"
        label="Email"
        placeholder="email@email.com"
        :error="errors?.email?.[0]"
        icon-class="mdi mdi-email-outline"
      />

      <p v-if="emailSent" class="mb-4 text-xl text-center text-green-600">
        We have emailed your password reset link.
      </p>
    </Form>
  </FormWrapper>
</template>
