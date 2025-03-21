// import { useEffect, useState } from "react"
// import { Button } from "./ui/button"
// import { Link } from "@tanstack/react-router"
// import { useAuthStore } from "@/store/auth"
// import { UserPopover } from "./UserPopover"
// import { LogOut, MenuIcon, User, LayoutDashboard } from "lucide-react"
// import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
// import { cn } from "@/lib/utils"
//
// export default function Navbar() {
//   const [scrolled, setScrolled] = useState(false)
//   const [sheetOpen, setSheetOpen] = useState(false)
//   const { isAuthenticated, user, SignOut } = useAuthStore()
//
//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 20)
//     window.addEventListener('scroll', handleScroll, { passive: true })
//     return () => window.removeEventListener('scroll', handleScroll)
//   }, [])
//
//   const handleNavigation = () => {
//     setSheetOpen(false)
//   }
//
//   return (
//     <nav className={cn(
//       "sticky top-0 z-50 py-3 border-b backdrop-blur-lg transition-all duration-300",
//       scrolled ? "bg-background/90 border-border/50 shadow-sm" : "bg-background/50 border-transparent"
//     )}>
//       <div className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6">
//         <Link to="/" className="flex items-center gap-2">
//           <h1 className={cn(
//             "text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent",
//             "transition-all duration-300",
//             scrolled ? "text-xl" : ""
//           )}>
//             GoalPlanner
//           </h1>
//         </Link>
//
//         {/* Desktop Navigation */}
//         <div className="hidden sm:flex items-center gap-4">
//           {isAuthenticated ? (
//             <div className="flex items-center gap-4">
//               <Link to="/dashboard">
//                 <Button variant="ghost" className="gap-2 text-foreground/80 hover:text-foreground">
//                   <LayoutDashboard className="h-4 w-4" />
//                   Dashboard
//                 </Button>
//               </Link>
//               {user && <UserPopover data={user} />}
//             </div>
//           ) : (
//             <div className="flex items-center gap-2">
//               <Link to="/sign-in">
//                 <Button variant="outline" className="rounded-full px-6">
//                   Sign In
//                 </Button>
//               </Link>
//               <Link to="/sign-up">
//                 <Button className="rounded-full px-6 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600">
//                   Get Started
//                 </Button>
//               </Link>
//             </div>
//           )}
//         </div>
//
//         {/* Mobile Navigation */}
//         <div className="sm:hidden">
//           <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
//             <SheetTrigger asChild>
//               <MenuIcon className="h-8 w-8 cursor-pointer" />
//             </SheetTrigger>
//             <SheetContent side="left" className="w-[280px] sm:w-[300px] flex flex-col">
//               <SheetHeader className="text-left">
//                 <SheetTitle className="text-purple-600">GoalPlanner</SheetTitle>
//                 <SheetDescription>Stay focused on your goals</SheetDescription>
//               </SheetHeader>
//
//               <div className="flex-1 overflow-y-auto py-4">
//                 {isAuthenticated ? (
//                   <>
//                     {/* User Profile Section */}
//                     <div className="flex items-center gap-3 pb-6">
//                       <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-primary-foreground">
//                         <span className="text-lg font-medium">
//                           {user?.username[0].toUpperCase()}
//                         </span>
//                       </div>
//                       <div>
//                         <h1 className="text-sm font-medium text-foreground">
//                           {user?.username}
//                         </h1>
//                         <p className="text-xs text-muted-foreground">{user?.email}</p>
//                       </div>
//                     </div>
//
//                     {/* Navigation Links */}
//                     <nav className="space-y-1">
//                       <Link
//                         to="/dashboard"
//                         onClick={handleNavigation}
//                         className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-accent"
//                       >
//                         <LayoutDashboard className="h-5 w-5 text-muted-foreground" />
//                         <span className="text-sm">Dashboard</span>
//                       </Link>
//                       <Link
//                         to="/profile"
//                         onClick={handleNavigation}
//                         className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-accent"
//                       >
//                         <User className="h-5 w-5 text-muted-foreground" />
//                         <span className="text-sm">Profile</span>
//                       </Link>
//                     </nav>
//                   </>
//                 ) : (
//                   <div className="space-y-4">
//                     <Link to="/sign-in" onClick={handleNavigation}>
//                       <Button className="w-full rounded-lg">Sign In</Button>
//                     </Link>
//                     <Link to="/sign-up" onClick={handleNavigation}>
//                       <Button variant="outline" className="w-full rounded-lg">
//                         Create Account
//                       </Button>
//                     </Link>
//                   </div>
//                 )}
//               </div>
//
//               {/* Sign Out Button */}
//               {isAuthenticated && (
//                 <div className="pt-4 border-t">
//                   <Button
//                     onClick={() => {
//                       SignOut()
//                       handleNavigation()
//                     }}
//                     variant="ghost"
//                     className="w-full justify-start gap-3 px-2 text-destructive hover:bg-destructive/10"
//                   >
//                     <LogOut className="h-5 w-5" />
//                     <span className="text-sm">Sign Out</span>
//                   </Button>
//                 </div>
//               )}
//             </SheetContent>
//           </Sheet>
//         </div>
//       </div>
//     </nav>
//   )
// }
//

import React, { useState, useEffect } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import Button from "./ui/button-custom";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";

const NavBar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "py-2 glass-card shadow-sm" : "py-4 bg-transparent",
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center">
              <span className="font-bold text-xl text-goal-900">GOALSET</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-sm font-medium text-goal-800 hover:text-goal-600 transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-goal-800 hover:text-goal-600 transition-colors"
            >
              How It Works
            </a>
            <div className="relative group">
              <button className="flex items-center text-sm font-medium text-goal-800 hover:text-goal-600 transition-colors">
                Testimonials
                <ChevronDown
                  size={16}
                  className="ml-1 group-hover:rotate-180 transition-transform duration-200"
                />
              </button>
              <div className="absolute left-0 mt-2 w-48 rounded-lg p-2 glass-card shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <a
                  href="#testimonials"
                  className="block px-4 py-2 text-sm text-goal-800 rounded-md hover:bg-goal-50 transition-colors"
                >
                  Success Stories
                </a>
                <a
                  href="#testimonials"
                  className="block px-4 py-2 text-sm text-goal-800 rounded-md hover:bg-goal-50 transition-colors"
                >
                  User Reviews
                </a>
              </div>
            </div>
          </nav>

          {/* Call to Action */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/sign-in"
              className="text-sm font-medium text-goal-800 hover:text-goal-600 transition-colors"
            >
              Login
            </Link>
            <Button>
              <Link to="/sign-up">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden rounded-full p-2 text-goal-800 hover:bg-goal-50 transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden absolute top-full left-0 right-0 glass-card overflow-hidden transition-all duration-300",
            isMobileMenuOpen
              ? "max-h-screen opacity-100  py-4"
              : "max-h-0 opacity-0",
          )}
        >
          <div className="flex flex-col px-4 space-y-4">
            <a
              href="#features"
              className="text-base font-medium text-goal-800 hover:text-goal-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-base font-medium text-goal-800 hover:text-goal-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              How It Works
            </a>
            <a
              href="#testimonials"
              className="text-base font-medium text-goal-800 hover:text-goal-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Testimonials
            </a>
            <Link
              to="/sign-in"
              className="text-base font-medium text-goal-800 hover:text-goal-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login
            </Link>
            <div className="pt-2">
              <Button fullWidth>
                <Link to="/sign-up">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
