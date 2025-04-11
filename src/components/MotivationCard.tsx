import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Quote, Trash2 } from "lucide-react";
import ReactPlayer from "react-player";
import { Button } from "./ui/button";
import { useDeleteMotivation } from "@/api/hooks/hook";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

interface MotivationItem {
  id: string;
  quote?: string;
  link?: string;
  goal_id: string;
}

interface MotivationCardProps {
  data: MotivationItem;
}

export default function MotivationCard({ data }: MotivationCardProps) {
  const queryClient = useQueryClient();
  const { mutate: deleteMotivation, isPending } = useDeleteMotivation();
  const hasQuote = !!data?.quote;
  const hasVideo = !!data?.link;
  const handleDelete = () => {
    deleteMotivation(data.id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["goals", "motivation", data.goal_id] })
        toast.success("motivation deleted successfully");
      },
      onError: (error) => {
        toast.error(error.message || "failed to delete motivation");
      }
    });
  };

  return (
    <div className="space-y- relative group">
      {/* Delete Button - Only shows on hover */}
      <Button
        variant="ghost"
        size="sm"
        className="absolute right-2 top-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-600 hover:bg-red-50"
        onClick={handleDelete}
        disabled={isPending}

      >
        <Trash2 className="h-4 w-4" />
      </Button>

      {hasVideo && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-lg overflow-hidden bg-black/5"
        >
          <div className="aspect-video w-full">
            <ReactPlayer
              url={data.link}
              width="100%"
              height="100%"
              controls
              light={true}
              playing={false}
              config={{
                youtube: {
                  playerVars: { showinfo: 1 },
                },
                facebook: {
                  appId: "12345",
                },
              }}
            />
          </div>
        </motion.div>
      )}

      {hasQuote && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className={cn(
            "relative p-6 rounded-lg mt-12",
            hasVideo
              ? "bg-slate-50"
              : "bg-gradient-to-br from-primary/5 to-primary/10",
          )}
        >
          <Quote className="absolute text-primary/10 h-12 w-12 -top-2 -left-2" />
          <blockquote className="relative z-10 text-lg italic font-medium text-slate-700 pl-4">
            "{data.quote}"
          </blockquote>
        </motion.div>
      )}
    </div>
  );
}