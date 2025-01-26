import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { IUserInfo } from "@/models"
import { User } from "lucide-react"

function ProfileSection({ userInfo }: { userInfo: IUserInfo }) {
  return (
    <div className="flex items-center gap-x-3 text-slate-900">
      <div>
        {userInfo.email}
      </div>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback><User /></AvatarFallback>
      </Avatar>
    </div>
  )
}

export default ProfileSection