import { usePosts } from "@/hooks/usePosts"
import Post from "@/components/home/Post"
import { IPost } from "@/models"
import { Button } from "@/components/ui/button"
import Modal from "@/components/home/Modal"
import { useState } from "react"
import axios, { AxiosError } from "axios"
import EditPost from "@/components/home/EditPost"
import { useNavigate } from "react-router-dom"
import { LoaderCircle } from "lucide-react"

interface IPostsProps { filterPosts: string }

function Posts({ filterPosts }: IPostsProps) {
  const navigate = useNavigate()
  const { loading, error, posts } = usePosts()

  const [isModalActive, setIsModalActive] = useState(false)
  const [currentPostId, setCurrentPostId] = useState<number | null>(null)
  const [currentStatus, setCurrentStatus] = useState("")
  const openModal = (postId: number, status: string) => {
    setCurrentPostId(postId)
    setCurrentStatus(status)
    setIsModalActive(true)
  }
  const closeModal = () => {
    setCurrentPostId(null)
    setCurrentStatus("")
    setIsModalActive(false)
  }

  let filteredAndSortedPosts: IPost[]
  filteredAndSortedPosts = []
  const renderPosts = () => {
    switch (filterPosts) {
      case "all-posts":
        filteredAndSortedPosts = posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case "my-posts":
        filteredAndSortedPosts = posts
          .filter(post => post.status === "published")
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case "drafts":
        filteredAndSortedPosts = posts
          .filter(post => post.status === "draft")
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break

      case "Reader":
        break
    }
  }

  const renderPostButtons = (id: number, status: string) => {
    switch (status) {
      case "published":
        return <Button onClick={() => openModal(id, status)} variant={"secondary"} >Редактировать</Button>
      case "draft":
        return <>
          <Button onClick={() => sendToPublish(id)}>Опубликовать пост</Button>
          <Button onClick={() => openModal(id, status)} variant={"secondary"}>Редактировать</Button>
        </>
    }
  }

  async function sendToPublish(id: number) {
    try {
      await axios.patch(`https://cpt-stage-2.duckdns.org/api/posts/${id}/status`, { status: "published" }, { headers: { "Authorization": `Bearer ${localStorage.getItem("accessToken")}`, "Content-Type": "application/json" } })
      navigate(0)
    } catch (e: unknown) {
      const error = e as AxiosError
      console.error("Error sending data:", error.response?.data || error.message)
    }
  }

  renderPosts()
  return (
    <>
      {loading && <div className="flex justify-center"><LoaderCircle size={48} className="animate-spin" /></div>}
      {error && <div className="flex justify-center">{error}</div>}
      {filteredAndSortedPosts && filteredAndSortedPosts.map((post) => <Post post={post} key={post.id}>{renderPostButtons(post.id, post.status)}</Post>)}
      {isModalActive ? <Modal title="Редкатировать пост" active={isModalActive} onClose={closeModal}><EditPost postId={currentPostId} postStatus={currentStatus} /></Modal> : <></>}
    </>
  )
}

export default Posts