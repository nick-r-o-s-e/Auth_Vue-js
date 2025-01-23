import type { InferType } from "yup";
import { loginSchema, registerSchema, emailOnlySchema, resetPasswordSchema } from "../validation/formSchemas"; 

export type ApiAuthRoute = "register" | "login";

export type Errors = { [key: string]: [string] };

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: null;
    country: string;
    language: string;
    created_at: string;
    updated_at: string;
  }

export type LoginFormData = InferType<typeof loginSchema>;

export type RegisterFormData = InferType<typeof registerSchema>;

export type EmailOnlyFormData = InferType<typeof emailOnlySchema>;

export type ResetPasswordFormData = InferType<typeof resetPasswordSchema>;

export type FormData = LoginFormData | RegisterFormData | EmailOnlyFormData | ResetPasswordFormData;