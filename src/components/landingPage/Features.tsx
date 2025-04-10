import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Sparkles, QrCode, Layout, EyeOff, Printer, Mic, Lock } from "lucide-react";
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
      </div>
    </motion.div>
  );
};

const Features: React.FC = () => {
  const features = [
    {
      title: "Encrypted Goal Storage",
      description: "Your dreams, your secret. Every goal you enter is encrypted and stored securely—only you can access it through your unique QR code.",
      icon: <Lock className="w-6 h-6" />,
      color: "bg-purple-100 text-purple-600"
    },
    {
      title: "QR Code Generator",
      description: "Turn goals into silent symbols. Convert your private mission into a discreet QR code you can print and pin anywhere, without revealing your goal to others.",
      icon: <QrCode className="w-6 h-6" />,
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Multimedia Goal Entries",
      description: "Write it. Record it. Feel it. Attach videos, voice notes, or detailed notes to your goals—remind yourself why you started, your way.",
      icon: <Mic className="w-6 h-6" />,
      color: "bg-pink-100 text-pink-600"
    },
    {
      title: "Offline QR Print Option",
      description: "No internet, no problem. Once generated, your QR code can be printed and accessed offline—perfect for low-privacy spaces or limited connectivity.",
      icon: <Printer className="w-6 h-6" />,
      color: "bg-green-100 text-green-600"
    },
    {
      title: "Personal Vault Access",
      description: "Only for your eyes. Scan your QR code with the app to reveal your full dream: your mission, your message, your motivation.",
      icon: <EyeOff className="w-6 h-6" />,
      color: "bg-yellow-100 text-yellow-600"
    },
    {
      title: "Silent Mode Goals",
      description: "Move in silence. Stay focused. No pop-ups, no social feed, no distractions—just you and your goals, quietly driving progress.",
      icon: <Layout className="w-6 h-6" />,
      color: "bg-indigo-100 text-indigo-600"
    },
    {
      title: "Minimalist & Private Design",
      description: "Designed for focus and protection. A distraction-free interface that respects your space and keeps your dreams yours.",
      icon: <Sparkles className="w-6 h-6" />,
      color: "bg-teal-100 text-teal-600"
    }
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
