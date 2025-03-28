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
