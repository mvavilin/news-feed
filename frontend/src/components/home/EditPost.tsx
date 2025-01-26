import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { EditPostRequestSchema } from "@/schema"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { z } from "zod"
import { useState } from "react"
import { Trash2, Upload } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useNavigate } from "react-router-dom"
import { IImage, IPost } from "@/models"
import { changePostStatus, deleteImage, publishEditPost, sendImage } from "@/api/postService"
import { TEditFormFields } from "@/types"

function EditPost({ post }: { post: IPost }) {
  const navigate = useNavigate()

  const [countImages, setCountImages] = useState(post.images.length)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    if (file) { setSelectedImage(file); const previewUrl = URL.createObjectURL(file); setImagePreview(previewUrl) }
    else { setSelectedImage(null); setImagePreview(null) }
  }

  const form = useForm<TEditFormFields>({
    resolver: zodResolver(EditPostRequestSchema),
    defaultValues: { title: post.title, content: post.content }
  })

  const onSubmit = async (values: z.infer<typeof EditPostRequestSchema>, event: any) => {
    const action = event.nativeEvent.submitter.value
    switch (action) {
      case "publish-post":
        await publishEditPost(values, post);
        if (post.status === "draft") await changePostStatus(post.id)
        break
      case "send-to-drafts":
        await publishEditPost(values, post)
        break
    }
    if (selectedImage !== null) { await sendImage(post.id, selectedImage) }
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
              {
                countImages !== 0
                  ?
                  <div className="flex flex-col gap-y-4">
                    {post.images.map((image: IImage) => (
                      <div key={image.id} className="relative">
                        <button type="button" className="block absolute right-4 top-4 p-2 rounded-lg bg-slate-50" onClick={() => { deleteImage(post.id, image.id), setCountImages(0) }}><Trash2 /></button>
                        <img className="overflow-hidden rounded-sm" src={image.imageUrl} alt="[images]" />
                      </div>
                    ))}
                  </div>
                  : <>{!imagePreview && <Button type="button" className="flex gap-2.5"><Upload />Добавить картинку</Button>}</>
              }
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

        <div className="flex flex-wrap gap-2">
          <Button type="submit" name="action" value="publish-post">Опубликовать пост</Button>
          {post.status === "published" ? <></> : <Button type="submit" name="action" value="send-to-drafts" variant={"secondary"}>Отправить в черновики</Button>}
        </div>

      </form>
    </Form >
  )
}

export default EditPost