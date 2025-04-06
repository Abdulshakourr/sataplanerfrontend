import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  ArrowLeft,
  Target,
  QrCode,
  Calendar,
  Trophy,
  CheckCircle,
  Sparkles,
  Quote,
} from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import Motivateview from '@/components/privateMotivationView'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { z } from "zod"
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

const Base_URL = import.meta.env.VITE_BASE_URL

export const Route = createFileRoute('/qrcodenew/view-plan/')({
  component: RouteComponent,
  validateSearch: z.object({
    token: z.string()
  }),
})

function RouteComponent() {
  const search = Route.useSearch()
  const router = useRouter()
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [qrCode, setQrCode] = useState<string | null>(null)
  const [showCelebration, setShowCelebration] = useState(false)
  const { width, height } = useWindowSize()

  const { data, isError, isLoading } = useQuery({
    queryKey: ["private", search.token],
    queryFn: async () => {
      try {
        const response = await axios.get(`${Base_URL}/qrcode/view-goal?token=${search.token}`)
        return response.data
      } catch (error) {
        throw error
      }
    }
  })

  if (isError) {
    router.navigate({ to: "/sign-in" })
  }

  const isAchieved = data?.goal_details?.status === "ACHIEVED"
  const isOverdue = data?.goal_details?.status === "ACTIVE" &&
    new Date(data?.goal_details?.due_date) < new Date()
  const daysRemaining = data?.goal_details?.due_date
    ? Math.ceil((new Date(data.goal_details.due_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : 0

  const generateQr = async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        `${Base_URL}/qrcode/generate-permanent-qr/${data.goal_details.id}`,
        { responseType: 'blob' }
      )
      const url = URL.createObjectURL(response.data)
      setQrCode(url)
      toast({
        title: "QR Code Generated",
        description: "Share this goal with others using the QR code",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate QR code",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const downloadQrCode = () => {
    if (!qrCode) return
    const link = document.createElement('a')
    link.href = qrCode
    link.download = `goal-${data.goal_details.id}-qrcode.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  useEffect(() => {
    if (isAchieved) {
      setShowCelebration(true)
      setTimeout(() => setShowCelebration(false), 5000)
    }
  }, [isAchieved])

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Celebration Effects */}
      <AnimatePresence>
        {showCelebration && (
          <>
            <Confetti
              width={width}
              height={height}
              recycle={false}
              numberOfPieces={500}
              gravity={0.2}
              colors={['#FFD700', '#FFA500', '#FF8C00', '#FF6347']}
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-yellow-50/50 z-40 pointer-events-none"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
            >
              <div className="text-center p-8 bg-white/90 rounded-xl shadow-xl border border-yellow-200">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <Trophy className="h-24 w-24 text-yellow-500 mx-auto mb-6" />
                </motion.div>
                <motion.h2
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl font-bold text-yellow-600 mb-4"
                >
                  Congratulations!
                </motion.h2>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-xl text-yellow-700 mb-6"
                >
                  This goal has been achieved!
                </motion.p>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-4xl"
                >
                  🎉🥳🏆
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-8"
        >

          {/* Content Container */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200">
            {/* Goal Header */}
            <div className="p-6 border-b border-slate-100">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
                    {isLoading ? <Skeleton className="h-9 w-64" /> : data?.goal_details.name}
                    {isAchieved && (
                      <span className="ml-2 text-yellow-500">🏆</span>
                    )}
                  </h1>

                  {data?.goal_details?.status === "ACTIVE" && data?.goal_details?.due_date && (
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-slate-500" />
                      <span
                        className={cn(
                          "font-medium",
                          isOverdue ? "text-red-500" : "text-slate-500",
                        )}
                      >
                        {isOverdue
                          ? `Overdue by ${Math.abs(daysRemaining)} days`
                          : `${daysRemaining} ${daysRemaining === 1 ? "day" : "days"} remaining`}
                      </span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-500">
                        Due{" "}
                        {new Date(data.goal_details.due_date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  )}
                </div>

                <Badge
                  variant={isAchieved ? "secondary" : "default"}
                  className={cn(
                    "text-sm px-3 py-1 font-medium relative overflow-hidden",
                    isOverdue && "bg-red-100 text-red-600 hover:bg-red-200",
                    data?.goal_details?.status === "ACTIVE" &&
                    !isOverdue &&
                    "bg-green-100 text-green-700 hover:bg-green-200",
                    isAchieved && "bg-yellow-100 text-yellow-700 hover:bg-yellow-200",
                  )}
                >
                  {isAchieved && (
                    <motion.span
                      className="absolute -left-1 -top-1"
                      animate={{
                        x: [0, 100],
                        y: [0, 100],
                        opacity: [1, 0],
                        scale: [0.5, 1.5]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 0.5
                      }}
                    >
                      <Sparkles className="h-4 w-4 text-yellow-400" />
                    </motion.span>
                  )}
                  {data?.goal_details?.status}
                  {isAchieved && " 🎯"}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              {/* Main Content */}
              <div className="md:col-span-2 border-r border-slate-100">
                {/* Cover Image */}
                <div className="aspect-video bg-slate-100 overflow-hidden relative">
                  {data?.goal_details?.cover_image ? (
                    <>
                      <img
                        src={data.goal_details.cover_image}
                        alt={data.goal_details.name}
                        className="w-full h-full object-cover"
                      />
                      {isAchieved && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent flex items-center justify-center">
                          <motion.div
                            animate={{
                              rotate: [0, 5, -5, 0],
                              scale: [1, 1.1, 1]
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              repeatType: "reverse"
                            }}
                          >
                            <Trophy className="h-16 w-16 text-yellow-400" />
                          </motion.div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
                      {isAchieved ? (
                        <motion.div
                          animate={{
                            rotate: [0, 360],
                            scale: [1, 1.2, 1]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            repeatType: "loop"
                          }}
                        >
                          <CheckCircle className="h-16 w-16 text-yellow-400" />
                        </motion.div>
                      ) : (
                        <Target className="h-12 w-12 text-slate-300" />
                      )}
                    </div>
                  )}
                </div>

                <div className="p-6">
                  {/* Description */}
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4 text-slate-800">
                      Description
                    </h2>
                    {isLoading ? (
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                        <Skeleton className="h-4 w-4/6" />
                      </div>
                    ) : (
                      <p className="text-slate-600 leading-relaxed">
                        {data?.goal_details?.description || "No description available"}
                      </p>
                    )}
                  </div>

                  {/* Motivation Section */}
                  {!isAchieved ? (
                    <div className="mb-6">
                      <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-4">
                        <div className="bg-teal-100 p-2 rounded-full">
                          <Quote className="h-5 w-5 text-teal-600" />
                        </div>
                        <h2 className="text-xl font-semibold text-slate-800">Motivations</h2>
                      </div>
                      <Motivateview motivation={data?.goal_details?.motivations} isLoading={isLoading} />
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="mb-6 p-6 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg border-2 border-yellow-200 text-center relative overflow-hidden"
                    >
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        {[...Array(10)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute text-yellow-300"
                            style={{
                              left: `${Math.random() * 100}%`,
                              top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                              y: [0, -50],
                              opacity: [0.7, 0],
                              scale: [1, 1.5]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              repeatDelay: Math.random() * 2,
                              delay: Math.random() * 2
                            }}
                          >
                            <Sparkles className="h-8 w-8" />
                          </motion.div>
                        ))}
                      </div>
                      <div className="relative z-10">
                        <div className="flex justify-center mb-4">
                          <motion.div
                            animate={{
                              rotate: [0, 10, -10, 0],
                              y: [0, -10, 0]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              repeatType: "reverse"
                            }}
                            className="bg-yellow-100 p-4 rounded-full"
                          >
                            <Trophy className="h-12 w-12 text-yellow-600" />
                          </motion.div>
                        </div>
                        <h3 className="text-2xl font-bold text-yellow-800 mb-2">
                          Goal Achieved!
                        </h3>
                        <p className="text-yellow-700 mb-4 text-lg">
                          Completed on {" "}
                          {new Date(data?.goal_details?.updated_at || data?.goal_details?.created_at).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                        <div className="flex justify-center gap-2">
                          {["🥳", "🎉", "🏆", "👏"].map((emoji, i) => (
                            <motion.span
                              key={i}
                              className="text-3xl"
                              animate={{
                                y: [0, -10, 0],
                                scale: [1, 1.2, 1]
                              }}
                              transition={{
                                duration: 1,
                                delay: i * 0.2,
                                repeat: Infinity,
                                repeatDelay: 3
                              }}
                            >
                              {emoji}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Sidebar */}
              <div className="bg-slate-50/50 p-6">
                <div className="sticky top-6 space-y-6">
                  {/* Status Card */}
                  <div className="space-y-5">
                    <h3 className="text-lg font-semibold text-slate-800">
                      Goal Details
                    </h3>

                    <div className="space-y-4">
                      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                        <div className="p-4 border-b border-slate-100">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-500 font-medium">
                              Status
                            </span>
                            <Badge
                              variant={isAchieved ? "secondary" : "default"}
                              className={cn(
                                "text-xs px-2 py-0",
                                isOverdue && "bg-red-100 text-red-600 hover:bg-red-200",
                                data?.goal_details?.status === "ACTIVE" &&
                                !isOverdue &&
                                "bg-green-100 text-green-700 hover:bg-green-200",
                                isAchieved &&
                                "bg-yellow-100 text-yellow-700 hover:bg-yellow-200",
                              )}
                            >
                              {data?.goal_details?.status}
                            </Badge>
                          </div>
                        </div>

                        <div className="p-4 border-b border-slate-100">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-500 font-medium">
                              Created
                            </span>
                            <span className="text-sm font-medium text-slate-700">
                              {data?.goal_details?.created_at
                                ? new Date(data.goal_details.created_at).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  },
                                )
                                : "N/A"}
                            </span>
                          </div>
                        </div>

                        {data?.goal_details?.due_date && (
                          <div className="p-4">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-slate-500 font-medium">
                                Due Date
                              </span>
                              <span
                                className={cn(
                                  "text-sm font-medium",
                                  isOverdue ? "text-red-500" : "text-slate-700",
                                )}
                              >
                                {new Date(data.goal_details.due_date).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  },
                                )}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {isAchieved && (
                    <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100 text-center">
                      <p className="text-yellow-700 font-medium flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 mr-2" />
                        Completed Successfully
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}