import SideMenu from "@/components/home/SideMenu"
import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

function SideBar() {
  const navigate = useNavigate()

  function Exit() {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("email")
    // 
    localStorage.removeItem("role")
    // 
    navigate("/auth/login")
  }

  return (
    <aside className="basis-52 h-5/6 pb-20 flex flex-col justify-between flex-shrink-0">
      <SideMenu />
      <Button variant={"link"} className="w-full flex gap-2.5 justify-start rounded-md px-4 py-2 font-normal text-slate-400 cursor-pointer hover:bg-slate-100 hover:text-inherit hover:font-medium hover:no-underline duration-150" onClick={Exit}>
        <LogOut />
        Выйти
      </Button>
    </aside >
  )
}

export default SideBar