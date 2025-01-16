import SideBarButton from "@/components/home/SideBarButton"
import { Newspaper, Phone } from "lucide-react"

function SideMenu() {
  return (
    <div className="grid grid-flow-row gap-y-2">
      <SideBarButton icon={<Newspaper size={16} />} label={"Посты"} />
      <SideBarButton icon={<Phone size={16} />} label={"Контакты"} />
    </div>
  )
}

export default SideMenu