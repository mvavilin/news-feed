import CardWrapper from "@/components/auth/CardWrapper"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { RegisterUserRequestSchema } from "@/schema"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { z } from "zod"
import { useState } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router-dom"
import { LoaderCircle } from "lucide-react"
import { registerUser } from "@/api/postService"
import { TRegisterFormFields } from "@/types"

function RegisterForm() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [selectedValue, setSelectedValue] = useState("Reader")

  const form = useForm<TRegisterFormFields>({
    resolver: zodResolver(RegisterUserRequestSchema),
    defaultValues: { email: "", password: "", confirmPassword: "", role: "Reader" }
  })

  const onSubmit = async (values: z.infer<typeof RegisterUserRequestSchema>) => {
    setLoading(true)
    const [password, confirmPassword] = form.getValues(["password", "confirmPassword"])
    if (password === confirmPassword) {
      const response = await registerUser(values)
      localStorage.setItem("accessToken", response?.data.accessToken)
      localStorage.setItem("refreshToken", response?.data.refreshToken)
      if (response) navigate("/home")
    } else {
      form.setError("password", { type: "manual", message: "Пароли не совпадают" })
      form.setError("confirmPassword", { type: "manual", message: "Пароли не совпадают" })
    }
    setLoading(false)
  }

  return (
    <CardWrapper title="Создать аккаунт" backButtonHref="/auth/login" backButtonLabel="Уже есть аккаунт?" backButtonLink="Войти">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            <FormField control={form.control} name="confirmPassword" render={({ field }) => (
              <FormItem>
                <FormLabel>Повторите пароль</FormLabel>
                <FormControl>
                  <Input {...field} type="password" placeholder="Повторите пароль" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
            <FormField control={form.control} name="role" render={({ field }) => (
              <FormItem>
                <FormLabel>Выберите роль</FormLabel>
                <FormControl>
                  <RadioGroup className="flex" defaultValue={field.value} value={selectedValue} onValueChange={(value) => { setSelectedValue(value); field.onChange(value) }}>
                    <div className="inline-flex bg-slate-100 p-1  rounded-md">
                      {/* ! */}
                      <div className={`flex items-center rounded-md px-3 py-2 ${selectedValue === "Reader" ? "bg-white text-slate-900" : "iniherit  text-slate-700"}`}>
                        <RadioGroupItem value="Reader" id="Reader" />
                        <Label htmlFor="Reader">Читатель</Label>
                      </div>
                      <div className={`flex items-center rounded-md px-3 py-2 ${selectedValue === "Author" ? "bg-white text-slate-900" : "iniherit  text-slate-700"}`}>
                        <RadioGroupItem value="Author" id="Author" />
                        <Label htmlFor="Author">Автор</Label>
                      </div>
                      {/* ! */}
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
          </div>
          <Button type="submit" className="w-full">
            {loading ? <LoaderCircle className="animate-spin" /> : "Создать аккаунт"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export default RegisterForm