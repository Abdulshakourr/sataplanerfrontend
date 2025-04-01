import { Badge } from "@/components/ui/badge";
import { format } from "date-fns/format";
import { isAfter } from 'date-fns'
import { AlertCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Link } from "@tanstack/react-router";

type GoalProp = {
    goal: {
        cover_image: string
        created_at: string
        description: string
        due_date: string
        id: string
        name: string
        status: string
        user_id: string
    }
}


export default function GoalCard({ goal }: GoalProp) {
    const isOverdue = isAfter(new Date(), new Date(goal.due_date))
    const isActive = goal.status === "ACTIVE"

    return (
        <Card className={`
      max-w-xs rounded-lg overflow-hidden transition-all 
      hover:shadow-md hover:-translate-y-0.5 group
      ${isOverdue && isActive ? 'border border-red-400' : ''}
    `}>
            <div className="relative h-36 overflow-hidden">
                <img
                    src={goal.cover_image || '/placeholder-goal.svg'}
                    alt={goal.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
                    loading="lazy"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${isOverdue && isActive ? 'from-red-800/30' : 'from-black/50'
                    } to-transparent`} />

                {/* Status Badge positioned top-left */}
                <div className="absolute top-2 left-2">
                    <Badge
                        variant={isActive ? "default" : "secondary"}
                        className={`
              text-xs h-6 px-2
              ${isActive ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-gray-600'}
              ${isOverdue && isActive ? 'bg-red-600 hover:bg-red-700' : ''}
            `}
                    >
                        {isOverdue && isActive ? 'OVERDUE' : goal.status}
                    </Badge>
                </div>

                {/* Warning icon remains top-right */}
                {isOverdue && isActive && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full">
                        <AlertCircle className="h-4 w-4" />
                    </div>
                )}
            </div>

            <CardHeader className="p-4 space-y-1">
                <CardTitle className={`text-lg hover:underline font-medium line-clamp-2 ${isOverdue && isActive ? 'text-red-600 dark:text-red-400' : ''
                    }`}>
                    <Link to="/dashboard/goal/$goalId" params={{ goalId: goal.id }}>
                        {goal.name}
                    </Link>
                </CardTitle>
                <p className={`
          text-xs 
          ${isOverdue && isActive ? 'text-red-500 dark:text-red-400' : 'text-muted-foreground'}
        `}>
                    Due {format(new Date(goal.due_date), "MMM d")}
                    {isOverdue && isActive && ' • Overdue'}
                </p>
            </CardHeader>

            <CardContent className="p-4 pt-0">
                <p className={`
          text-xs line-clamp-2 mb-2
          ${isOverdue && isActive ? 'text-red-500/90 dark:text-red-400/90' : 'text-gray-600 dark:text-gray-300'}
        `}>
                    {goal.description}
                </p>
                <div className={`
          pt-3 flex items-center justify-between
          ${isOverdue && isActive ? 'border-t border-red-100 dark:border-red-900' : 'border-t border-gray-100 dark:border-gray-800'}
        `}>
                    <span className="text-xs text-muted-foreground">
                        {format(new Date(goal.created_at), "MMM yyyy")}
                    </span>
                    <button className={`
            text-xs font-medium 
            ${isOverdue && isActive ? 'text-red-600 hover:text-red-700 dark:text-red-400' : 'text-primary hover:underline'}
          `}>
                        Details
                    </button>
                </div>
            </CardContent>
        </Card>
    )
}