import { useEffect, useState } from "react"
import axios, { AxiosError } from "axios"
import { IUserInfo } from "@/models"

export function useUserInfo() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [userInfo, setUserInfo] = useState<IUserInfo | null>(null)

  async function fetchUserInfo() {
    try {
      setError("")
      setLoading(true)
      const responce = await axios.get<IUserInfo | null>("https://cpt-stage-2.duckdns.org/api/users/me", { headers: { "Authorization": `Bearer ${localStorage.getItem("accessToken")}` } })
      setUserInfo(responce.data)
      setLoading(false)
    } catch (e: unknown) {
      const error = e as AxiosError
      console.error("Error sending data:", error.response?.data || error.message)
      setLoading(false)
      setError(error.message)
    }
  }

  useEffect(() => { fetchUserInfo() }, [])

  return { userInfo, error, loading }
}