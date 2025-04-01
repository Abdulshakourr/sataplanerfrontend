import ReactPlayer from "react-player";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import MotivationForm from "./motivationForm";
interface MotivationItem {
  id: string;
  quote?: string;
  link?: string;
}

interface MotivationProp {
  data: MotivationItem[] | undefined;
  loads: boolean;
  id: string;
}

interface MotivationCardProps {
  data: MotivationItem;
}
const MotivationView = ({ data, loads, id }: MotivationProp) => {
  return (
    <Card className="border shadow-sm overflow-hidden bg-white">
      <CardContent className="p-0">
        <div className="p-6">
          <div className=" flex justify-between items-center px-6 mb-12">
            <h2 className="text-xl font-semibold">Motivation</h2>
            <Dialog>
              <DialogTrigger>
                <Button>add motivation</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>add your new motivation</DialogTitle>
                <DialogDescription>get it done</DialogDescription>
                <MotivationForm goalId={id} />
              </DialogContent>
            </Dialog>
          </div>
          {loads ? (
            <div className="space-y-4">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-64 w-full" />
            </div>
          ) : (data?.length ?? 0) > 0 ? (
            data?.map((item) => <MotivationCard key={item.id} data={item} />)
          ) : (
            <div className="flex items-center justify-center p-12 bg-muted/20 rounded-lg">
              <p className="text-muted-foreground text-sm">
                No motivation content available
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
export function MotivationCard({ data }: MotivationCardProps) {
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
export default MotivationView;
