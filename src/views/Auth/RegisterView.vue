<script setup lang="ts">
import { onBeforeMount, reactive, ref, toRaw } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/authStore";
import axios from "axios";
import { registerSchema } from "@/validation/formSchemas";
import FormWrapper from "@/components/FormWrapper.vue";
import Form from "@/components/Form.vue";
import FormInput from "@/components/FormInput.vue";
import FormSelect from "@/components/FormSelect.vue";
import type { RegisterFormData } from "@/utils/types";
import api from "@/api/index";

const { authenticate, setError } = useAuthStore();

const { errors } = storeToRefs(useAuthStore());

const loading = ref(true);

const countries = ref<
  {
    id: number;
    name: string;
  }[]
>([]);

const languages = ref<
  {
    id: number;
    name: string;
  }[]
>([]);

const formData = reactive<RegisterFormData>({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
  country: "",
  language: "",
});

onBeforeMount(async () => {
  console.log("CHECK");

  await api
    .get("/countries")
    .then(({ data }) => {
      countries.value = data;

      loading.value = false;
    })
    .catch((err) => {
      setError("fetchError", err.message);
      loading.value = false;
    });
});

async function fetchLanguages() {
  if (!formData.country || !countries) return;

  formData.language = "";

  loading.value = true;

  const countryID = toRaw(countries.value).find(
    (c) => c.name === formData.country
  )?.id;

  if (countryID) {
    await api
      .get(`/countries/${countryID}/languages`)
      .then(({ data }) => {
        languages.value = data;
        loading.value = false;
      })
      .catch((err) => {
        setError("fetchError", err.message);
        loading.value = false;
      });
  }
}

const submitHandler = async () => {
  return await authenticate("register", formData).catch(() => {
    loading.value = false;
  });
};
</script>

<template>
  <FormWrapper>
    <Form
      :formData="formData"
      :submit-handler="submitHandler"
      :validation-schema="registerSchema"
      :disabled="!!errors.fetchError?.[0] || loading"
      v-model:loading="loading"
      title="register"
      description="Enter your information to register"
      second-option="login"
    >
      <div>
        <!-- NAME INPUT -->
        <FormInput
          id="name"
          v-model="formData.name"
          label="Name"
          placeholder="Name"
          :error="errors?.name?.[0]"
          icon-class="mdi mdi-account-outline"
        />

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

        <div class="flex -mx-3">
          <!-- COUNTRY SELECT -->
          <FormSelect
            id="country"
            v-model="formData.country"
            label="Country"
            :options="countries"
            :error="errors?.country?.[0]"
            placeholder="Select a country"
            @change="fetchLanguages"
          />

          <!-- LANGUAGE SELECT -->
          <FormSelect
            id="language"
            v-model="formData.language"
            label="Language"
            :options="languages"
            :error="errors?.language?.[0]"
            placeholder="Select a language"
          />
        </div>

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

        <!-- PASSWORD CONFIRM INPUT -->
        <FormInput
          id="confirm-password"
          type="password"
          v-model="formData.password_confirmation"
          label="Confirm Password"
          :error="errors?.password_confirmation?.[0]"
          placeholder="************"
          icon-class="mdi mdi-lock-outline"
        />
      </div>
    </Form>
  </FormWrapper>
</template>
