import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import AnimatedText from "../ui/AnimatedText";

interface Testimonial {
  id: number;
  name: string;
  title: string;
  testimonial: string;
  stars: number;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Emily R.",
    title: "Published Author",
    testimonial:
      "I never thought I could achieve my dream of writing a book, but GOALSET made it possible. The daily motivation and progress tracking kept me going, and now I'm a published author!",
    stars: 5,
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
  },
  {
    id: 2,
    name: "Michael K.",
    title: "Marathon Runner",
    testimonial:
      "From couch potato to marathon finisher in 8 months! GOALSET helped me stay on track with my training schedule and reminded me why I started when things got tough.",
    stars: 5,
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
  },
  {
    id: 3,
    name: "Sarah J.",
    title: "Small Business Owner",
    testimonial:
      "GOALSET was the accountability partner I needed to launch my business. The structured approach helped me break down intimidating tasks into achievable goals.",
    stars: 4,
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
  },
  {
    id: 4,
    name: "David L.",
    title: "Language Learner",
    testimonial:
      "After years of trying to learn Spanish, GOALSET finally helped me develop a consistent practice routine. I'm now conversational after just 6 months!",
    stars: 5,
    image:
      "https://images.unsplash.com/photo-1548449112-96a38a643324?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
  },
];

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    resetAutoPlay();
  };

  const handlePrev = () => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
    resetAutoPlay();
  };

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
    resetAutoPlay();
  };

  const resetAutoPlay = () => {
    if (autoPlayTimeoutRef.current) {
      clearTimeout(autoPlayTimeoutRef.current);
    }

    setIsAutoPlaying(false);

    // Resume auto-play after user interaction
    autoPlayTimeoutRef.current = setTimeout(() => {
      setIsAutoPlaying(true);
    }, 5000);
  };

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isAutoPlaying]);

  useEffect(() => {
    return () => {
      if (autoPlayTimeoutRef.current) {
        clearTimeout(autoPlayTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section
      id="testimonials"
      className="py-20 bg-gradient-to-b from-white to-goal-50"
    >
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center mx-auto max-w-3xl mb-16">
          <div className="mb-4">
            <span className="chip">Testimonials</span>
          </div>

          <AnimatedText
            text="Hear From Our Users"
            element="h2"
            animation="fade-in-up"
            className="text-3xl md:text-4xl font-bold text-goal-900 mb-4"
          />

          <AnimatedText
            text="Real people, real goals, real results. See how GOALSET has transformed our users' lives."
            element="p"
            animation="fade-in-up"
            delay={200}
            className="text-goal-600 max-w-2xl mx-auto"
          />
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Testimonial Slider */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                />
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-center items-center mt-8 space-x-2">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full text-goal-600 hover:text-goal-800 hover:bg-goal-100 transition-colors"
            >
              <ChevronLeft size={24} />
              <span className="sr-only">Previous</span>
            </button>

            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={cn(
                    "w-2.5 h-2.5 rounded-full transition-colors",
                    activeIndex === index
                      ? "bg-goal-600"
                      : "bg-goal-200 hover:bg-goal-400",
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-2 rounded-full text-goal-600 hover:text-goal-800 hover:bg-goal-100 transition-colors"
            >
              <ChevronRight size={24} />
              <span className="sr-only">Next</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="w-full min-w-full px-4">
      <div className="glass-card rounded-2xl p-6 md:p-8 shadow-lg">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="shrink-0">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-white shadow-md">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={
                    i < testimonial.stars
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>

            <blockquote className="text-lg md:text-xl text-goal-800 mb-4 italic">
              "{testimonial.testimonial}"
            </blockquote>

            <div>
              <p className="font-semibold text-goal-900">{testimonial.name}</p>
              <p className="text-sm text-goal-600">{testimonial.title}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
