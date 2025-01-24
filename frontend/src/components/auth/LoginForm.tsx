import CardWrapper from "@/components/auth/CardWrapper"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { z } from "zod"
import { LoginSchema } from "@/schema"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios, { AxiosError } from "axios"
import { LoaderCircle } from "lucide-react"

function LoginForm() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "" }
  })

  async function loginUser(values: z.infer<typeof LoginSchema>) {
    try {
      const response = await axios.post("https://cpt-stage-2.duckdns.org/api/auth/login", values)
      localStorage.setItem("accessToken", response.data.accessToken)
      localStorage.setItem("refreshToken", response.data.refreshToken)
      localStorage.setItem("email", values.email)
      navigate("/home")
    } catch (e: unknown) {
      const error = e as AxiosError
      console.error("Error sending data:", error.response?.data || error.message)
      navigate(0)
    }
  }

  function onSubmit(values: z.infer<typeof LoginSchema>) { setLoading(true); loginUser(values) }

  return (
    <CardWrapper title="Войти" backButtonHref="/auth/register" backButtonLabel="Нет аккаунта?" backButtonLink="Создать аккаунт">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem>
                <FormLabel>Почта</FormLabel>
                <FormControl>
                  <Input {...field} type="email" placeholder="Введите почту" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
            <FormField control={form.control} name="password" render={({ field }) => (
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
            {loading ? <LoaderCircle className="animate-spin" /> : "Войти"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export default LoginForm