import { useCreateUser } from '@/api/hooks/hook'
import FormRegister from '@/components/form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useNavigate, useRouter, useRouterState } from '@tanstack/react-router'
import { createFileRoute } from '@tanstack/react-router'
import toast from 'react-hot-toast'

export const Route = createFileRoute('/(auth)/sign-up/')({
  component: RouteComponent,
})

type UserData = {
  username: string,
  email: string,
  password: string
}


function RouteComponent() {

  const { mutate, data: detail, isPending, isError, error, isSuccess } = useCreateUser()

  const router = useRouter()
  const creatUser = async (data: UserData) => {
    console.log("doo", data)
    mutate(data)
  }
  if (isError) {
    toast.error(error?.message)
  }
  if (isSuccess) {
    router.navigate({ to: "/sign-in" })
  }


  if (detail) {
    toast.success((detail.message))
  }
  return (
    <>
      <div className='min-h-screen py-8 px-4 sm:px-6 lg:px-8'>

        <div className='max-w-6xl mx-auto'>
          <div className='max-w-lg mx-auto'>
            <Card>
              <CardHeader>
                <CardTitle>
                  <div className='text-center mb-4'>
                    <h1 className='text-2xl sm:text-3xl font-semibold text-purple-600'>Create Account!</h1>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className='py-4'>
                <FormRegister loading={isPending} onCreate={creatUser} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
