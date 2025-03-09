import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { Link } from "@tanstack/react-router"
import { useAuthStore } from "@/store/auth"
import { UserPopover } from "./UserPopover"
import { LogOut, MenuIcon, User, LayoutDashboard } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)
  const { isAuthenticated, user, SignOut } = useAuthStore()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavigation = () => {
    setSheetOpen(false)
  }

  return (
    <nav className={cn(
      "sticky top-0 z-50 py-3 border-b backdrop-blur-lg transition-all duration-300",
      scrolled ? "bg-background/90 border-border/50 shadow-sm" : "bg-background/50 border-transparent"
    )}>
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <h1 className={cn(
            "text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent",
            "transition-all duration-300",
            scrolled ? "text-xl" : ""
          )}>
            GoalPlanner
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden sm:flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link to="/dashboard">
                <Button variant="ghost" className="gap-2 text-foreground/80 hover:text-foreground">
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              {user && <UserPopover data={user} />}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/sign-in">
                <Button variant="outline" className="rounded-full px-6">
                  Sign In
                </Button>
              </Link>
              <Link to="/sign-up">
                <Button className="rounded-full px-6 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600">
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="sm:hidden">
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <MenuIcon className="h-8 w-8 cursor-pointer" />
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] sm:w-[300px] flex flex-col">
              <SheetHeader className="text-left">
                <SheetTitle className="text-purple-600">GoalPlanner</SheetTitle>
                <SheetDescription>Stay focused on your goals</SheetDescription>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto py-4">
                {isAuthenticated ? (
                  <>
                    {/* User Profile Section */}
                    <div className="flex items-center gap-3 pb-6">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-primary-foreground">
                        <span className="text-lg font-medium">
                          {user?.username[0].toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <h1 className="text-sm font-medium text-foreground">
                          {user?.username}
                        </h1>
                        <p className="text-xs text-muted-foreground">{user?.email}</p>
                      </div>
                    </div>

                    {/* Navigation Links */}
                    <nav className="space-y-1">
                      <Link
                        to="/dashboard"
                        onClick={handleNavigation}
                        className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-accent"
                      >
                        <LayoutDashboard className="h-5 w-5 text-muted-foreground" />
                        <span className="text-sm">Dashboard</span>
                      </Link>
                      <Link
                        to="/profile"
                        onClick={handleNavigation}
                        className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-accent"
                      >
                        <User className="h-5 w-5 text-muted-foreground" />
                        <span className="text-sm">Profile</span>
                      </Link>
                    </nav>
                  </>
                ) : (
                  <div className="space-y-4">
                    <Link to="/sign-in" onClick={handleNavigation}>
                      <Button className="w-full rounded-lg">Sign In</Button>
                    </Link>
                    <Link to="/sign-up" onClick={handleNavigation}>
                      <Button variant="outline" className="w-full rounded-lg">
                        Create Account
                      </Button>
                    </Link>
                  </div>
                )}
              </div>

              {/* Sign Out Button */}
              {isAuthenticated && (
                <div className="pt-4 border-t">
                  <Button
                    onClick={() => {
                      SignOut()
                      handleNavigation()
                    }}
                    variant="ghost"
                    className="w-full justify-start gap-3 px-2 text-destructive hover:bg-destructive/10"
                  >
                    <LogOut className="h-5 w-5" />
                    <span className="text-sm">Sign Out</span>
                  </Button>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
