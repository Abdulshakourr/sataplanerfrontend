import CreatePlan from '@/components/addPLan'
import Planview from '@/components/Planview'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { createFileRoute } from '@tanstack/react-router'
import { Plus, Search } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { Card } from '@/components/ui/card'
import { useUserPlans } from '@/api/hooks/hook'

type Datetype = {
  id: string
  name: string
  description: string
}

export const Route = createFileRoute('/(isAuthenticated)/_auth/dashboard/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data, isError, error, isPending } = useUserPlans()

  if (isError) {
    console.log("App", error)
    return (
      <div className="text-center py-8">
        <p className="text-destructive">Error loading plans. Please try again later.</p>
      </div>
    )
  }
  return (
    <div className="max-w-6xl mx-auto my-8 px-4 sm:px-6 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="w-full max-w-md relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search plans..."
            className="pl-10 bg-white py-4"

          />
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Plan
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle className="text-center">
              Create Your Plan
            </DialogTitle>
            <DialogDescription className='text-center'>Create plan and stay motivated doing it.</DialogDescription>
            <CreatePlan />
          </DialogContent>
        </Dialog>
      </div>

      {/* Plans Grid */}
      {isPending ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="p-6">
              <Skeleton className="h-6 w-3/4 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6" />
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-4">
          {data && data.length > 0 ? (
            data.map((plans: Datetype) => (
              <Planview key={plans.id} plan={plans} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="flex flex-col items-center space-y-4">
                <Plus className="h-12 w-12 text-muted-foreground" />
                <p className="text-xl font-medium text-muted-foreground">
                  No plans created yet
                </p>
                <p className="text-muted-foreground">
                  Start by creating your first plan
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
