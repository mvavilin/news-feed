import { updateRefreshToken } from "@/api/postService"
import Header from "@/components/home/Header"
import Main from "@/components/home/Main"
import { useUserInfo } from "@/hooks/useUserInfo"
import HomeLayout from "@/pages/home/Layout"
import { LoaderCircle } from "lucide-react"
import { useNavigate } from "react-router-dom"

function HomePage() {
  // Refactor
  const navigate = useNavigate()
  const accessToken = localStorage.getItem("accessToken")
  const refreshToken = localStorage.getItem("refreshToken")
  if ((accessToken === null) || (refreshToken === null)) { navigate("/") }
  else {
    const updateTokens = async () => {
      const response = await updateRefreshToken(refreshToken)
      if (response === undefined) {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        navigate("/")
      }
      else {
        localStorage.setItem("accessToken", response.data.accessToken)
        localStorage.setItem("refreshToken", response.data.refreshToken)
      }
    }
    updateTokens()
  }
  // Refactor

  const { userInfo, error, loading } = useUserInfo()
  if (error) { navigate("/login") }
  if (!(userInfo === null)) {
    return <>
      <HomeLayout>
        <Header userInfo={userInfo} />
        <Main userInfo={userInfo} />
      </HomeLayout>
    </>
  }

  return <>
    {loading && <div className="w-full h-screen flex justify-center items-center"><LoaderCircle size={48} className="animate-spin" /></div>}
  </>
}

export default HomePage