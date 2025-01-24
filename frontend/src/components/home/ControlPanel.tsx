import { RadioGroup } from "@radix-ui/react-radio-group"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import Posts from "@/components/home/Posts"
import RadioItem from "@/components/home/RadioItem"
import Modal from "@/components/home/Modal"
import CreatePost from "@/components/home/CreatePost"
import { IUserInfo } from "@/models"

interface IControlPanelProps { userInfo: IUserInfo | null }

function ControlPanel({ userInfo }: IControlPanelProps) {
  const role = userInfo?.role

  const [filterPosts, setFilterPosts] = useState("all-posts")

  const [isModalActive, setIsModalActive] = useState(false)
  const openModal = () => {
    setIsModalActive(true)
  }
  const closeModal = () => {
    setIsModalActive(false)
  }

  const renderPosts = (role: string | undefined) => {
    if (role === "Author") {
      switch (filterPosts) {
        case "all-posts": return <Posts role={role} userInfo={userInfo} filterPosts={"all-posts"} />
        case "my-posts":
          return (
            <>
              <Button className="text-base" onClick={openModal}>Создать пост</Button>
              <Posts userInfo={userInfo} role={role} filterPosts={"my-posts"} />
            </>
          )
        case "drafts": return <Posts userInfo={userInfo} role={role} filterPosts={"drafts"} />
        default: return <h2>Error loading posts</h2>
      }
    } if (role === "Reader") {
      return <Posts userInfo={userInfo} role={role} filterPosts={"all-posts"} />
    }
  }

  return (
    <>
      {
        role === "Author"
          ?
          <RadioGroup className="flex self-start p-1 rounded-sm border-2 bg-white font-medium" defaultValue={"all-posts"} value={filterPosts} onValueChange={(value) => { setFilterPosts(value) }}>
            <RadioItem filterPosts={filterPosts} value="all-posts" label="Все посты" />
            <RadioItem filterPosts={filterPosts} value="my-posts" label="Мои посты" />
            <RadioItem filterPosts={filterPosts} value="drafts" label="Черновики" />
          </RadioGroup >
          : <></>
      }

      {renderPosts(role)}

      <Modal title="Создать пост" active={isModalActive} onClose={closeModal}><CreatePost /></Modal >
    </>
  )
}

export default ControlPanel