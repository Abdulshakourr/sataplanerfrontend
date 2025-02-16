import FormLogin from '@/components/signInForm'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/sign-in/')({
  component: RouteComponent,
})

type userLogin = {
  email: string,
  password: string
}


function RouteComponent() {


  const onSingin = (data: userLogin) => {
    console.log("log", data)
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
                <FormLogin onLogin={onSingin} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
