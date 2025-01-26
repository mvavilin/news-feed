import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

function ExitButton() {
  const navigate = useNavigate()

  function Exit() {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    navigate("/auth/login")
  }

  return (
    <Button
      variant={"link"}
      className="w-52 flex justify-start px-4 py-2 gap-2.5 rounded-md font-normal text-slate-400 cursor-pointer hover:bg-slate-100 hover:text-inherit hover:font-medium hover:no-underline duration-150"
      onClick={Exit}
    >
      <LogOut />
      <span>Выйти</span>
    </Button>
  )
}

export default ExitButton