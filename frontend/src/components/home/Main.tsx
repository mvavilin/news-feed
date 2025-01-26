import SideBar from "@/components/home/SideBar"
import PostsSection from "@/components/home/PostsSection"
import Adv from "@/assets/adv.png"
import { IUserInfo } from "@/models"

function Main({ userInfo }: { userInfo: IUserInfo }) {
  return (
    <div className="w-full flex justify-center">
      <div className="w-4/5 h-screen flex justify-between gap-x-8">
        <aside className="basis-52 flex-shrink-0 md:block hidden"><SideBar /></aside >
        <PostsSection userInfo={userInfo} />
        <div className="basis-52 flex-shrink-0 md:block hidden rounded-md overflow-hidden"><img src={Adv} alt="Adv" /></div>
      </div>
    </div>
  )
}

export default Main