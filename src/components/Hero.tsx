import React, { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import AnimatedText from "./ui/AnimatedText.tsx";
import Button from "./ui/button-custom";

const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const { innerWidth: width, innerHeight: height } = window;
      const dpr = window.devicePixelRatio || 1;

      canvas.width = width * dpr;
      canvas.height = height * 0.75 * dpr;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height * 0.75}px`;

      ctx.scale(dpr, dpr);
    };

    setCanvasDimensions();
    window.addEventListener("resize", setCanvasDimensions);

    // Particle system
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      opacity: number;

      constructor(canvas: HTMLCanvasElement) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.color = "#0ea5e9";
        this.opacity = Math.random() * 0.5 + 0.1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) {
          this.speedX = -this.speedX;
        }

        if (this.y < 0 || this.y > canvas.height) {
          this.speedY = -this.speedY;
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    const particles: Particle[] = [];
    const particleCount = Math.min(Math.max(window.innerWidth / 10, 50), 150);

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas));
    }

    function connectParticles(ctx: CanvasRenderingContext2D) {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = "#0ea5e9";
            ctx.globalAlpha = 0.1 * (1 - distance / 100);
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const particle of particles) {
        particle.update();
        particle.draw(ctx);
      }

      connectParticles(ctx);
      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasDimensions);
    };
  }, []);

  return (
    <section className="relative min-h-screen pt-20 pb-10 flex items-center justify-center overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full -z-10 opacity-70"
      />

      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/0 to-white -z-10" />

      <div className="container mx-auto px-4 lg:px-6 z-10">
        <div className="text-center mx-auto max-w-4xl">
          <div className="mb-4">
            <span className="chip animate-fade-in">Goal Tracking App</span>
          </div>

          <AnimatedText
            text="Stop Dreaming, Start Achieving"
            element="h1"
            animation="fade-in-up"
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-goal-900 mb-4 tracking-tight"
          />

          <AnimatedText
            text="Your Personal Goal-Setting Companion"
            element="h2"
            animation="fade-in-up"
            delay={200}
            className="text-xl md:text-2xl lg:text-3xl font-medium text-goal-700 mb-6"
          />

          <AnimatedText
            element="p"
            animation="fade-in-up"
            delay={400}
            text="Setting goals is easy, but achieving them? That's where most of us struggle. Whether it's procrastination, lack of motivation, or simply not knowing where to start, we've all faced obstacles on the path to success."
            className="text-goal-600 mb-8 max-w-3xl mx-auto text-pretty"
          />

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up"
            style={{ animationDelay: "600ms" }}
          >
            <Button
              size="lg"
              icon={<ArrowRight size={20} />}
              className="shadow-lg shadow-goal-400/20"
            >
              Get Started
            </Button>

            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>

          <div
            className="mt-16 animate-fade-in-up"
            style={{ animationDelay: "800ms" }}
          >
            <div className="overflow-hidden rounded-lg shadow-xl shadow-goal-400/10 bg-white">
              <div className="p-1 bg-gradient-to-r from-goal-400 to-goal-600">
                <div className="bg-white rounded-t-md p-2 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="mx-auto text-xs text-goal-500 font-medium">
                    GOALSET - Dashboard
                  </div>
                </div>
                <div className="bg-goal-50/30 h-60 sm:h-80 rounded-b-md flex items-center justify-center">
                  <div className="text-goal-400 animate-pulse">
                    App Dashboard Preview
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
