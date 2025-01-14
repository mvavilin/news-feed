"use client"

import CardWrapper from "@/components/auth/card-wrapper"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { z } from "zod"
import { LoginSchema } from "@/schema"
import { useState } from "react"

function LoginForm() {
  const [loading, setLoading] = useState(false)

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  })

  function onSubmit(values: z.infer<typeof LoginSchema>) {
    setLoading(true)
    // !
    console.log(values)
    // !
  }

  return (
    <CardWrapper
      title="Войти"
      backButtonHref="/auth/register"
      backButtonLabel="Нет аккаунта?"
      backButtonLink="Создать аккаунт"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Почта</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" placeholder="Введите почту" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Пароль</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="Введите пароль" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full">
            {loading ? "Загрузка..." : "Войти"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export default LoginForm