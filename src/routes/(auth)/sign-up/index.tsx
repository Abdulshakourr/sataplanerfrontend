import { useCreateUser } from '@/api/hooks/hook'
import FormRegister from '@/components/form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useRouter } from '@tanstack/react-router'
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-gray-200">
          <CardHeader className="pb-0">
            <CardTitle>
              <div className="text-center">
                <h1 className="text-3xl font-bold text-purple-600">Join Us Today</h1>
                <p className="mt-1 text-sm text-gray-500">Create your account in seconds</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <FormRegister loading={isPending} onCreate={creatUser} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
