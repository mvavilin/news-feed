import { RadioGroup } from "@radix-ui/react-radio-group"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import Posts from "@/components/home/Posts"
import RadioItem from "@/components/home/RadioItem"
import Modal from "@/components/home/Modal"
import CreatePost from "@/components/home/CreatePost"

function ControlPanel() {
  const [filterPosts, setFilterPosts] = useState("all-posts")

  const [isModalActive, setIsModalActive] = useState(false)
  const openModal = () => {
    setIsModalActive(true)
  }
  const closeModal = () => {
    setIsModalActive(false)
  }

  const renderPosts = () => {
    switch (filterPosts) {
      case "all-posts":
        return <Posts filterPosts={filterPosts} />
      case "my-posts":
        return (
          <>
            <Button className="text-base" onClick={openModal}>Создать пост</Button>
            <Posts filterPosts={filterPosts} />
          </>
        )
      case "drafts":
        return <Posts filterPosts={filterPosts} />
      default:
        return <h2>Error loading posts</h2>
    }
  }

  return (
    <>
      <RadioGroup className="flex self-start p-1 rounded-sm border-2 bg-white font-medium" defaultValue={"all-posts"} value={filterPosts} onValueChange={(value) => { setFilterPosts(value) }}>
        <RadioItem filterPosts={filterPosts} value="all-posts" label="Все посты" />
        <RadioItem filterPosts={filterPosts} value="my-posts" label="Мои посты" />
        <RadioItem filterPosts={filterPosts} value="drafts" label="Черновики" />
      </RadioGroup >

      {renderPosts()}

      <Modal title="Создать пост" active={isModalActive} onClose={closeModal}><CreatePost /></Modal >
    </>
  )
}

export default ControlPanel