import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/learn/')({
  component: RouteComponent,
})

import { motion } from "framer-motion"
import { CheckCircle, Target, TrendingUp, Calendar, Star, Award } from "lucide-react"

function RouteComponent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">
          Your <span className="text-indigo-600">Goal Achievement</span> Guide
        </h1>
        <p className="text-lg text-center text-gray-600 mb-12">
          A proven step-by-step roadmap to help you crush your goals with clarity and confidence.
        </p>

        <div className="space-y-8">
          {/* Step 1 */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
          >
            <div className="flex items-start gap-4">
              <div className="bg-indigo-100 p-3 rounded-full">
                <Target className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">1. Set a Clear Target</h3>
                <p className="text-gray-600">
                  Be specific about what success looks like. Vague goals lead to vague results. Instead of saying "get healthy," aim for "run 3 times a week for 30 minutes."
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="mt-4 bg-indigo-50 p-3 rounded-lg border border-indigo-100"
                >
                  <p className="text-indigo-700 font-medium">
                    <CheckCircle className="inline h-5 w-5 mr-2" />
                    Use the SMART formula: Specific, Measurable, Achievable, Relevant, Time-bound.
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
          >
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">2. Break It Into Milestones</h3>
                <p className="text-gray-600">
                  Big goals can feel overwhelming. Divide them into smaller, doable tasks. Each small win fuels your momentum.
                </p>
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                    boxShadow: ["0 1px 2px rgba(0,0,0,0.1)", "0 4px 6px rgba(79,70,229,0.2)", "0 1px 2px rgba(0,0,0,0.1)"]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mt-4 bg-blue-50 p-3 rounded-lg border border-blue-100"
                >
                  <p className="text-blue-700 font-medium">
                    Example: Writing a book? Start with 500 words a day. Tiny steps = big progress.
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Step 3 */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
          >
            <div className="flex items-start gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">3. Schedule It</h3>
                <p className="text-gray-600">
                  Add your goal-related tasks to your calendar. Treat them like real appointments—because they are.
                </p>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {["Mon", "Wed", "Fri"].map((day) => (
                    <motion.div
                      key={day}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-green-50 p-2 rounded-md border border-green-100 text-center"
                    >
                      <p className="text-green-700 font-medium">{day}</p>
                      <p className="text-xs text-green-600">30 min session</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Step 4 */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
          >
            <div className="flex items-start gap-4">
              <div className="bg-yellow-100 p-3 rounded-full">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">4. Track Your Progress</h3>
                <p className="text-gray-600">
                  Don’t just work—reflect. Seeing progress (even a little) builds massive motivation.
                </p>
                <motion.div
                  className="mt-4 bg-yellow-50 p-3 rounded-lg border border-yellow-100"
                  animate={{
                    background: ["#FEFCE8", "#FEF9C3", "#FEFCE8"]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="w-full bg-white rounded-full h-4">
                    <motion.div
                      className="bg-yellow-400 h-4 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: "65%" }}
                      transition={{ duration: 1, delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <div className="text-xs text-center text-white">65% complete</div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Step 5 */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
          >
            <div className="flex items-start gap-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">5. Celebrate Every Win</h3>
                <p className="text-gray-600">
                  Milestones matter. Whether it’s big or small—acknowledge your efforts and reward yourself.
                </p>
                <motion.div
                  className="mt-4 flex justify-center"
                  animate={{
                    rotate: [0, 10, -10, 0],
                    y: [0, -5, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <div className="bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-full inline-flex items-center">
                    <span className="text-2xl mr-2">🎉</span>
                    <span className="font-medium text-purple-700">You’re crushing it!</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Final CTA */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Your dream life is one goal away.
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-lg font-medium shadow-lg"
            >
              <Link to="/dashboard">Start Your Journey Today</Link>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}