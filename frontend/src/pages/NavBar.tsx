import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { PenSquare } from 'lucide-react'
import { useNavigate } from "react-router-dom"

export const NavBar = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem("user");
  const handleClick = () => {
    navigate('/post');
  }

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-bold text-gray-900">
              BlogHub
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <Button className="bg-green-500 hover:bg-green-600 text-white" onClick={handleClick}>
              <PenSquare className="mr-2 h-4 w-4" />
              New Post
            </Button>
            <div className="flex items-center space-x-2">
              <Avatar>
                <AvatarImage src="/placeholder.svg" alt="User avatar" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-gray-700">{name}</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}