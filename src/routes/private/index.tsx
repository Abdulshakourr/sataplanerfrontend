
import { Button } from '@/components/ui/button'
import { Card, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import { createFileRoute } from '@tanstack/react-router'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const Route = createFileRoute('/private/')({
  component: RouteComponent,
  validateSearch: z.object({
    goal_id: z.string()
  }),
})

const Base_URL = import.meta.env.VITE_BASE_URL

const formSchema = z.object({
  password: z.string()
    .min(8)
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[1-9]/, { message: "Password must contain at least one number" })
    .regex(/[!@#$%^&*]/, { message: "Password must contain at least one special character" })
})

function RouteComponent() {
  const { goal_id } = Route.useSearch()
  console.log("p", goal_id)

  const router = useRouter()

  const { mutate, isPending, isSuccess, data } = useMutation({
    mutationFn: async (data: { goal_id: number, password: string }) => {
      console.log("m", data.goal_id, data.password)
      // 'https://goalset-ae9h.onrender.com/api/v1/qrcode/verify-goal-access?goal_id=9f8c00f6-8dcf-4da1-812b-ca49206b36a1&password=Abdulshakour1%40' \
      const response = await axios.post(`${Base_URL}/qrcode/verify-goal-access?goal_id=${data.goal_id}&password=${data.password}`)
      return response.data
    }
  })

  if (data) {
    console.log("DD", data)
  }

  if (isSuccess) {
    console.log("s", data.redirect_url)
    router.navigate({ to: `/qrcodenew/view-plan`, search: { token: data.token } })
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: ""
    }
  })

  const onSubmit = (value: z.infer<typeof formSchema>) => {
    console.log("v", value)
    const data = { ...value, goal_id }
    console.log(data)
    mutate(data)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <Card className="max-w-md w-full bg-white/90 backdrop-blur-sm border-none shadow-lg rounded-xl p-6">
        <CardTitle className="text-2xl font-semibold text-gray-900 text-center mb-6">
          Authentication Required
        </CardTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Enter Password</FormLabel>
                  <FormControl>
                    <Input
                      className="h-12 bg-gray-50 border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 rounded-lg transition-all"
                      placeholder="••••••••"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
            <Button
              className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
              disabled={isPending}
            >
              {isPending ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Authenticating...
                </span>
              ) : (
                "Authenticate"
              )}
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  )
}
