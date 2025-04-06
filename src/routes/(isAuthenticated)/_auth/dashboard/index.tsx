import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle, Clock, Plus, Search, Target, BookOpen, GraduationCap, TrendingUp, Sparkles } from "lucide-react";
import { useUserGoals } from "@/api/hooks/hook";
import { motion } from "framer-motion";
import { useAuthStore } from "@/store/auth";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import AddProfileForm from "@/components/addUserProfile";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import GoalCard from "@/components/GoalCard";

export const Route = createFileRoute("/(isAuthenticated)/_auth/dashboard/")({
  component: DashboardPage,
});

function DashboardPage() {
  const { user } = useAuthStore();
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);

  const {
    data: goalData,
    isError,
    error,
    isPending,
  } = useUserGoals({
    offset: 0,
    limit: 10,
  });

  const goals = goalData?.goals;

  useEffect(() => {
    if (user && !user?.first_name) {
      setProfileDialogOpen(true);
    }
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-muted animate-pulse" />
          <div className="h-4 w-48 bg-muted rounded animate-pulse" />
        </div>
      </div>
    );
  }

  if (isError) {
    toast({
      title: "Error loading goals",
      description: error.message,
      variant: "destructive",
    });
  }

  // Sort goals by created_at date (newest first)
  const sortedGoals = goals?.sort(
    (a: { created_at: string }, b: { created_at: string }) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );

  return (
    <div className="px-4 sm:px-6 py-6 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        <DashboardHeader user={user} />
        <SearchBar />
        <StatsSection goals={sortedGoals} loading={isPending} />
        <ProfileSetupDialog
          open={profileDialogOpen}
          onOpenChange={setProfileDialogOpen}
        />
        <RecentGoalsSection goals={sortedGoals} loading={isPending} />
        <LearningResourcesSection />
      </motion.div>
    </div>
  );
}

function DashboardHeader({ user }: { user: any }) {
  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12
      ? "Good morning"
      : currentHour < 18
        ? "Good afternoon"
        : "Good evening";

  return (
    <header className="mb-8 space-y-2">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
        {greeting},{" "}
        <span className="text-primary">{user?.first_name || "User"}</span>
      </h1>
      <p className="text-muted-foreground">Here's your progress overview</p>
    </header>
  );
}

function SearchBar() {
  return (
    <div className="mb-8">
      <div className="relative max-w-2xl">
        <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search goals..."
          className="w-full pl-10 pr-4 h-12 rounded-xl bg-background"
        />
      </div>
    </div>
  );
}

function StatsSection({ goals, loading }: { goals?: any[]; loading: boolean }) {
  const stats = {
    total: goals?.length || 0,
    active: goals?.filter((g) => g.status === "ACTIVE").length || 0,
    achieved: goals?.filter((g) => g.status === "ACHIEVED").length || 0,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {loading ? (
        Array(3)
          .fill(0)
          .map((_, i) => (
            <Card key={i} className="p-6 h-32 animate-pulse bg-muted/20">
              <div className="h-6 w-20 bg-muted/40 rounded mb-4" />
              <div className="h-8 w-24 bg-muted/40 rounded" />
            </Card>
          ))
      ) : (
        <>
          <StatCard
            title="Total Goals"
            value={stats.total}
            icon={<Target className="h-6 w-6 text-primary" />}
            trend={stats.total > 0 ? "up" : "none"}
          />
          <StatCard
            title="Active Goals"
            value={stats.active}
            icon={<Clock className="h-6 w-6 text-orange-500" />}
            trend={stats.active > 0 ? "up" : "none"}
          />
          <StatCard
            title="Achieved Goals"
            value={stats.achieved}
            icon={<CheckCircle className="h-6 w-6 text-green-500" />}
            trend={stats.achieved > 0 ? "up" : "none"}
          />
        </>
      )}
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  trend = "none",
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  trend?: "up" | "down" | "none";
}) {
  return (
    <Card className="p-6 transition-all hover:shadow-md bg-background">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        <div className="p-3 rounded-full bg-muted/20">{icon}</div>
      </div>
      {trend !== "none" && (
        <div
          className={`mt-2 text-xs font-medium ${trend === "up" ? "text-green-500" : "text-red-500"
            }`}
        >
          {trend === "up" ? "↑ Increased" : "↓ Decreased"}
        </div>
      )}
    </Card>
  );
}

function ProfileSetupDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] rounded-2xl bg-background">
        <DialogHeader>
          <DialogTitle className="text-xl">Complete Your Profile</DialogTitle>
        </DialogHeader>
        <AddProfileForm />
      </DialogContent>
    </Dialog>
  );
}

function RecentGoalsSection({
  goals,
  loading,
}: {
  goals?: any[];
  loading: boolean;
}) {
  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">Latest Goals</h2>
          <p className="text-sm text-muted-foreground">
            Your most recently created goals
          </p>
        </div>
        <Link to="/new-goal">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Goal
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <Card key={i} className="p-6 h-48 animate-pulse bg-muted/20">
                <div className="h-6 w-3/4 bg-muted/40 rounded mb-4" />
                <div className="h-4 w-full bg-muted/40 rounded mb-2" />
                <div className="h-4 w-2/3 bg-muted/40 rounded" />
              </Card>
            ))}
        </div>
      ) : goals?.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.slice(0, 3).map((goal) => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
          <p className="text-md text-gray-400  text-start underline">
            <Link to="/allgoals"> All Goals</Link>
          </p>
        </div>
      ) : (
        <Card className="p-8 text-center bg-background">
          <div className="mx-auto max-w-md">
            <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No goals yet</h3>
            <p className="text-muted-foreground mb-6">
              Start by creating your first goal to track your progress
            </p>
            <Link to="/new-goal">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Create First Goal
              </Button>
            </Link>
          </div>
        </Card>
      )}
    </section>
  );
}

function LearningResourcesSection() {
  const resources = [
    {
      title: "Goal Setting Guide",
      description: "Learn how to set effective SMART goals",
      icon: <Target className="h-5 w-5 text-blue-500" />,
      link: "/learn",
    },
    {
      title: "Productivity Tips",
      description: "Boost your productivity with these techniques",
      icon: <TrendingUp className="h-5 w-5 text-green-500" />,
      link: "/learn/productivity",
    },
    {
      title: "Motivation Mastery",
      description: "How to stay motivated long-term",
      icon: <Sparkles className="h-5 w-5 text-purple-500" />,
      link: "/learn/motivation",
    },
  ];

  return (
    <section className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <GraduationCap className="h-6 w-6 text-primary" />
        <h2 className="text-xl font-semibold">Learning Resources</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {resources.map((resource, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <Link to={resource.link}>
              <Card className="h-full p-6 hover:border-primary transition-colors">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-full bg-muted">
                    {resource.icon}
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">{resource.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {resource.description}
                    </p>
                    <div className="mt-3 text-sm text-primary flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      <span>Learn more</span>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}