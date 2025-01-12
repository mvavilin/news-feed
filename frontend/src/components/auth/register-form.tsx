"use client"

import CardWrapper from "./card-wrapper"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod"
import { RegisterSchema } from "@/schema";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from "zod";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Label } from "../ui/label";

type FormFields = {
  email: string;
  password: string;
  confirmPassword: string;
  role: "reader" | "author";
}

function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState("reader");

  const form = useForm<FormFields>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      role: "reader",
    }
  })

  function onSubmit(values: z.infer<typeof RegisterSchema>) {
    const [password, confirmPassword] = form.getValues(["password", "confirmPassword"]);
    if (password === confirmPassword) {
      setLoading(true);

      // !
      console.log(values);
    } else {
      form.setError("password", {
        type: "manual",
        message: "Пароли не совпадают"
      });
      form.setError("confirmPassword", {
        type: "manual",
        message: "Пароли не совпадают"
      });
    }
  }

  return (
    <CardWrapper
      title="Создать аккаунт"
      backButtonHref="/auth/login"
      backButtonLabel="Уже есть аккаунт?"
      backButtonLink="Войти"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Повторите пароль</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="Повторите пароль" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Выберите роль</FormLabel>
                  <FormControl>
                    <RadioGroup
                      className="flex"
                      defaultValue={field.value}
                      value={selectedValue}
                      onValueChange={(value) => {
                        setSelectedValue(value);
                        field.onChange(value);
                      }}
                    >
                      <div className="inline-flex bg-slate-100 p-1  rounded-md">

                        {/* ! */}
                        <div className={`flex items-center rounded-md px-3 py-2 ${selectedValue === "reader" ? "bg-white text-slate-900" : "iniherit  text-slate-700"}`}>
                          <RadioGroupItem value="reader" id="reader" />
                          <Label htmlFor="reader">Читатель</Label>
                        </div>
                        <div className={`flex items-center rounded-md px-3 py-2 ${selectedValue === "author" ? "bg-white text-slate-900" : "iniherit  text-slate-700"}`}>
                          <RadioGroupItem value="author" id="author" />
                          <Label htmlFor="author">Автор</Label>
                        </div>

                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full">
            {loading ? "Загрузка..." : "Создать аккаунт"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export default RegisterForm