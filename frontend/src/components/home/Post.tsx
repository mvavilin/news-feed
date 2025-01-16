import { IPost } from "@/models"
import { Heart, MessageCircle, Smile } from "lucide-react"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface IPostProps { children: React.ReactNode, post: IPost }

function Post({ post, children }: IPostProps) {
  const formatDate = (date: string) => { return format(new Date(date), "d MMMM", { locale: ru }) }

  return (
    <div className="p-4 flex flex-col gap-y-4 rounded-xl bg-white cursor-pointer hover:bg-slate-200 duration-150"    >
      <div className="flex gap-x-2 text-slate-900">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback><Smile size={16} /></AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start">
          <div>{localStorage.getItem("email")}</div>
          <div className="text-xs text-slate-400">{formatDate(post.createdAt)}</div>
        </div>
      </div>

      <h2 className="font-semibold text-xl">{post.title}</h2>

      {/*  */}
      {/* <div
        className="overflow-hidden rounded-sm"
      >
        <img src="" alt="[images]" />
      </div> */}
      {/*  */}

      <p>{post.content}</p>

      <div className="flex gap-x-2">{children}</div>

      <div className="flex gap-x-3">
        <div className="flex items-center justify-center gap-x-2 bg-slate-50 text-slate-400 font-medium text-xs rounded px-2 py-2"><Heart size={16} /><div>110</div></div>
        <div className="flex items-center justify-center gap-x-2 bg-slate-50 text-slate-400 font-medium text-xs rounded px-2 py-2"><MessageCircle size={16} /><div>110</div></div>
      </div>
    </div>
  )
}

export default Post