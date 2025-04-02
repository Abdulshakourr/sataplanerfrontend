import { useUserGoals } from "@/api/hooks/hook";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Calendar,
  ArrowRight,
  Plus,
  Target,
  AlertCircle,
  Search,
} from "lucide-react";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/(isAuthenticated)/_auth/activegoals/")({
  component: AllGoalsPage,
});

interface goal {
  id: string;
  name: string;
  description: string;
  due_date: string;
  status: string;
  cover_image?: string;
}

function AllGoalsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: goalsData,
    isError,
    error,
    isPending,
  } = useUserGoals({
    offset: (currentPage - 1) * itemsPerPage,
    limit: itemsPerPage,
    search: searchTerm,
  });

  // Get filtered active goals
  const activeGoals =
    goalsData?.goals?.filter((goal: goal) => goal.status === "ACTIVE") || [];
  const totalGoals = goalsData?.total || 0;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <Card className="w-full max-w-md p-6 text-center">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-destructive">
              Error Loading Goals
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">{error.message}</p>
            <Button
              variant="outline"
              onClick={() => window.location.reload()}
              className="mt-4"
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent">
            Active Goals Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            Track and manage your active objectives
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <form onSubmit={handleSearch} className="flex-1 sm:w-80 relative">
            <Input
              placeholder="Search goals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-11 pl-10 pr-4 rounded-xl bg-muted/50"
            />
            <Search className="h-4 w-4 absolute left-3 top-3.5 text-muted-foreground" />
          </form>
          <Button asChild className="h-11 rounded-xl gap-1.5">
            <Link to="/new-goal">
              <Plus className="h-4 w-4" />
              <span>New Goal</span>
            </Link>
          </Button>
        </div>
      </div>

      {isPending ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-48 w-full rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Button
            asChild
            variant="outline"
            className="h-full min-h-48 border-2 border-dashed hover:border-primary hover:bg-muted/30 rounded-2xl flex flex-col items-center justify-center gap-2"
          >
            <Link to="/new-goal">
              <Plus className="h-8 w-8 text-muted-foreground" />
              <span className="font-medium text-muted-foreground">
                Create New Goal
              </span>
            </Link>
          </Button>

          {activeGoals.length ? (
            activeGoals.map((goal: goal) => (
              <GoalCard key={goal.id} goal={goal} />
            ))
          ) : (
            <div className="col-span-full text-center p-12 rounded-2xl bg-muted/30">
              <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">
                No active goals found
              </h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm
                  ? "No matches for your search terms"
                  : "Get started by creating your first active goal"}
              </p>
              <Button asChild>
                <Link to="/new-goal">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Active Goal
                </Link>
              </Button>
            </div>
          )}
        </div>
      )}

      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-muted-foreground">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, totalGoals)} of {totalGoals}{" "}
          goals
        </div>

        <Pagination>
          <PaginationContent className="flex-wrap">
            <PaginationItem>
              <PaginationPrevious
                className="rounded-lg"
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                isActive={currentPage > 1}
              />
            </PaginationItem>

            {Array.from({ length: 5 }).map((_, i) => {
              const page = currentPage - 2 + i;
              return (
                page > 0 &&
                page <= Math.ceil(totalGoals / itemsPerPage) && (
                  <PaginationItem key={page}>
                    <PaginationLink
                      className="rounded-lg"
                      onClick={() => handlePageChange(page)}
                      isActive={page === currentPage}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              );
            })}

            <PaginationItem>
              <PaginationNext
                className="rounded-lg"
                onClick={() =>
                  handlePageChange(
                    Math.min(
                      Math.ceil(totalGoals / itemsPerPage),
                      currentPage + 1,
                    ),
                  )
                }
                isActive={currentPage < Math.ceil(totalGoals / itemsPerPage)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

function GoalCard({ goal }: { goal: goal }) {
  const isOverdue = new Date(goal.due_date) < new Date();
  const daysRemaining = Math.ceil(
    (new Date(goal.due_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24),
  );

  return (
    <div className="group relative">
      <Card className="h-full rounded-2xl transition-all hover:shadow-lg hover:-translate-y-1 border-2 border-primary/20">
        <div className="absolute top-2 right-2">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/40"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
          </div>
        </div>

        <CardContent className="p-0">
          <div className="flex flex-col">
            {goal.cover_image && (
              <div className="relative h-48">
                <img
                  src={goal.cover_image}
                  alt={goal.name}
                  className="object-cover w-full h-full rounded-t-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <div className="absolute right-1 top-2 ">
                  <Badge
                    variant="outline"
                    className={cn(
                      "shrink-0 rounded-full px-3 py-1 text-xs font-medium",
                      isOverdue
                        ? "bg-red-500 text-white"
                        : "bg-blue-500 text-white",
                    )}
                  >
                    {isOverdue ? "OVERDUE" : "ACTIVE"}
                  </Badge>
                </div>
              </div>
            )}
            <div className="p-6">
              <div className="flex justify-between items-start gap-4 mb-4">
                <h2 className="text-xl font-semibold text-start">
                  {goal.name}
                </h2>
              </div>

              <p className="text-muted-foreground  mb-4 text-start">
                {goal.description}
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span
                    className={`font-medium ${isOverdue && "text-red-500"} `}
                  >
                    {new Date(goal.due_date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <AlertCircle className="h-4 w-4 text-muted-foreground" />
                  <span
                    className={cn(
                      isOverdue ? "text-red-500" : "text-muted-foreground",
                    )}
                  >
                    {isOverdue
                      ? `Overdue by ${Math.abs(daysRemaining)} days`
                      : `${Math.max(0, daysRemaining)} days remaining`}
                  </span>
                </div>
              </div>

              <Button
                variant="ghost"
                className="mt-6 w-full rounded-lg flex items-center justify-between px-4 py-3 bg-muted/50 hover:bg-muted"
                asChild
              >
                <Link
                  to={`/dashboard/goal/$goalId`}
                  params={{ goalId: goal.id }}
                >
                  <span>View Details</span>
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
