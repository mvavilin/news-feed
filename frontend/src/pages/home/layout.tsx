function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex flex-col items-center gap-y-12">
      {children}
    </div>
  )
}

export default HomeLayout