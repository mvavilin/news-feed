import CardWrapper from "@/components/auth/CardWrapper"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { z } from "zod"
import { LoginUserRequestSchema } from "@/schema"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { loginUser } from "@/api/postService"
import { LoaderCircle } from "lucide-react"

function LoginForm() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const form = useForm({
    resolver: zodResolver(LoginUserRequestSchema),
    defaultValues: { email: "", password: "" }
  })

  const onSubmit = async (values: z.infer<typeof LoginUserRequestSchema>) => {
    setLoading(true)
    const response = await loginUser(values)
    localStorage.setItem("accessToken", response?.data.accessToken)
    localStorage.setItem("refreshToken", response?.data.refreshToken)
    if (response) navigate("/home")
    setLoading(false)
  }

  return (
    <CardWrapper title="Войти" backButtonHref="/register" backButtonLabel="Нет аккаунта?" backButtonLink="Создать аккаунт">
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