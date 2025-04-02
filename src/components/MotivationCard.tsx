import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import ReactPlayer from "react-player";

interface MotivationItem {
  id: string;
  quote?: string;
  link?: string;
}

// interface MotivationProp {
//   data: MotivationItem[] | undefined;
//   loads: boolean;
//   id: string;
// }

interface MotivationCardProps {
  data: MotivationItem;
}

export default function MotivationCard({ data }: MotivationCardProps) {
  const hasQuote = !!data?.quote;
  const hasVideo = !!data?.link;

  return (
    <div className="space-y-6">
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
