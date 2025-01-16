import { Smile } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

function ProfileSection() {
  return (
    <div className="flex items-center gap-x-3 text-slate-900">
      <div>{localStorage.getItem("email")}</div>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback><Smile size={16} /></AvatarFallback>
      </Avatar>
    </div>
  )
}

export default ProfileSection