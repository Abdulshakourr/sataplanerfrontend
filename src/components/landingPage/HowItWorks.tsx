import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  UserPlus,
  Target,
  Sparkles,
  LineChart,
  QrCode,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import AnimatedText from "../ui/AnimatedText";

const steps = [
  {
    title: "Start Your Journey",
    description:
      "Create your free account in just a few clicks. We keep your information secure, so you can focus on what matters—your goals.",
    icon: <UserPlus size={24} />,
    color: "from-blue-400 to-cyan-400",
  },
  {
    title: "Craft Your Goals",
    description:
      "Set clear, achievable goals with goal, why you want to achieve it, and deadlines. Add a personal touch with a cover image that inspires you.",
    icon: <Target size={24} />,
    color: "from-indigo-400 to-purple-400",
  },
  {
    title: "Stay Motivated",
    description:
      "Attach uplifting quotes or helpful links to your goals. Let these be your daily reminder of why you started.",
    icon: <Sparkles size={24} />,
    color: "from-yellow-400 to-orange-400",
  },
  {
    title: "Track Every Step",
    description:
      "Update your progress and see how far you've come. Our app makes it easy to stay on track and celebrate your wins.",
    icon: <LineChart size={24} />,
    color: "from-green-400 to-emerald-400",
  },
  {
    title: "Share Securely",
    description:
      "Want to share your goal with others? Generate a unique QR code that you control. Only those you trust can view your progress.",
    icon: <QrCode size={24} />,
    color: "from-red-400 to-pink-400",
  },
  {
    title: "Personalize Your Space",
    description:
      "Make the app your own by adding your name and bio to your profile. This is your goal-setting sanctuary.",
    icon: <User size={24} />,
    color: "from-purple-400 to-indigo-400",
  },
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
