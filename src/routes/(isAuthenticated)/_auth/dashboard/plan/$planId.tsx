import { usegetPlan } from '@/api/hooks/hook'
import MotivationForm from '@/components/motivationForm'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Plus, StepBack, Quote, Youtube } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import MotivationView from '@/components/motivationView'

export const Route = createFileRoute(
  '/(isAuthenticated)/_auth/dashboard/plan/$planId',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const params = Route.useParams()
  const { data, isError, error, isSuccess, isLoading } = usegetPlan(params.planId)

  if (isError) {
    console.log("idplan", error)
    return <div>Error loading plan details</div>
  }

  return (
    <div className="min-h-screen  py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Back Button */}
        <Button variant="outline" asChild className="gap-2">
          <Link to="/dashboard">
            <StepBack className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>

        {/* Plan Details */}
        <Card className="p-6">
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ) : (
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-primary">
                {data?.name}
              </h1>
              <p className="text-muted-foreground">
                {data?.description}
              </p>
            </div>
          )}
        </Card>

        {/* Motivation Section */}
        <Card className="p-6">
          <div className="flex flex-col space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Quote className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold">Motivation</h2>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Motivation
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-center">
                      Create Motivation
                    </DialogTitle>
                    <DialogDescription className="text-center">
                      Add inspiring quotes or video links to keep you motivated
                    </DialogDescription>
                  </DialogHeader>
                  <MotivationForm planId={params.planId} />
                </DialogContent>
              </Dialog>
            </div>
            <MotivationView id={params.planId} />
          </div>
        </Card>
      </div>
    </div>
  )
}
