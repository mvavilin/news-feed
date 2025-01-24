import { usePosts } from "@/hooks/usePosts"
import Post from "@/components/home/Post"
import { IPost, IUserInfo } from "@/models"
import { Button } from "@/components/ui/button"
import Modal from "@/components/home/Modal"
import { useState } from "react"
import axios, { AxiosError } from "axios"
import EditPost from "@/components/home/EditPost"
import { useNavigate } from "react-router-dom"
import { LoaderCircle } from "lucide-react"

interface IPostsProps { role: string | undefined, filterPosts: string, userInfo: IUserInfo | null }

function Posts({ role, filterPosts, userInfo }: IPostsProps) {
  const navigate = useNavigate()
  const { loading, error, posts } = usePosts()

  const [isModalActive, setIsModalActive] = useState(false)
  const [currentPostId, setCurrentPostId] = useState<number | null>(null)
  const [currentStatus, setCurrentStatus] = useState("")
  const [currentTitle, setCurrentTitle] = useState("")
  const [currentContent, setCurrentContent] = useState("")
  const [currentPostImages, setCurrentPostImages] = useState<[]>([])
  const openModal = (postId: number, status: string, images: [], title: string, content: string) => {
    setCurrentPostId(postId)
    setCurrentStatus(status)
    setCurrentPostImages(images)
    setIsModalActive(true)
    setCurrentTitle(title)
    setCurrentContent(content)
  }
  const closeModal = () => {
    setCurrentPostId(null)
    setCurrentStatus("")
    setIsModalActive(false)
    setCurrentTitle("")
    setCurrentContent("")
  }

  let filteredAndSortedPosts: IPost[]
  filteredAndSortedPosts = []
  const renderPosts = () => {
    if (role === "Author") {
      switch (filterPosts) {
        case "all-posts":
          filteredAndSortedPosts = posts
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
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
      }
    } else if (role === "Reader") {
      return filteredAndSortedPosts = posts
        .filter(post => post.status === "published")
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }
  }

  const renderPostButtons = (id: number, status: string, images: [], title: string, content: string) => {
    if (role === "Reader") { return <></> }
    if (role === "Author") {
      switch (status) {
        case "published": return <Button onClick={() => openModal(id, status, images, title, content)} variant={"secondary"}>Редактировать</Button>
        case "draft":
          return <>
            <Button onClick={() => sendToPublish(id)}>Опубликовать пост</Button>
            <Button onClick={() => openModal(id, status, images, title, content)} variant={"secondary"}>Редактировать</Button>
          </>
      }
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
      {filteredAndSortedPosts && filteredAndSortedPosts.map((post) => <Post userInfo={userInfo} post={post} key={post.id}>{renderPostButtons(post.id, post.status, post.images, post.title, post.content)}</Post>)}
      {isModalActive ? <Modal title="Редкатировать пост" active={isModalActive} onClose={closeModal}><EditPost postId={currentPostId} postStatus={currentStatus} postImages={currentPostImages} postTitle={currentTitle} postContent={currentContent} /></Modal> : <></>}
    </>
  )
}

export default Posts