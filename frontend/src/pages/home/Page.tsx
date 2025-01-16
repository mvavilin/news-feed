import Header from "@/components/home/Header"
import Main from "@/components/home/Main"
import HomeLayout from "@/pages/home/Layout"
import { Navigate } from "react-router-dom"

function HomePage() {
  return (
    <>
      {
        ((localStorage.getItem("accessToken") === null) || (localStorage.getItem("refreshToken") === null))
          ? <Navigate to="/auth/login" />
          :
          < HomeLayout children={
            <>
              <Header />
              <Main />
            </>
          } />
      }
    </>
  )
}

export default HomePage