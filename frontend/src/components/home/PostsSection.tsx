import ControlPanel from "@/components/home/ControlPanel"

function PostsSection() {
  return (
    <section className="max-w-3xl flex-grow flex flex-col gap-y-6" >
      {/*  */}
      {localStorage.getItem("role") === "author" ? <ControlPanel role={"author"} /> : <ControlPanel role={"reader"} />}
      {/*  */}
    </section >
  )
}

export default PostsSection