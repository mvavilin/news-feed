import Logo from "@/assets/logo.svg"
import ProfileSection from "@/components/home/ProfileSection"
import { IUserInfo } from "@/models"

function Header({ userInfo }: { userInfo: IUserInfo }) {
  return (
    <div className="w-full flex justify-center bg-white">
      <div className="w-4/5 flex justify-between items-center gap-x-8 py-5">
        <img className="block max-h-5" src={Logo} alt="Logo" />
        <ProfileSection userInfo={userInfo} />
      </div>
    </div>
  )
}

export default Header