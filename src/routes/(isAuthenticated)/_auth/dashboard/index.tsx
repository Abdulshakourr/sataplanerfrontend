import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle, Clock, Plus, Search, Target } from "lucide-react";
import { useUserGoals } from "@/api/hooks/hook";
import { motion } from "framer-motion";
import { useAuthStore } from "@/store/auth";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import AddProfileForm from "@/components/addUserProfile";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/(isAuthenticated)/_auth/dashboard/")({
  component: DashboardPage,
});

function DashboardPage() {
  const { user } = useAuthStore();
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const { data: goals, isError, error, isPending } = useUserGoals();
  console.log("d", goals)
  useEffect(() => {
    if (user && !user?.first_name) {
      setProfileDialogOpen(true);
    }
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
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

  return (
    <div className="px-4 sm:px-6 py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        <DashboardHeader user={user} />
        <SearchBar />
        <StatsSection goals={goals} loading={isPending} />
        <ProfileSetupDialog
          open={profileDialogOpen}
          onOpenChange={setProfileDialogOpen}
        />
        <RecentGoalsSection goals={goals} loading={isPending} />
      </motion.div>
    </div>
  );
}

function DashboardHeader({ user }: { user: any }) {
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? "Good morning" :
    currentHour < 18 ? "Good afternoon" : "Good evening";

  return (
    <header className="mb-8 space-y-2">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
        {greeting}, <span className="text-primary">{user?.first_name || 'User'}</span>
      </h1>
      <p className="text-muted-foreground">
        Let's make progress on your goals today
      </p>
    </header>
  );
}

function SearchBar() {
  return (
    <div className="mb-8">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search goals..."
          className="w-full pl-10 pr-4 h-12 rounded-xl"
        />
      </div>
    </div>
  );
}

function StatsSection({ goals, loading }: { goals?: any[], loading: boolean }) {
  const stats = {
    total: goals?.length || 0,
    active: goals?.filter(g => g.status === 'ACTIVE').length || 0,
    completed: goals?.filter(g => g.status === 'COMPLETED').length || 0,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {loading ? (
        Array(3).fill(0).map((_, i) => (
          <Card key={i} className="p-6 h-32 animate-pulse">
            <div className="h-6 w-20 bg-muted rounded mb-4" />
            <div className="h-8 w-24 bg-muted rounded" />
          </Card>
        ))
      ) : (
        <>
          <StatCard
            title="Total Goals"
            value={stats.total}
            icon={<Target className="h-6 w-6 text-primary" />}
          />
          <StatCard
            title="Active Goals"
            value={stats.active}
            icon={<Clock className="h-6 w-6 text-orange-500" />}
          />
          <StatCard
            title="Completed"
            value={stats.completed}
            icon={<CheckCircle className="h-6 w-6 text-green-500" />}
          />
        </>
      )}
    </div>
  );
}

function StatCard({ title, value, icon }: { title: string; value: number; icon: React.ReactNode }) {
  return (
    <Card className="p-6 transition-all hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        <div className="p-3 rounded-full bg-muted">{icon}</div>
      </div>
    </Card>
  );
}

function ProfileSetupDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Complete Your Profile</DialogTitle>
        </DialogHeader>
        <AddProfileForm />
      </DialogContent>
    </Dialog>
  );
}

function RecentGoalsSection({ goals, loading }: { goals?: any[], loading: boolean }) {
  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Recent Goals</h2>
        <Link to="/new-goal">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Goal
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(3).fill(0).map((_, i) => (
            <Card key={i} className="p-6 h-48 animate-pulse">
              <div className="h-6 w-3/4 bg-muted rounded mb-4" />
              <div className="h-4 w-full bg-muted rounded mb-2" />
              <div className="h-4 w-2/3 bg-muted rounded" />
            </Card>
          ))}
        </div>
      ) : goals?.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.slice(0, 3).map((goal) => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </div>
      ) : (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground mb-4">No goals created yet</p>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create First Goal
          </Button>
        </Card>
      )}
    </section>
  );
}

function GoalCard({ goal }: { goal: any }) {
  return (
    <Card className="p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <Target className="h-6 w-6 text-primary" />
        <Badge variant={goal.status === 'COMPLETED' ? 'default' : 'secondary'}>
          {goal.status}
        </Badge>
      </div>
      <h3 className="font-medium mb-2">{goal.name}</h3>
      <p className="text-sm text-muted-foreground line-clamp-2">
        {goal.description || 'No description'}
      </p>
    </Card>
  );
}