interface AuthHeaderProps {
  title: string
}

function AuthHeader({ title }: AuthHeaderProps) {
  return (
    <div className="w-full flex flex-col gap-y-4 justify-center">
      <h1 className="text-xl font-semibold">{title}</h1>
    </div>
  )
}

export default AuthHeader