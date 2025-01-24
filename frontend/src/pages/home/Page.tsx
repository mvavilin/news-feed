import Header from "@/components/home/Header"
import Main from "@/components/home/Main"
import { useUserInfo } from "@/hooks/useUserInfo"
import HomeLayout from "@/pages/home/Layout"
import { LoaderCircle } from "lucide-react"
import { Navigate } from "react-router-dom"

function HomePage() {
  const accessToken = localStorage.getItem("accessToken")
  const refreshToken = localStorage.getItem("refreshToken")
  if (!accessToken || !refreshToken) { return <Navigate to="/auth/login" /> }

  const { userInfo, error, loading } = useUserInfo()
  if (error) { return <Navigate to="/auth/login" /> }
  if (!(userInfo === null)) { return <HomeLayout ><><Header /><Main userInfo={userInfo} /></></HomeLayout > }

  return (
    <>
      {loading && <div className="flex justify-center"><LoaderCircle size={48} className="animate-spin" /></div>}
    </>
  )
}

export default HomePage