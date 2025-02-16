import { useLogin } from '@/api/hooks/hook'
import FormLogin from '@/components/signInForm'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { createFileRoute, useRouter, useSearch } from '@tanstack/react-router'
import toast from 'react-hot-toast'

export const Route = createFileRoute('/(auth)/sign-in/')({
  component: RouteComponent,
})

type userLogin = {
  email: string,
  password: string
}


function RouteComponent() {

  const { mutate, data: detail, isPending, isError, error, isSuccess } = useLogin()
  const onSingin = (data: userLogin) => {
    console.log("log", data)
    mutate(data)
  }
  const router = useRouter()
  const search = Route.useSearch()
  if (isError) {
    toast.error(error?.message)
  }
  if (isSuccess) {
    toast.success("welcome back!")
    console.log("d", detail)
    router.navigate(({ to: "/dashboard" }))
    // router.history.push(search.redirect)
  }




  return (
    <>
      <div className='min-h-screen py-12 px-4 sm:px-6 lg:px-8'>

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
                <FormLogin onLogin={onSingin} loading={isPending} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
