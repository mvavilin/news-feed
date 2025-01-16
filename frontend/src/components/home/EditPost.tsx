import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { EditPostRequestSchema } from "@/schema"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { z } from "zod"
import { useState } from "react"
import axios, { AxiosError } from "axios"
import { Upload } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useNavigate } from "react-router-dom"

type IFormFields = { title: string, content: string }

interface IEditPostProps { postId: number | null, postStatus: string }

function EditPost({ postId, postStatus }: IEditPostProps) {
  const navigate = useNavigate()

  const id = postId
  const status = postStatus

  // 
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    if (file) {
      setSelectedImage(file)
      const previewUrl = URL.createObjectURL(file)
      setImagePreview(previewUrl)
    } else {
      setSelectedImage(null)
      setImagePreview(null)
    }
  }
  //

  const form = useForm<IFormFields>({
    resolver: zodResolver(EditPostRequestSchema),
    defaultValues: { title: "", content: "" }
  })

  async function sendToPublish(values: z.infer<typeof EditPostRequestSchema>) {
    try {
      if (status === "published") {
        await axios.put(`https://cpt-stage-2.duckdns.org/api/posts/${id}`, values, { headers: { "Authorization": `Bearer ${localStorage.getItem("accessToken")}` } })
      } else if (status === "draft") {
        await axios.put(`https://cpt-stage-2.duckdns.org/api/posts/${id}`, values, { headers: { "Authorization": `Bearer ${localStorage.getItem("accessToken")}` } })
        await axios.patch(`https://cpt-stage-2.duckdns.org/api/posts/${id}/status`, { status: "published" }, { headers: { "Authorization": `Bearer ${localStorage.getItem("accessToken")}`, "Content-Type": "application/json" } })
      }
    } catch (e: unknown) {
      const error = e as AxiosError
      console.error("Error sending data:", error.response?.data || error.message)
    }
  }

  async function sendToDrafts(values: z.infer<typeof EditPostRequestSchema>) {
    try {
      if (status === "published") {
        await axios.put(`https://cpt-stage-2.duckdns.org/api/posts/${id}`, values, { headers: { "Authorization": `Bearer ${localStorage.getItem("accessToken")}` } })
        // await axios.patch(`https://cpt-stage-2.duckdns.org/api/posts/${id}/status`, { status: "draft" }, { headers: { "Authorization": `Bearer ${localStorage.getItem("accessToken")}`, "Content-Type": "application/json" } })
      } else if (status === "draft") {
        await axios.put(`https://cpt-stage-2.duckdns.org/api/posts/${id}`, values, { headers: { "Authorization": `Bearer ${localStorage.getItem("accessToken")}` } })
      }
    } catch (e: unknown) {
      const error = e as AxiosError
      console.error("Error sending data:", error.response?.data || error.message)
    }
  }

  const onSubmit = async (values: z.infer<typeof EditPostRequestSchema>, event: any) => {
    const action = event.nativeEvent.submitter.value
    if (action === "publish") {
      await sendToPublish(values)
    } else if (action === "draft") {
      await sendToDrafts(values)
    }
    navigate(0)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-4">
          <FormField control={form.control} name="title" render={({ field }) => (
            <FormItem>
              <FormLabel>Заголовок</FormLabel>
              <FormControl>
                <Input {...field} type="text" placeholder="Введите заголовок" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />

          {/*  */}
          <FormItem>
            <Label className="relative">
              <Input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
              {!imagePreview && <Button type="button" className="flex gap-2.5"><Upload />Добавить картинку</Button>}
              {imagePreview && <div className="w-full rounded-sm overflow-hidden"><img src={imagePreview} alt="Предварительный просмотр" /></div>}
            </Label>
            <FormMessage />
          </FormItem>
          {/*  */}

          <FormField control={form.control} name="content" render={({ field }) => (
            <FormItem>
              <FormLabel>Контент</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Введите контент" className="resize-none" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />
        </div>

        <div className="flex gap-x-2">
          <Button type="submit" name="action" value="publish">Опубликовать пост</Button>
          {status === "published" ? <></> : <Button type="submit" name="action" value="draft" variant={"secondary"}>Отправить в черновики</Button>}
        </div>

      </form>
    </Form>
  )
}

export default EditPost