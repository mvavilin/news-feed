import SideBar from "@/components/home/side-bar"
import Posts from "@/components/home/posts"
import Adv from "@/assets/adv.png"

function Main() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-2/3 h-screen flex justify-between gap-x-8">
        <SideBar />
        <Posts />
        <div className="basis-52 rounded-md overflow-hidden"><img src={Adv} alt="Adv" /></div>
      </div>
    </div>
  )
}

export default Main