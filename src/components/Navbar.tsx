import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Link } from "@tanstack/react-router";
import { useAuthStore } from "@/store/auth";
import { UserPopover } from "./UserPopover";

export default function Navbar() {

  const [scrolled, setScrolled] = useState(false)

  const { isAuthenticated, user, SignOut } = useAuthStore()

  console.log("NavU", user)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    document.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      document.removeEventListener("scroll", handleScroll)
    }

  }, [scrolled])
  // ${scrolled ? "bg-background/80 backdrop-blur-md " : "bg-background/50 backdrop-blur-sm "}
  return (
    <>
      <nav className={`sticky top-0 z-50 py-3 border-b border-gray-100 backdrop-blur-md `}>
        <div className="flex items-center justify-between max-w-6xl mx-auto px-6">
          <div>
            <Link to="/">
              <h1 className={`text-2xl font-bold text-purple-600 transition-all ease-in-out ${scrolled ? "text-xl" : ""}`}>GaolPlaner</h1>
            </Link>
          </div>
          <div className=" gap-4 hidden sm:flex">
            {
              isAuthenticated ?
                <>
                  <div className="flex justify-center items-center gap-4">
                    <Link to="/dashboard"><Button size={`lg`} variant={`outline`} className=""> Dashboard </Button></Link>
                    {
                      user && <UserPopover data={user} SignOut={SignOut} />
                    }
                  </div>
                </>
                : <>
                  <Link to="/sign-in"><Button size={`lg`} className="bg-purple-500 hover:bg-purple-600 transition-all ease-in-out">Sign in</Button></Link>
                  <Link to="/sign-up"><Button size={`lg`} variant={`outline`} className=""> Create account </Button></Link>
                </>
            }
          </div>
        </div>
      </nav>
    </>
  )
}
