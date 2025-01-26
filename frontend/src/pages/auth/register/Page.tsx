import { updateRefreshToken } from "@/api/postService"
import RegisterForm from "@/components/auth/RegisterForm"
import AuthLayout from "@/pages/auth/Layout"
import { useNavigate } from "react-router-dom"

function RegisterPage() {
  // Refactor
  const navigate = useNavigate()
  const accessToken = localStorage.getItem("accessToken")
  const refreshToken = localStorage.getItem("refreshToken")
  if ((accessToken === null) || (refreshToken === null)) { return <AuthLayout children={<RegisterForm />} /> }
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
        navigate("/home")
      }
    }
    updateTokens()
  }
  // Refactor
}

export default RegisterPage