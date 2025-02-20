import { useUserPlans } from '@/api/hooks/hook'
import CreatePlan from '@/components/addPLan'
import Planview from '@/components/Planview'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useAuthStore } from '@/store/auth'
import { createFileRoute } from '@tanstack/react-router'
import { Plus } from 'lucide-react'




type Datetype = {
  id: number,
  name: string,
  description: string
}

export const Route = createFileRoute('/(isAuthenticated)/_auth/dashboard/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data, isError, error, isPending } = useUserPlans()
  const { expireTime } = useAuthStore()
  if (data) {
    console.log("d", data)
  }
  if (isError) {
    console.log("App", error)

  }

  if (isPending) {
    return (
      <>
        <div className='max-w-6xl mx-auto text-center'>
          <h1 className='text-2xl mt-6 text-purple-400'>Loading...</h1>
        </div></>
    )
  }

  console.log("Time", expireTime)

  return (
    <>

      <div className='bg-gray-50 py-4 min-h-screen'>
        <div className='max-w-6xl mx-auto px-6'>
          <div className='flex justify-start my-6'>
            <div className='max-w-md flex gap-2 w-full bg-orange-00'>
              <Dialog>
                <DialogTrigger>
                  <Button asChild size={`lg`} className='bg-purple-500 hover:bg-purple-600 transitions-all ease-in-out font-bold'>
                    <span>
                      <Plus className='' /> <span>Create plan</span>
                    </span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle className='text-center font-medium mb-4'>create your plan</DialogTitle>
                  <CreatePlan />
                </DialogContent>
              </Dialog>

              <Input placeholder='search' />
            </div>
          </div>
          {/* view plans */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 my-3'>
            {
              data && (
                data.map((plans: Datetype) => (
                  <Planview key={plans.id} plan={plans} />
                ))
              )
            }

          </div>
        </div>
      </div>

    </>
  )

}
