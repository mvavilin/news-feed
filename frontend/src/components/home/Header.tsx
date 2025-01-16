import Logo from "@/assets/logo.svg"
import ProfileSection from "@/components/home/ProfileSection"

function Header() {
  return (
    <div className="w-full flex justify-center bg-white">
      <div className="w-4/5 flex items-center justify-between py-5">
        <img className="block max-h-5" src={Logo} alt="Logo" />
        <ProfileSection />
      </div>
    </div>
  )
}

export default Header