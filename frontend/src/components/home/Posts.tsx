import { usePosts } from "@/hooks/usePosts"
import Post from "@/components/home/Post"
import { IPost, IPostsProps } from "@/models"
import { Button } from "@/components/ui/button"
import Modal from "@/components/home/Modal"
import { useState } from "react"
import EditPost from "@/components/home/EditPost"
import { LoaderCircle } from "lucide-react"
import { changePostStatus } from "@/api/postService"
import { useNavigate } from "react-router-dom"

function Posts({ userInfo, selectedPosts }: IPostsProps) {
  const navigate = useNavigate()
  const { loading, error, posts } = usePosts()

  const [isModalActive, setIsModalActive] = useState(false)
  const defaultStatePost: IPost = { authorId: -1, content: "", createdAt: "", id: -1, images: [], status: "", title: "", updatedAt: "" }
  const [currentPost, setCurrentPost] = useState<IPost>(defaultStatePost)
  const openModal = (post: IPost) => { setIsModalActive(true), setCurrentPost(post) }
  const closeModal = () => { setIsModalActive(false), setCurrentPost(defaultStatePost) }

  const filterPosts = (posts: IPost[], filter: string) => { return posts.filter(post => post.status === filter) }
  const sortPosts = (posts: IPost[]) => { return posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) }
  const renderPosts: IPost[] = (() => {
    switch (userInfo.role) {
      case "Author":
        switch (selectedPosts) {
          case "all-posts": return sortPosts(posts)
          case "my-posts": return sortPosts(filterPosts(posts, "published"))
          case "drafts": return sortPosts(filterPosts(posts, "draft"))
          default: return []
        }
      case "Reader":
        return sortPosts(filterPosts(posts, "published"))
      default: return []
    }
  })()

  const renderPostButtons = (post: IPost) => {
    switch (userInfo.role) {
      case "Author":
        switch (post.status) {
          case "published": return <Button onClick={() => openModal(post)} variant={"secondary"}>Редактировать</Button>
          case "draft": return <>
            <Button onClick={() => { changePostStatus(post.id), navigate(0) }}>Опубликовать пост</Button>
            <Button onClick={() => openModal(post)} variant={"secondary"}>Редактировать</Button>
          </>
          default: return <></>
        }
      default: <></>
    }
  }

  return (
    <>
      {loading && <div className="flex justify-center"><LoaderCircle size={48} className="animate-spin" /></div>}
      {error && <div className="flex justify-center">{error}</div>}
      {renderPosts.map((post) => <Post key={post.id} userInfo={userInfo} post={post}>{renderPostButtons(post)}</Post>)}
      {isModalActive ? <Modal title="Редкатировать пост" active={isModalActive} onClose={closeModal}><EditPost post={currentPost} /></Modal> : <></>}
    </>
  )
}

export default Posts