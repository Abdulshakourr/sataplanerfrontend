import FormRegister from '@/components/form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/sign-up/')({
  component: RouteComponent,
})

type UserData = {
  username: string,
  email: string,
  password: string
}


function RouteComponent() {


  const createUser = async (data: UserData) => {
    setTimeout(() => console.log("D", data)
      , 3000)
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
                <FormRegister onCreate={createUser} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
