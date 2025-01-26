import { IUserInfo } from "@/models"
import { RadioGroup } from "@radix-ui/react-radio-group"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import Posts from "@/components/home/Posts"
import RadioItem from "@/components/home/RadioItem"
import Modal from "@/components/home/Modal"
import CreatePost from "@/components/home/CreatePost"

function PostsSection({ userInfo }: { userInfo: IUserInfo }) {
  const [selectedPosts, setSelectedPosts] = useState("all-posts")
  const [isModalActive, setIsModalActive] = useState(false)

  const openModal = () => setIsModalActive(true)
  const closeModal = () => setIsModalActive(false)

  const renderControlPanel = () => {
    if (userInfo.role === "Author") {
      return (
        <>
          <RadioGroup className="flex self-start p-1 rounded-sm border-2 bg-white font-medium" defaultValue={"all-posts"} value={selectedPosts} onValueChange={(value) => { setSelectedPosts(value) }}>
            <RadioItem selectedPosts={selectedPosts} value="all-posts" label="Все посты" />
            <RadioItem selectedPosts={selectedPosts} value="my-posts" label="Мои посты" />
            <RadioItem selectedPosts={selectedPosts} value="drafts" label="Черновики" />
          </RadioGroup >
          {selectedPosts === "my-posts" ? <Button className="text-base" onClick={openModal}>Создать пост</Button> : <></>}
          <Modal title="Создать пост" active={isModalActive} onClose={closeModal}><CreatePost /></Modal >
        </>
      )
    }
  }
  const renderPosts = () => {
    if (userInfo.role !== null) {
      return <Posts userInfo={userInfo} selectedPosts={selectedPosts} />
    }
    else {
      return <h2 className="text-center">Error loading posts</h2>
    }
  }

  return (
    <section className="max-w-3xl flex-grow flex flex-col gap-y-6" >
      {renderControlPanel()}
      {renderPosts()}
    </section>
  )
}

export default PostsSection