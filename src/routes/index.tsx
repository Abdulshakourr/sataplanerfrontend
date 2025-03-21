import { createFileRoute } from "@tanstack/react-router";
import React, { useEffect } from "react";
import NavBar from "../components/Navbar.tsx";
import Hero from "../components/Hero";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

// Import for animations
import { motion, AnimatePresence } from "framer-motion";
export const Route = createFileRoute("/")({
  component: Home,
});

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);

    // Add scroll behavior for hash links
    const handleHashClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");

      if (link && link.hash && link.hash.startsWith("#")) {
        e.preventDefault();

        const targetElement = document.querySelector(link.hash);
        if (targetElement) {
          const navbarHeight = 80; // Approximate navbar height
          const targetPosition =
            targetElement.getBoundingClientRect().top +
            window.scrollY -
            navbarHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }
      }
    };

    document.addEventListener("click", handleHashClick);

    return () => {
      document.removeEventListener("click", handleHashClick);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen flex flex-col"
      >
        <NavBar />

        <main className="flex-grow">
          <Hero />
          {/* <Features /> */}
          {/* <HowItWorks /> */}
          {/* <Testimonials /> */}
          {/* <CTA /> */}
        </main>

        {/* <Footer /> */}
      </motion.div>
    </AnimatePresence>
  );
}
