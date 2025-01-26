import { IErrorResponse, IPost } from "@/models"
import { AddNewPostRequestSchema, EditPostRequestSchema, LoginUserRequestSchema, RegisterUserRequestSchema } from "@/schema"
import axios, { AxiosError } from "axios"
import { z } from "zod"

export async function registerUser(values: z.infer<typeof RegisterUserRequestSchema>) {
  try {
    return await axios.post("https://cpt-stage-2.duckdns.org/api/auth/register", values)
  } catch (e: unknown) {
    const error = e as AxiosError<IErrorResponse>
    console.error("Error sending data:", error.response?.data || error.message)
    alert(`Error sending data: ${error.response?.data.error}`)
  }
}

export async function loginUser(values: z.infer<typeof LoginUserRequestSchema>) {
  try {
    return await axios.post("https://cpt-stage-2.duckdns.org/api/auth/login", values)
  } catch (e: unknown) {
    const error = e as AxiosError<IErrorResponse>
    console.error("Error sending data:", error.response?.data || error.message)
    alert(`Error sending data: ${error.response?.data.error}`)
  }
}

export async function changePostStatus(id: number) {
  try {
    await axios.patch(`https://cpt-stage-2.duckdns.org/api/posts/${id}/status`, { status: "published" }, { headers: { "Authorization": `Bearer ${localStorage.getItem("accessToken")}`, "Content-Type": "application/json" } })
  } catch (e: unknown) {
    const error = e as AxiosError<IErrorResponse>
    console.error("Error sending data:", error.response?.data || error.message)
    alert(`Error sending data: ${error.response?.data.error}`)
  }
}

export async function publishAddNewPost(values: z.infer<typeof AddNewPostRequestSchema>) {
  try {
    return await axios.post("https://cpt-stage-2.duckdns.org/api/posts", values, { headers: { "Authorization": `Bearer ${localStorage.getItem("accessToken")}` } })
  } catch (e: unknown) {
    const error = e as AxiosError<IErrorResponse>
    console.error("Error sending data:", error.response?.data || error.message)
    alert(`Error sending data: ${error.response?.data.error}`)
  }
}

export async function publishEditPost(values: z.infer<typeof EditPostRequestSchema>, post: IPost) {
  try {
    await axios.put(`https://cpt-stage-2.duckdns.org/api/posts/${post.id}`, values, { headers: { "Authorization": `Bearer ${localStorage.getItem("accessToken")}` } })
  } catch (e: unknown) {
    const error = e as AxiosError<IErrorResponse>
    console.error("Error sending data:", error.response?.data || error.message)
    alert(`Error sending data: ${error.response?.data.error}`)
  }
}

export async function sendImage(id: number, imageFile: File) {
  try {
    const formData = new FormData()
    formData.append("image", imageFile)
    await axios.post(`https://cpt-stage-2.duckdns.org/api/posts/${id}/images`, formData, { headers: { "Authorization": `Bearer ${localStorage.getItem("accessToken")}`, "Content-Type": "multipart/form-data" } })
  } catch (e: unknown) {
    const error = e as AxiosError<IErrorResponse>
    console.error("Error sending data:", error.response?.data || error.message)
  }
}

export async function deleteImage(postId: number, imageId: number) {
  try {
    await axios.delete(`https://cpt-stage-2.duckdns.org/api/posts/${postId}/images/${imageId}`, { headers: { "Authorization": `Bearer ${localStorage.getItem("accessToken")}` } })
  } catch (e: unknown) {
    const error = e as AxiosError<IErrorResponse>
    console.error("Error sending data:", error.response?.data || error.message)
    alert(`Error sending data: ${error.response?.data.error}`)
  }
}