import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type ValidElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";

interface AnimatedTextProps {
  text: string;
  className?: string;
  element?: ValidElement;
  animation?: "fade-in" | "fade-in-up" | "reveal" | "typewriter" | "none";
  delay?: number;
  duration?: number;
  once?: boolean;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className,
  element: Tag = "p",
  animation = "fade-in",
  delay = 0,
  duration = 500,
  once = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [displayText, setDisplayText] = useState(
    animation === "typewriter" ? "" : text,
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!once || !isDone)) {
          setIsVisible(true);
          setIsDone(true);
        } else if (!entry.isIntersecting && !once) {
          setIsVisible(false);
        }
      },
      { threshold: 0.1 },
    );

    const element = document.getElementById(`animated-text-${delay}`);
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [delay, once, isDone]);

  useEffect(() => {
    if (animation === "typewriter" && isVisible) {
      let i = 0;
      const typeInterval = setInterval(() => {
        if (i < text.length) {
          setDisplayText(text.substring(0, i + 1));
          i++;
        } else {
          clearInterval(typeInterval);
        }
      }, duration / text.length);

      return () => clearInterval(typeInterval);
    }
  }, [animation, isVisible, text, duration]);

  const getAnimationClass = () => {
    if (!isVisible) return "opacity-0";

    switch (animation) {
      case "fade-in":
        return "animate-fade-in";
      case "fade-in-up":
        return "animate-fade-in-up";
      case "reveal":
        return "animate-slide-in-right";
      case "typewriter":
        return "opacity-100";
      case "none":
        return "opacity-100";
      default:
        return "animate-fade-in";
    }
  };

  return React.createElement(
    Tag,
    {
      id: `animated-text-${delay}`,
      className: cn(getAnimationClass(), "transition-opacity", className),
      style: {
        animationDuration: `${duration}ms`,
        animationDelay: `${delay}ms`,
        transitionDelay: `${delay}ms`,
      },
    },
    displayText,
  );
};

export default AnimatedText;
