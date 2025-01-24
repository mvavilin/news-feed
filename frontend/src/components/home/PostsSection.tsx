import ControlPanel from "@/components/home/ControlPanel"
import { IUserInfo } from "@/models"

interface IPostsSectionProps { userInfo: IUserInfo | null }

function PostsSection({ userInfo }: IPostsSectionProps) {
  return (
    <section className="max-w-3xl flex-grow flex flex-col gap-y-6" >
      <ControlPanel userInfo={userInfo} />
    </section >
  )
}

export default PostsSection