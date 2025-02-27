
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { createFileRoute } from '@tanstack/react-router'
import { Plus, Search } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { useUserPlans } from '@/api/hooks/hook'
import CreatePlan from '@/components/addPLan'
import Planview from '@/components/Planview'

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
      <div className="text-center py-12 text-red-600">
        Error loading plans. Please try again later.
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search plans..."
            className="pl-10 h-12 bg-white border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 rounded-lg transition-all"
          />
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="h-12 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all gap-2">
              <Plus className="h-4 w-4" />
              Create Plan
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md bg-white/90  border-none shadow-xl">
            <DialogTitle className="text-xl font-semibold text-center text-gray-900">
              Create Your Plan
            </DialogTitle>
            <DialogDescription className="text-center text-gray-500">
              Create a plan and stay motivated doing it
            </DialogDescription>
            <CreatePlan />
          </DialogContent>
        </Dialog>
      </div>

      {/* Plans Grid */}
      {isPending ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full rounded-lg bg-gray-100" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data && data.length > 0 ? (
            data.map((plans: Datetype) => (
              <Planview key={plans.id} plan={plans} />
            ))
          ) : (
            <div className="col-span-full text-center py-16 bg-white rounded-lg shadow-sm">
              <div className="flex flex-col items-center space-y-4">
                <Plus className="h-12 w-12 text-gray-400" />
                <p className="text-xl font-medium text-gray-700">
                  No plans created yet
                </p>
                <p className="text-gray-500">
                  Start by creating your first plan above
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
