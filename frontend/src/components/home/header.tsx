import Logo from "@/assets/logo.svg"
import ProfileSection from "@/components/home/profile-section"

function Header() {
  return (
    <div className="w-full flex justify-center bg-white">
      <div className="w-2/3 flex justify-between py-8">
        <img src={Logo} alt="Logo" />
        <ProfileSection />
      </div>
    </div>
  )
}

export default Header