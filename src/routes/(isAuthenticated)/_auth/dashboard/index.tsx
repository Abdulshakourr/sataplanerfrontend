import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle, Clock, Plus, Search, Target } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserGoals } from "@/api/hooks/hook";
import Goalview from "@/components/Goalview";
import CreateGoal from "@/components/addGoal";
import { useState } from "react";
import AnimatedText from "@/components/ui/AnimatedText";
import { motion } from "framer-motion";
import StatCard from "@/components/landingPage/StartCard";

type GoalStatus = "ACTIVE" | "COMPLETED" | "OVERDUE";
type Datetype = {
  id: string;
  name: string;
  description: string;
  created_at: string;
  status: GoalStatus;
  due_date: string;
  user_id: string;
  cover_image: string | null;
};

export const Route = createFileRoute("/(isAuthenticated)/_auth/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isError, error, isPending } = useUserGoals();
  // const [open, setOpen] = useState(false);
  if (isError) {
    console.log("App", error);
    return (
      <div className="text-center py-12 text-red-600">
        Error loading plans. Please try again later.
      </div>
    );
  }

  return (
    <div className="mt-4 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <header className="mb-8">
          <AnimatedText
            text="Good morning, John!"
            element="h1"
            className="text-3xl md:text-4xl font-bold text-goal-800"
            animation="fade-in"
          />
          <p className="text-goal-600 mt-2">
            Track your progress and achieve your goals
          </p>
        </header>
        {/* Search Bar */}
        <div className="relative mb-8">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-goal-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search your goals..."
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-goal-300"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <StatCard
            title="Total Goals"
            value="5"
            icon={<Target size={24} className="text-goal-800" />}
          />
          <StatCard
            title="Active Goals"
            value="3"
            icon={<Clock size={24} className="text-goal-500" />}
          />
          <StatCard
            title="Completed"
            value="1"
            icon={<CheckCircle size={24} className="text-green-500" />}
          />
        </div>
        {/* Goals Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-goal-800 mb-6">Your Goals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/*   {sampleGoals.map((goal) => ( */}
            {/*     <GoalCard key={goal.id} goal={goal} /> */}
            {/*   ))} */}
          </div>
        </section>
        {/* Create New Goal Button (Mobile) */}
        <div className="fixed bottom-6 right-6 md:hidden">
          <Link to="/new-goal">
            <Button size="lg" className="rounded-full shadow-lg">
              <Plus size={20} />
              <span className="ml-2">New Goal</span>
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
