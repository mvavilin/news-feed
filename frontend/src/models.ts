export interface IPost {
  authorId: number
  content: string
  createdAt: string
  id: number
  images: []
  status: string
  title: string
  updatedAt: string
}

export interface IUserInfo {
  id: number
  role: string
  email: string
}

export interface IImage {
  createdAt: string
  id: number
  imageUrl: string
}

export interface IErrorResponse {
  error: string
}

// Props

export interface IRadioItemProps {
  selectedPosts: string
  value: string
  label: string
}

export interface IPostsProps {
  userInfo: IUserInfo
  selectedPosts: string
}

export interface IPostProps {
  userInfo: IUserInfo
  post: IPost
  children: React.ReactNode
}