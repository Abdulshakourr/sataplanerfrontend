import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { Link } from "@tanstack/react-router"
import { useAuthStore } from "@/store/auth"
import { UserPopover } from "./UserPopover"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { isAuthenticated, user } = useAuthStore()

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20
      setScrolled(isScrolled)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`sticky top-0 z-50 py-3 border-b border-gray-100 backdrop-blur-md transition-all duration-300 ${scrolled ? 'bg-background/80' : 'bg-background/50'}`}>
      <div className="flex items-center justify-between max-w-6xl mx-auto px-6">
        <Link to="/">
          <h1 className={`text-2xl font-bold text-purple-600 transition-all duration-300 ease-in-out ${scrolled ? 'text-xl' : ''}`}>
            GaolPlaner
          </h1>
        </Link>

        <div className="gap-4 hidden sm:flex">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link to="/dashboard">
                <Button size="lg" variant="outline">
                  Dashboard
                </Button>
              </Link>
              {user && <UserPopover data={user} />}
            </div>
          ) : (
            <>
              <Link to="/sign-in">
                <Button size="lg" className="bg-purple-500 hover:bg-purple-600">
                  Sign in
                </Button>
              </Link>
              <Link to="/sign-up">
                <Button size="lg" variant="outline">
                  Create account
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* mobile nav */}

      </div>
    </nav>
  )
}
