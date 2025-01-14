import { Smile } from "lucide-react"

function ProfileSection() {
  return (
    <div className="flex items-center gap-x-3 text-slate-900">
      <div>{localStorage.getItem("email")}</div>
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-200"><Smile size={16} /></div>
    </div>
  )
}

export default ProfileSection