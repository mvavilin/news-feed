export type TRegisterFormFields = {
  email: string
  password: string
  confirmPassword: string
  role: "Reader" | "Author"
}

export type TCreateFormFields = {
  title: string
  content: string
  idempotencyKey: string
}

export type TEditFormFields = {
  title: string
  content: string
}
