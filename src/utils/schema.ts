import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
});

export const forgotPasswordSchema = yup.object({
  email: yup.string().required().email(),
});

export const resetPasswordSchema = yup.object({
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export const signupSchema = yup.object({
  name: yup.string().required().min(2),
  email: yup.string().required().email(),
  password: yup.string().required(),
});

export const expenseSchema = yup.object({
  price: yup.number().required().min(5),
  category: yup.string().required(),
  description: yup.string().required(),
});
