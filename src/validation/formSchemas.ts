import * as yup from "yup";

const emailSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
});

const passwordSchema = yup.object({
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const passwordConfirmationSchema = yup.object({
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Password confirmation is required"),
});

export const loginSchema = emailSchema.concat(passwordSchema);

export const registerSchema = loginSchema
  .shape({
    name: yup
      .string()
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),
    country: yup.string().required("Country is required"),
    language: yup.string().required("Language is required"),
  })
  .concat(passwordConfirmationSchema);

export const emailOnlySchema = emailSchema;

export const resetPasswordSchema = loginSchema.concat(
  passwordConfirmationSchema
);
