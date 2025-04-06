import { createFileRoute, Link } from '@tanstack/react-router'
import { Award, Sparkles, TrendingUp, Target, Zap, BarChart2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/learn/motivation/')({
  component: MotivationPage,
})

function MotivationPage() {
  const strategies = [
    {
      icon: <Target className="h-6 w-6" />,
      title: "The 1% Rule",
      description: "Focus on getting just 1% better each day. Small consistent improvements compound dramatically.",
      action: "Identify one small improvement you can make today in your key goal area.",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "Success Visualization",
      description: "Spend 5 minutes daily visualizing your future success in vivid detail to strengthen motivation.",
      action: "Try this morning and night for a week - notice the difference in your drive.",
      color: "bg-yellow-100 text-yellow-600"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Progress Tracking",
      description: "What gets measured gets managed. Track even small wins to maintain momentum.",
      action: "Start a progress journal or use our goal tracking features.",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Reward Milestones",
      description: "Celebrate small wins along the way to your big goal to reinforce positive behavior.",
      action: "Plan a small reward for your next milestone (e.g., after 7 consecutive days of progress).",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Energy Management",
      description: "Motivation follows energy. Align challenging tasks with your peak energy times.",
      action: "Identify your 2-3 highest energy hours each day and protect them for important work.",
      color: "bg-orange-100 text-orange-600"
    },
    {
      icon: <BarChart2 className="h-6 w-6" />,
      title: "The 5-Second Rule",
      description: "When you feel hesitation, count 5-4-3-2-1 and physically move to act before your brain resists.",
      action: "Use this tomorrow morning when your alarm goes off - get up immediately on 1.",
      color: "bg-red-100 text-red-600"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/70 to-pink-50/70 py-12 px-4 sm:px-6">
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
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Motivation
            </span> Strategies
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Science-backed techniques to build and sustain your drive for long-term success
          </motion.p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {strategies.map((strategy, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="h-full p-6 hover:shadow-lg transition-all duration-300 border border-gray-200/50 hover:border-purple-200 group">
                <div className="flex flex-col h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`p-3 rounded-lg ${strategy.color} group-hover:scale-110 transition-transform`}>
                      {strategy.icon}
                    </div>
                    <h3 className="font-bold text-xl text-gray-800 mt-1">{strategy.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-5 flex-grow">{strategy.description}</p>
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-gray-100">
                    <p className="text-sm font-medium text-gray-700 flex items-start">
                      <span className="mr-2 text-purple-500">✨</span>
                      <span>{strategy.action}</span>
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
              Start Your Learning Journey
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Choose one motivation strategy to implement this week and track your progress with our learning tools.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all"
              size="lg"
            >
              <Link to='/dashboard'>Begin Learning </Link>
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}