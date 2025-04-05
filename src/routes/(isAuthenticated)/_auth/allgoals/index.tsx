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
import GoalCard from "@/components/GoalCard";

export const Route = createFileRoute("/(isAuthenticated)/_auth/allgoals/")({
  component: AllGoalsPage,
});

interface goal {
  id: string;
  name: string;
  description: string;
  due_date: string;
  status: string;
  cover_image?: string;
  created_at: string;
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-24">
        <div>
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent">
            All Goals
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mb-4">
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
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-[400px]  w-full rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="grid sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
          {goalsData?.total ? (
            goalsData.goals.map((goal: goal) => (
              <GoalCard key={goal.id} goal={goal} />
            ))
          ) : (
            <div className="col-span-full text-center p-12 rounded-2xl bg-muted/30">
              <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">No goals found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm
                  ? "Try adjusting your search terms"
                  : "Get started by creating your first goal"}
              </p>
              <Button asChild>
                <Link to="/new-goal">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Goal
                </Link>
              </Button>
            </div>
          )}
        </div>
      )}

      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
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
                page <= goalsData?.total && (
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
                  handlePageChange(Math.min(goalsData?.total, currentPage + 1))
                }
                isActive={currentPage < goalsData?.total}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

