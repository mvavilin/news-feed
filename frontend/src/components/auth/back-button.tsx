import { Link } from "react-router-dom"
import { Button } from "../ui/button"

interface BackButtonProps {
  label: string
  link: string
  href: string
}

function BackButton({ label, link, href }: BackButtonProps) {
  return (
    <div className="text-sm w-full flex items-center h-6">
      <p>
        {label}
      </p>
      <Button variant="link" className="text-indigo-500 font-normal p-1" size="sm" asChild>
        <Link to={href}>
          {link}
        </Link>
      </Button>
    </div>
  )
}

export default BackButton