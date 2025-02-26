import { useLogin } from '@/api/hooks/hook'
import FormLogin from '@/components/signInForm'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import expireDate from '@/lib/expireDate'
import { useAuthStore } from '@/store/auth'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useEffect } from 'react'
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
  const { setToken } = useAuthStore()
  const expire = expireDate(new Date)

  useEffect(() => {
    if (isSuccess) {
      console.log(detail)
      const { access_token, refresh_token } = detail
      setToken(access_token, refresh_token, expire)
      router.navigate({ to: "/dashboard" })
    }
  }, [isSuccess])

  if (isError) {
    toast.error(error?.message)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-gray-200">
          <CardHeader className="pb-0">
            <CardTitle>
              <div className="text-center">
                <h1 className="text-3xl font-bold text-purple-600">Welcome Back</h1>
                <p className="mt-1 text-sm text-gray-500">Sign in to your account</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <FormLogin onLogin={onSingin} loading={isPending} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
