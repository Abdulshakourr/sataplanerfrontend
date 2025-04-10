import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  UserPlus,
  Target,
  Sparkles,
  QrCode,
  Eye,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import AnimatedText from "../ui/AnimatedText";


const steps = [
  {
    title: "Create Account",
    description: "Sign up in seconds with email or social login. Your data stays private and secure from day one.",
    icon: <UserPlus className="w-6 h-6" />,
    color: "bg-blue-100 text-blue-600"
  },
  {
    title: "Set Clear Goal",
    description: "Define exactly what you want to achieve with our simple goal-setting framework.",
    icon: <Target className="w-6 h-6" />,
    color: "bg-purple-100 text-purple-600"
  },
  {
    title: "Attach Motivation",
    description: "Add inspirational quotes, videos or personal notes to fuel your journey.",
    icon: <Sparkles className="w-6 h-6" />,
    color: "bg-yellow-100 text-yellow-600"
  },
  {
    title: "Print Secure QR Code",
    description: "Generate a private QR code that only unlocks with your device - no accidental peeking.",
    icon: <QrCode className="w-6 h-6" />,
    color: "bg-green-100 text-green-600"
  },
  {
    title: "Pin to Your Wall",
    description: "Place your QR code where you'll see it daily - mirror, fridge, or workspace.",
    icon: <Eye className="w-6 h-6" />,
    color: "bg-orange-100 text-orange-600"
  },
  {
    title: "Get Daily Boost",
    description: "Scan each morning to reveal your goals and motivational content.",
    icon: <Zap className="w-6 h-6" />,
    color: "bg-pink-100 text-pink-600"
  }
];

const HowItWorks: React.FC = () => {
  return (
    <section
      id="how-it-works"
      className="py-20 bg-gradient-to-b from-goal-50 to-white"
    >
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center mx-auto max-w-3xl mb-16">
          <div className="mb-4">
            <span className="chip">Process</span>
          </div>

          <AnimatedText
            text="How It Works"
            element="h2"
            animation="fade-in-up"
            className="text-3xl md:text-4xl font-bold text-goal-900 mb-4"
          />

          <AnimatedText
            text="We've made goal-setting simple and effective with our straightforward six-step process."
            element="p"
            animation="fade-in-up"
            delay={200}
            className="text-goal-600 max-w-2xl mx-auto"
          />
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Timeline connector */}
          <div className="absolute top-0 bottom-0 left-1/2 w-px bg-goal-200 transform -translate-x-1/2 z-0 hidden md:block" />

          {/* Steps */}
          <div className="space-y-12 relative z-10">
            {steps.map((step, index) => (
              <StepItem
                key={index}
                step={step}
                index={index}
                isEven={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

interface StepItemProps {
  step: (typeof steps)[0];
  index: number;
  isEven: boolean;
}

const StepItem: React.FC<StepItemProps> = ({ step, index, isEven }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -20 : 20 }}
      animate={
        isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -20 : 20 }
      }
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className={cn(
        "md:flex items-center",
        isEven ? "md:flex-row" : "md:flex-row-reverse md:text-right",
      )}
    >
      {/* Number bubble for mobile */}
      <div className="md:hidden flex items-center mb-4">
        <div
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm",
            `bg-gradient-to-br ${step.color}`,
          )}
        >
          {index + 1}
        </div>
        <div className="ml-4 font-medium text-goal-900">{step.title}</div>
      </div>

      {/* Content */}
      <div className={cn("md:w-5/12", isEven ? "md:pr-12" : "md:pl-12")}>
        <h3 className="text-xl font-medium text-goal-900 mb-2 hidden md:block">
          {step.title}
        </h3>
        <p className="text-goal-600">{step.description}</p>
      </div>

      {/* Center icon for desktop */}
      <div className="hidden md:flex md:w-2/12 justify-center">
        <div
          className={cn(
            "w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg relative z-10",
            `bg-gradient-to-br ${step.color}`,
          )}
        >
          <div className="absolute -inset-1 rounded-full bg-white"></div>
          <div
            className={cn(
              "relative w-14 h-14 rounded-full flex items-center justify-center",
              `bg-gradient-to-br ${step.color}`,
            )}
          >
            {step.icon}
          </div>
        </div>
      </div>

      {/* Empty space for desktop alignment */}
      <div className="hidden md:block md:w-5/12" />
    </motion.div>
  );
};

export default HowItWorks;
