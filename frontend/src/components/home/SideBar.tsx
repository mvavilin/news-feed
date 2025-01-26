import SideMenu from "@/components/home/SideMenu"
import ExitButton from "@/components/home/ExitButton"


function SideBar() {
  return (
    <div className="fixed w-52 h-5/6 flex flex-col justify-between pb-20">
      <SideMenu />
      <div><ExitButton /></div>
    </div>
  )
}

export default SideBar