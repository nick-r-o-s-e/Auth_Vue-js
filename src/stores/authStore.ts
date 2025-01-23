import api from "@/api";
import type {
  ApiAuthRoute,
  FormData,
  Errors,
  User,
  ResetPasswordFormData,
} from "@/utils/types";
import { defineStore } from "pinia";
import type { Router } from "vue-router";

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    user: <User | null>null,
    errors: <Errors>{},
    router: <Router>{},
  }),
  getters: {},
  actions: {
    setError(field: string, msg: string) {
      this.errors = { ...this.errors, [field]: [msg] };
    },

    clearError(field: string) {
      if (this.errors[field]) {
        const newErrors = { ...this.errors };
        delete newErrors[field];
        this.errors = newErrors;
      }
    },

    clearAllErrors() {
      this.errors = {};
    },

    async getUser() {
      if (localStorage.getItem("token")) {
        return await api
          .get("/user", {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then(({ data }) => {
            this.errors = {};

            this.user = data;
          })
          .catch((err) => {
            const { errors } = err.response.data;

            if (errors) {
              this.errors = errors;
              throw new Error("Failed to send reset link");
            } else {
              throw new Error(err.message || "Failed to reset pasword");
            }
          });
      }
    },

    async sendResetLink(email: string) {
      return await api
        .post("/forgot-password", { email: email })
        .then(() => {
          this.errors = {};
        })
        .catch((err) => {
          const { errors } = err.response.data;

          if (errors) {
            this.errors = errors;
            throw new Error("Failed to send reset link");
          } else {
            this.setError("fetchError", err.message);
            throw new Error(err.message || "Failed to reset pasword");
          }
        });
    },

    async resetPassword(formData: ResetPasswordFormData, token: string) {
      return await api
        .post("/reset-password", { ...formData, token: token })
        .then(() => {
          this.errors = {};
        })
        .catch((err) => {
          const { errors } = err.response.data;

          if (errors) {
            this.errors = errors;
            throw new Error("Failed to reset with new credentials");
          } else {
            this.setError("fetchError", err.message);
            throw new Error(err.message || "Failed to reset pasword");
          }
        });
    },

    async authenticate(apiRoute: ApiAuthRoute, formData: FormData) {
      return await api
        .post(`/${apiRoute}`, formData)
        .then(({ data }) => {
          this.errors = {};
          localStorage.setItem("token", data.token);
          this.user = data.user || null;
          this.router.push({ name: "home" });
        })
        .catch((err) => {
          const { errors } = err.response.data;

          if (errors) {
            this.errors = errors;
            throw new Error("Failed to Authenticate");
          } else {
            this.setError("fetchError", err.message);
            throw new Error(err.message || "Failed to fetch");
          }
        });
    },

    async logout() {
      return await api
        .post(
          "/logout",
          {},
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .catch((err) => {
          throw new Error(
            err.message || "Something went wrong during the logout process"
          );
        })
        .finally(() => {
          this.user = null;

          this.errors = {};

          localStorage.removeItem("token");

          this.router.push({ name: "login" });
        });
    },
  },
});
