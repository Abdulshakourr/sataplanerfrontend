import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ArrowLeft,
  Edit,
  Target,
  QrCode,
  Calendar,
  Trash2,
  Trophy,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import MotivationView from "@/components/MotivationView";
import { useGetGoal, useGetMotivation, useGoalDelete, useUpdategoal } from "@/api/hooks/hook";
import { userDataInstance } from "@/api/client/axiosInstance";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns/format";
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';

export const Route = createFileRoute(
  "/(isAuthenticated)/_auth/dashboard/goal/$goalId",
)({
  component: Index,
});

function Index() {
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const { width, height } = useWindowSize();
  const { goalId } = Route.useParams();
  const { data, isPending, isError, error } = useGetGoal(goalId);

  const { data: motivation, isLoading: loads } = useGetMotivation(goalId);
  const { mutate: deleteGoal, isSuccess: deleteSuccess, isError: deleteError, error: deleteErrorData } = useGoalDelete();
  const { mutate: updateGoal, isSuccess: updateSuccess } = useUpdategoal(data?.id, onSuccess);
  const router = useRouter();
  const queryClient = useQueryClient();

  const isAchieved = data?.status === "ACHIEVED";
  const isOverdue = data?.status === "ACTIVE" && new Date(data?.due_date) < new Date();
  const daysRemaining = data?.due_date
    ? Math.ceil((new Date(data.due_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : 0;

  function onSuccess() {
    queryClient.invalidateQueries({ queryKey: ["goals"] });
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 5000);
  }

  useEffect(() => {
    if (updateSuccess) {
      toast({
        title: "Goal Achieved!",
        description: "Congratulations on completing your goal!",
      });
    }
  }, [updateSuccess]);

  useEffect(() => {
    if (deleteSuccess) {
      router.navigate({ to: "/dashboard" });
    }
    if (deleteError) {
      toast({
        title: "Error",
        description: deleteErrorData?.message || "Failed to delete goal",
        variant: "destructive",
      });
    }
  }, [deleteSuccess, deleteError, deleteErrorData, router]);

  const generateQr = async () => {
    setLoading(true);
    try {
      const response = await userDataInstance.get(
        `/qrcode/generate-permanent-qr/${goalId}`,
        { responseType: 'blob' }
      );
      const url = URL.createObjectURL(response.data);
      setQrCode(url);
      toast({
        title: "QR Code Generated",
        description: "Share this goal with others using the QR code",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate QR code",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadQrCode = () => {
    if (!qrCode) return;
    const link = document.createElement('a');
    link.href = qrCode;
    link.download = `goal-${goalId}-qrcode.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCompleteGoal = () => {
    if (!data) return;
    const upData = {
      name: data.name,
      description: data.description,
      due_date: format(data.due_date, 'yyyy-MM-dd'),
      status: "ACHIEVED"
    };
    updateGoal(upData);
  };

  const handleDelete = () => {
    deleteGoal(goalId);
  };

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-medium">Goal Not Found</h1>
          <p className="text-muted-foreground">
            The goal you're looking for doesn't exist
          </p>
          <p className="text-red-600">{error.message}</p>
          <Button asChild>
            <Link to="/dashboard">Back to Dashboard</Link>
          </Button>
        </div>
      </div>
    );
  }

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
                  You've achieved your goal!
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
          {/* Header */}
          <div className="flex flex-col sm:flex-row gap-y-4 sm:gap-y-0 items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              className="text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              asChild
            >
              <Link to="/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>

            <div className="flex gap-2">
              {!isAchieved && (
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="border-slate-200 text-slate-700 hover:bg-slate-100"
                >
                  <Link to="/edit/$editId" params={{ editId: goalId }} className="flex gap-2">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Link>
                </Button>
              )}

              <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
                <DialogTrigger>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-slate-200 text-slate-700 hover:bg-slate-100"
                  >
                    <QrCode className="h-4 w-4 mr-2" />
                    QR Code
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md rounded-lg">
                  <DialogHeader>
                    <DialogTitle className="text-xl">QR Code for This Goal</DialogTitle>
                    <DialogDescription>
                      Generate a QR code to easily share this goal with others
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex flex-col items-center py-6 gap-4">
                    {qrCode ? (
                      <>
                        <img
                          src={qrCode}
                          alt="QR Code"
                          className="w-48 h-48 object-contain border rounded-lg"
                        />
                        <Button
                          onClick={downloadQrCode}
                          variant="outline"
                          className="w-full"
                        >
                          Download QR Code
                        </Button>
                      </>
                    ) : (
                      <>
                        <div className="p-4 bg-primary/10 rounded-full">
                          <QrCode className="h-8 w-8 text-primary" />
                        </div>
                        <p className="text-sm text-center text-muted-foreground">
                          Generate a QR code to share this goal
                        </p>
                      </>
                    )}
                  </div>
                  <DialogFooter className="flex gap-2">
                    {qrCode && (
                      <Button
                        variant="outline"
                        onClick={() => {
                          navigator.clipboard.writeText(window.location.href);
                          toast({
                            title: "Copied!",
                            description: "Goal link copied to clipboard",
                          });
                        }}
                      >
                        Copy Link
                      </Button>
                    )}
                    <Button
                      onClick={generateQr}
                      disabled={loading}
                      className="w-full"
                    >
                      {loading ? "Generating..." : qrCode ? "Regenerate" : "Generate QR Code"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Button
                onClick={handleDelete}
                size="sm"
                className="bg-red-50 hover:bg-red-50 px-3 text-red-600"
              >
                <Trash2 className="h-4 w-4 mr-2" />
              </Button>
            </div>
          </div>

          {/* Content Container */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200">
            {/* Goal Header */}
            <div className="p-6 border-b border-slate-100">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
                    {isPending ? <Skeleton className="h-9 w-64" /> : data?.name}
                    {isAchieved && (
                      <span className="ml-2 text-yellow-500">🏆</span>
                    )}
                  </h1>

                  {data?.status === "ACTIVE" && data?.due_date && (
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
                        {new Date(data.due_date).toLocaleDateString("en-US", {
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
                    data?.status === "ACTIVE" &&
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
                  {data?.status}
                  {isAchieved && " 🎯"}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              {/* Main Content */}
              <div className="md:col-span-2 border-r border-slate-100">
                {/* Cover Image */}
                <div className="aspect-video bg-slate-100 overflow-hidden relative">
                  {data?.cover_image ? (
                    <>
                      <img
                        src={data.cover_image}
                        alt={data.name}
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
                    {isPending ? (
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                        <Skeleton className="h-4 w-4/6" />
                      </div>
                    ) : (
                      <p className="text-slate-600 leading-relaxed">
                        {data?.description || "No description available"}
                      </p>
                    )}
                  </div>

                  {/* Motivation Section */}
                  {!isAchieved ? (
                    <div className="mb-6">
                      <MotivationView
                        data={loads ? undefined : motivation}
                        id={goalId}
                        loads={loads}
                      />
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
                          You Did It!
                        </h3>
                        <p className="text-yellow-700 mb-4 text-lg">
                          Goal completed on {" "}
                          {new Date(data?.updated_at || data?.created_at).toLocaleDateString("en-US", {
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
                                isOverdue &&
                                "bg-red-100 text-red-600 hover:bg-red-200",
                                data?.status === "ACTIVE" &&
                                !isOverdue &&
                                "bg-green-100 text-green-700 hover:bg-green-200",
                                isAchieved &&
                                "bg-yellow-100 text-yellow-700 hover:bg-yellow-200",
                              )}
                            >
                              {data?.status}
                            </Badge>
                          </div>
                        </div>

                        <div className="p-4 border-b border-slate-100">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-500 font-medium">
                              Created
                            </span>
                            <span className="text-sm font-medium text-slate-700">
                              {data?.created_at
                                ? new Date(data.created_at).toLocaleDateString(
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

                        {data?.due_date && (
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
                                {new Date(data.due_date).toLocaleDateString(
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
                  {data?.status === "ACTIVE" ? (
                    <Button
                      onClick={handleCompleteGoal}
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                    >
                      Mark as Achieved
                    </Button>
                  ) : (
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
  );
}

export default Index;