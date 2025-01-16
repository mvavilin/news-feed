import Header from "@/components/home/Header"
import Main from "@/components/home/Main"
import HomeLayout from "@/pages/home/Layout"

function HomePage() {
  return (
    <HomeLayout children={
      <>
        <Header />
        <Main />
      </>
    } />
  )
}

export default HomePage