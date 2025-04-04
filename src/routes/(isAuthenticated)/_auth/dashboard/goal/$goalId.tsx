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
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import MotivationView from "@/components/MotivationView";
import { useGetGoal, useGetMotivation, useGoalDelete, useUpdategoal } from "@/api/hooks/hook";
import { userDataInstance } from "@/api/client/axiosInstance";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns/format";

export const Route = createFileRoute(
  "/(isAuthenticated)/_auth/dashboard/goal/$goalId",
)({
  component: Index,
});

function Index() {
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const { goalId } = Route.useParams();
  console.log("iddddd", goalId);
  const { data, isPending, isError, error } = useGetGoal(goalId);

  const { data: motivation, isLoading: loads } = useGetMotivation(goalId);
  const { mutate, isSuccess, isError: deleteEroro, error: deleror } = useGoalDelete()
  const { mutate: update, isSuccess: updated } = useUpdategoal(data?.id, onSucess)
  const router = useRouter()
  const queryClient = useQueryClient()

  useEffect(() => {
    if (updated) {
      toast({
        title: "Goal Achieved",
        description: "Congratulations on achieving your goal!",
      });
    }
  }, [updated]);

  function onSucess() {
    queryClient.invalidateQueries({ queryKey: ["goals"] })
  }

  // Clear previous data while loading new data
  const displayMotivation = loads ? undefined : motivation;

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-medium">Goal Not Found</h1>
          <p>{error?.message}</p>
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

  if (deleteEroro) {
    console.error("deleting", deleror.message)
  }
  if (isSuccess) {
    return router.navigate({ to: "/dashboard" })
  }

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
    const upData = {
      name: data?.name,
      description: data?.description,
      due_date: format(data?.due_date, 'yyyy-MM-dd'),
      status: "ACHIEVED"
    }
    update(upData)
  };

  const handleDelete = (id: string) => {
    mutate(id)
  }

  const isOverdue =
    data?.status === "ACTIVE" && new Date(data?.due_date) < new Date();
  const daysRemaining = data?.due_date
    ? Math.ceil(
      (new Date(data.due_date).getTime() - Date.now()) /
      (1000 * 60 * 60 * 24),
    )
    : 0;

  return (
    <div className="min-h-screen bg-slate-50">
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

              {/* Qr-code Dialog */}
              <Dialog
                open={isShareDialogOpen}
                onOpenChange={setIsShareDialogOpen}
              >
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
                    <DialogTitle className="text-xl">
                      QR Code for This Goal
                    </DialogTitle>
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
              {/**delete button */}
              <Button
                onClick={() => handleDelete(goalId)}
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
                  variant={
                    data?.status === "ACHIEVED" ? "secondary" : "default"
                  }
                  className={cn(
                    "text-sm px-3 py-1 font-medium",
                    isOverdue && "bg-red-100 text-red-600 hover:bg-red-200",
                    data?.status === "ACTIVE" &&
                    !isOverdue &&
                    "bg-green-100 text-green-700 hover:bg-green-200",
                    data?.status === "ACHIEVED" &&
                    "bg-slate-100 text-slate-700 hover:bg-slate-200",
                  )}
                >
                  {data?.status}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              {/* Main Content */}
              <div className="md:col-span-2 border-r border-slate-100">
                {/* Cover Image */}
                <div className="aspect-video bg-slate-100 overflow-hidden relative">
                  {data?.cover_image ? (
                    <img
                      src={data.cover_image}
                      alt={data.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
                      <Target className="h-12 w-12 text-slate-300" />
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
                  <div className="mb-6">
                    <MotivationView
                      data={displayMotivation}
                      id={goalId}
                      loads={loads}
                    />
                  </div>
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
                              variant={
                                data?.status === "ACHIEVED"
                                  ? "secondary"
                                  : "default"
                              }
                              className={cn(
                                "text-xs px-2 py-0",
                                isOverdue &&
                                "bg-red-100 text-red-600 hover:bg-red-200",
                                data?.status === "ACTIVE" &&
                                !isOverdue &&
                                "bg-green-100 text-green-700 hover:bg-green-200",
                                data?.status === "ACHIEVED" &&
                                "bg-slate-100 text-slate-700 hover:bg-slate-200",
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
                  {data?.status === "ACTIVE" && (
                    <Button
                      onClick={handleCompleteGoal}
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                    >
                      Mark as Achieved
                    </Button>
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