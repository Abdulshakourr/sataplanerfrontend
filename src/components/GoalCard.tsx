import { Badge } from "@/components/ui/badge";
import { AlertCircle, ArrowRight, Calendar } from 'lucide-react'
import { Card, CardContent, } from "./ui/card";
import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";

type goal = {
    cover_image: string
    created_at: string
    description: string
    due_date: string
    id: string
    name: string
    status: string
}

function cn(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export default function GoalCard({ goal }: { goal: goal }) {
    const isOverdue =
        goal.status === "ACTIVE" && new Date(goal.due_date) < new Date();
    const isAchieved = goal.status === "ACHIEVED";
    const daysRemaining = Math.ceil(
        (new Date(goal.due_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24),
    );

    return (
        <div className="group relative">
            <Card className="h-full bg-red-00 rounded-2xl transition-all hover:shadow-lg hover:-translate-y-1">
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
                                        className={cn(
                                            "shrink-0 rounded-full px-4 py-2 text-xs font-medium",
                                            isAchieved
                                                ? "bg-blue-500 text-white"
                                                : isOverdue
                                                    ? "bg-red-500 text-white"
                                                    : "bg-green-500 text-white",
                                        )}
                                    >
                                        {isAchieved ? "ACHIEVED" : isOverdue ? "OVERDUE" : "ACTIVE"}
                                    </Badge>
                                </div>
                            </div>
                        )}
                        <div className="p-4">
                            <div className="">
                                <h2 className="text-xl font-semibold text-start">
                                    {goal.name}
                                </h2>
                            </div>

                            <p className="text-muted-foreground  max-w-[350px]  text-start">
                                {goal.description}
                            </p>

                            {!isAchieved && (
                                <div className="mt-6 space-y-2 ">
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
                                            className={`${isOverdue} ? "text-red-500" : "text-muted-foreground"`}
                                        >
                                            {isOverdue
                                                ? `Overdue by ${Math.abs(daysRemaining)} days`
                                                : `${Math.max(0, daysRemaining)} days remaining`}
                                        </span>
                                    </div>
                                </div>
                            )}

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