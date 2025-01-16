import * as z from "zod";

export const RegisterSchema = z.object({
  email: z.string().email({ message: "Пожалуйста, введите правильный адрес электронной почты" }),
  password: z.string().min(8, { message: "Длина пароля должна составлять не менее 8 символов" }),
  role: z.enum(["reader", "author"], { required_error: "Выберите роль (Читатель или Автор)" })
})

export const LoginSchema = z.object({
  email: z.string().email({ message: "Пожалуйста, введите правильный адрес электронной почты" }),
  password: z.string().min(8, { message: "Длина пароля должна составлять не менее 6 символов" })
})

export const AddNewPostRequestSchema = z.object({
  title: z.string().min(1, { message: "Заголовок не должен быть пустым" }),
  content: z.string().min(1, { message: "Содержимое не должно быть пустым" }),
  idempotencyKey: z.string()
})

export const EditPostRequestSchema = z.object({
  title: z.string().min(1, { message: "Заголовок не должен быть пустым", }),
  content: z.string().min(1, { message: "Содержимое не должно быть пустым" })
})