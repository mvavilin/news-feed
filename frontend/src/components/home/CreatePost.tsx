import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AddNewPostRequestSchema } from "@/schema"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { z } from "zod"
import { useState } from "react"
import { Upload } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { v4 as uuidv4 } from "uuid"
import { useNavigate } from "react-router-dom"
import { changePostStatus, publishAddNewPost, sendImage } from "@/api/postService"
import { TCreateFormFields } from "@/types"

function CreatePost() {
  const navigate = useNavigate()

  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    if (file) { setSelectedImage(file); const previewUrl = URL.createObjectURL(file); setImagePreview(previewUrl) }
    else { setSelectedImage(null); setImagePreview(null) }
  }

  const form = useForm<TCreateFormFields>({
    resolver: zodResolver(AddNewPostRequestSchema),
    defaultValues: { title: "", content: "", idempotencyKey: "" }
  })

  const onSubmit = async (values: z.infer<typeof AddNewPostRequestSchema>, event: any) => {
    const action = event.nativeEvent.submitter.value
    values.idempotencyKey = uuidv4()
    const response = await publishAddNewPost(values)
    if (response !== undefined) {
      if (selectedImage !== null) { await sendImage(response.data.id, selectedImage) }
      if (action === "publish-post") { await changePostStatus(response.data.id) }
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
          {/* ! */}
          <FormItem>
            <Label className="relative">
              <Input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
              {!imagePreview && <Button type="button" className="flex gap-2.5"><Upload />Добавить картинку</Button>}
              {imagePreview && <div className="w-full rounded-sm overflow-hidden"><img src={imagePreview} alt="Предварительный просмотр" /></div>}
            </Label>
            <FormMessage />
          </FormItem>
          {/* ! */}
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
          <Button type="submit" name="action" value="publish-post">Опубликовать пост</Button>
          <Button type="submit" name="action" value="send-to-drafts" variant={"secondary"}>Отправить в черновики</Button>
        </div>
      </form>
    </Form>
  )
}

export default CreatePost