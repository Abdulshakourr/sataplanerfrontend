import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Target,
  Sparkles,
  LineChart,
  QrCode,
  Settings,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import AnimatedText from "../ui/AnimatedText";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  index,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative flex flex-col p-6 rounded-2xl glass-card overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-goal-50/20 to-white rounded-2xl transform group-hover:scale-105 transition-transform duration-500" />

      <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-goal-100 rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-500" />

      <div className="relative z-10">
        <div className="mb-4 p-3 bg-white rounded-xl inline-flex shadow-sm">
          <div className="w-10 h-10 flex items-center justify-center text-goal-600">
            {icon}
          </div>
        </div>

        <h3 className="text-xl font-semibold text-goal-900 mb-2">{title}</h3>
        <p className="text-goal-600 mb-4 text-pretty">{description}</p>

        {/* <a */}
        {/*   href="#" */}
        {/*   className="inline-flex items-center text-goal-600 font-medium hover:text-goal-800 transition-colors" */}
        {/* > */}
        {/*   Learn more */}
        {/*   <ChevronRight */}
        {/*     size={16} */}
        {/*     className="ml-1 transform group-hover:translate-x-1 transition-transform duration-200" */}
        {/*   /> */}
        {/* </a> */}
      </div>
    </motion.div>
  );
};

const Features: React.FC = () => {
  const features = [
    {
      title: "Effortless Goal Setting",
      description:
        "Create and organize your goals with our user-friendly interface. Break them down into manageable steps and set deadlines to keep yourself accountable.",
      icon: <Target size={24} />,
    },
    {
      title: "Daily Motivation",
      description:
        "Get inspired with handpicked quotes, tips, and success stories delivered right to your app. Stay focused and energized on your journey.",
      icon: <Sparkles size={24} />,
    },
    {
      title: "Progress Tracking",
      description:
        "Visualize your achievements with intuitive charts and milestones. Celebrate your wins, no matter how small, and stay motivated to keep going.",
      icon: <LineChart size={24} />,
    },
    {
      title: "Secure Sharing",
      description:
        "Share your goals with friends and family via unique QR codes. Get the support and encouragement you need to succeed.",
      icon: <QrCode size={24} />,
    },
    {
      title: "Personalized Experience",
      description:
        "Customize your profile and app settings to make GOALSET truly yours. Tailor your goal-setting journey to fit your unique needs.",
      icon: <Settings size={24} />,
    },
  ];

  return (
    <section
      id="features"
      className="py-20 bg-gradient-to-b from-white to-goal-50"
    >
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center mx-auto max-w-3xl mb-16">
          <div className="mb-4">
            <span className="chip">Features</span>
          </div>

          <AnimatedText
            text="Why You'll Love GOALSET"
            element="h2"
            animation="fade-in-up"
            className="text-3xl md:text-4xl font-bold text-goal-900 mb-4"
          />

          <AnimatedText
            text="The ultimate goal management app designed to help you turn your dreams into reality."
            element="p"
            animation="fade-in-up"
            delay={200}
            className="text-goal-600 max-w-2xl mx-auto"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
