import Header from "@/components/home/header"
import Main from "@/components/home/main"
import HomeLayout from "@/pages/home/layout"

function HomePage() {
  return (
    <HomeLayout
      children={
        <>
          <Header />
          <Main />
        </>
      }
    />
  )
}

export default HomePage