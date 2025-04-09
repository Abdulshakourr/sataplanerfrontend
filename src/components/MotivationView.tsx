import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import MotivationForm from "./motivationForm";
import MotivationCard from "./MotivationCard";
interface MotivationItem {
  id?: string;
  quote?: string;
  link?: string;
  Goal_id: string;
}

interface MotivationProp {
  data: MotivationItem[] | undefined;
  loads: boolean;
  id: string;
}

// interface MotivationCardProps {
//   data: MotivationItem;
// }
const MotivationView = ({ data, loads, id }: MotivationProp) => {
  return (
    <Card className="border shadow-sm overflow-hidden bg-white">
      <CardContent className="p-0">
        <div className="p-6">
          <div className=" flex justify-between items-center px-6 mb-12">
            <h2 className="text-xl font-semibold">Motivation</h2>
            {
              id === "private" ? "" :
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
            }
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
export default MotivationView;
