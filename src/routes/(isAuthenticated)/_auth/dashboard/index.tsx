import { useUserPlans } from '@/api/hooks/hook'
import CreatePlan from '@/components/addPLan'
import Planview from '@/components/Planview'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
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


  return (
    <>

      <div className='bg-gray-50 py-4'>
        <div className='max-w-6xl mx-auto px-6'>
          <div className='flex justify-start'>
            <div className='max-w-md flex gap-2 w-full bg-orange-00'>
              <Dialog>
                <DialogTrigger>
                  <Button size={`lg`} className='bg-purple-500 hover:bg-purple-600 transitions-all ease-in-out font-bold'>
                    <Plus className='' /> <span>Create plan</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <CreatePlan />
                </DialogContent>
              </Dialog>

              <Input placeholder='search' />
            </div>
          </div>
          {/* view plans */}
          <div className=''>
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
