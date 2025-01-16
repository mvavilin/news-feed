import SideBar from "@/components/home/SideBar"
import PostsSection from "@/components/home/PostsSection"
import Adv from "@/assets/adv.png"

function Main() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-4/5 h-screen flex justify-between gap-x-8">
        <SideBar />
        <PostsSection />
        <div className="basis-52 rounded-md overflow-hidden"><img src={Adv} alt="Adv" /></div>
      </div>
    </div>
  )
}

export default Main