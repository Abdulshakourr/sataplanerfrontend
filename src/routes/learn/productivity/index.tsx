import { createFileRoute, Link } from '@tanstack/react-router'
import { Clock, Zap, Calendar, CheckCircle, List, Focus } from 'lucide-react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/learn/productivity/')({
  component: ProductivityPage,
})

function ProductivityPage() {
  const tips = [
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Time Blocking",
      description: "Schedule specific time slots for different tasks to maintain focus and prevent multitasking.",
      action: "Try blocking 25-minute intervals with 5-minute breaks (Pomodoro technique).",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Eat the Frog",
      description: "Do your most challenging task first thing in the morning when your willpower is strongest.",
      action: "Identify tomorrow's 'frog' tonight and tackle it before checking email.",
      color: "bg-amber-100 text-amber-600"
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Weekly Planning",
      description: "Spend 30 minutes each Sunday planning your week to align daily tasks with bigger goals.",
      action: "Schedule your planning session right now for next Sunday.",
      color: "bg-emerald-100 text-emerald-600"
    },
    {
      icon: <List className="h-6 w-6" />,
      title: "The 2-Minute Rule",
      description: "If a task takes less than 2 minutes, do it immediately instead of adding it to your todo list.",
      action: "Apply this to small tasks like replying to short emails or filing documents.",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: <Focus className="h-6 w-6" />,
      title: "Deep Work Sessions",
      description: "Protect 2-4 hour blocks of uninterrupted time for your most important cognitive work.",
      action: "Turn off notifications and use a 'do not disturb' sign during these sessions.",
      color: "bg-rose-100 text-rose-600"
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "The Ivy Lee Method",
      description: "At the end of each day, write down the 6 most important tasks for tomorrow in order of priority.",
      action: "Start tonight - limit yourself to just 6 items and work them in order.",
      color: "bg-teal-100 text-teal-600"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <header className="mb-16 text-center">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Productivity
            </span> Techniques
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Science-backed methods to help you accomplish more with less stress
          </motion.p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {tips.map((tip, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="h-full p-6 hover:shadow-lg transition-all duration-300 border border-gray-200/50 hover:border-blue-200 group">
                <div className="flex flex-col h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`p-3 rounded-lg ${tip.color} group-hover:scale-110 transition-transform`}>
                      {tip.icon}
                    </div>
                    <h3 className="font-bold text-xl text-gray-800 mt-1">{tip.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-5 flex-grow">{tip.description}</p>
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-gray-100">
                    <p className="text-sm font-medium text-gray-700 flex items-start">
                      <span className="mr-2 text-blue-500">✨</span>
                      <span>{tip.action}</span>
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center max-w-3xl mx-auto"
        >
          <div className="mb-6">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
              Ready to achieve your goals faster?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Combine these productivity techniques with your goal-setting strategy to make consistent progress and build lasting habits.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all"
              size="lg"
            >
              <Link to='/dashboard'>Apply to My Goals</Link>
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}