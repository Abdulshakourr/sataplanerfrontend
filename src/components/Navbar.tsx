import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Link } from "@tanstack/react-router";

export default function Navbar() {

  const [scrolled, setScrolled] = useState(false)



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

  return (
    <>

      <nav className={`py-4 px-6  fixed top-0 right-0 left-0 ${scrolled ? "bg-background/70 backdrop-blur-md" : "bg-background "}`}>
        <div className="flex items-center justify-between">
          <div>
            <Link to="/">
              <h1 className={`text-2xl font-bold text-purple-600 transition-all ease-in-out ${scrolled ? "text-xl" : ""}`}>GaolPlaner</h1>
            </Link>
          </div>
          <div className="flex gap-4">
            <Link to="/sign-in"><Button size={`lg`} className="bg-purple-500 hover:bg-purple-600 transition-all ease-in-out">Sign in</Button></Link>
            <Link to="/sign-up"><Button size={`lg`} variant={`outline`} className=""> Create account </Button></Link>
          </div>
        </div>
      </nav>
    </>
  )
}
