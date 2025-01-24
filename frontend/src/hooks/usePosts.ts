import { useEffect, useState } from "react"
import { IPost } from "@/models"
import axios, { AxiosError } from "axios"

export function usePosts() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [posts, setPosts] = useState<IPost[]>([])

  async function fetchPosts() {
    try {
      setError("")
      setLoading(true)
      const responce = await axios.get<IPost[]>("https://cpt-stage-2.duckdns.org/api/posts", { headers: { "Authorization": `Bearer ${localStorage.getItem("accessToken")}` } })
      setPosts(responce.data)
      setLoading(false)
    } catch (e: unknown) {
      const error = e as AxiosError
      setLoading(false)
      setError(error.message)
    }
  }

  useEffect(() => { fetchPosts() }, [])

  return { posts, error, loading }
}