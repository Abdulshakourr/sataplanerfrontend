import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import AnimatedText from "../ui/AnimatedText";
import Button from "../ui/button-custom";

const benefits = [
  "Proven results from thousands of users",
  "Intuitive design, easy for beginners",
  "Free to start, premium features available",
  "Secure data protection",
  "Regular app updates with new features",
];

const CTA: React.FC = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-goal-50 to-goal-100 z-0" />

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-goal-200 rounded-full opacity-20 transform translate-x-1/4 -translate-y-1/4" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-goal-300 rounded-full opacity-10 transform -translate-x-1/3 translate-y-1/3" />

      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        <div className="max-w-5xl mx-auto glass-card rounded-2xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left section with content */}
            <div className="p-8 md:p-10">
              <div className="mb-4">
                <span className="chip">Get Started</span>
              </div>

              <AnimatedText
                text="Ready to Unlock Your Potential?"
                element="h2"
                animation="fade-in-up"
                className="text-2xl md:text-3xl font-bold text-goal-900 mb-4"
              />

              <AnimatedText
                text="Don't let another day slip by. Sign up now and start achieving your goals today!"
                element="p"
                animation="fade-in-up"
                delay={200}
                className="text-goal-600 mb-6"
              />

              <ul className="space-y-3 mb-8">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    viewport={{ once: true }}
                    className="flex items-start"
                  >
                    <Check
                      size={18}
                      className="text-goal-600 mr-2 mt-0.5 shrink-0"
                    />
                    <span className="text-goal-700">{benefit}</span>
                  </motion.li>
                ))}
              </ul>

              <Button
                size="lg"
                icon={<ArrowRight size={20} />}
                className="shadow-lg shadow-goal-400/20"
              >
                Sign Up For Free
              </Button>
            </div>

            {/* Right section with image */}
            <div className="hidden md:block bg-gradient-to-br from-goal-400 to-goal-600 relative">
              <div className="absolute inset-0 bg-grid-white/10" />

              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="relative w-full max-w-xs">
                  <div className="absolute inset-0 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 transform rotate-6" />
                  <div className="absolute inset-0 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 transform -rotate-2" />
                  <div className="relative rounded-2xl bg-white/80 backdrop-blur-md border border-white/20 p-6 shadow-lg">
                    <div className="mb-4 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-goal-600 flex items-center justify-center text-white text-sm font-bold">
                          G
                        </div>
                        <span className="font-medium text-goal-900">
                          GOALSET
                        </span>
                      </div>
                      <div className="text-xs text-goal-500">Today</div>
                    </div>

                    <div className="space-y-4">
                      <div className="p-3 bg-goal-50 rounded-lg border border-goal-100">
                        <p className="text-xs font-medium text-goal-700">
                          "The journey of a thousand miles begins with a single
                          step."
                        </p>
                        <p className="text-xs text-goal-500 mt-1">– Lao Tzu</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500" />
                        <div className="text-sm text-goal-700">
                          Daily goal completed!
                        </div>
                      </div>

                      <div className="bg-white rounded-lg shadow-sm p-3">
                        <div className="text-xs text-goal-500 mb-1">
                          Learn Spanish
                        </div>
                        <div className="w-full h-2 bg-goal-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-goal-600 rounded-full"
                            style={{ width: "75%" }}
                          />
                        </div>
                        <div className="text-xs text-goal-500 mt-1 text-right">
                          75%
                        </div>
                      </div>
                    </div>
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

export default CTA;
