
import { Button } from '@/components/ui/button'
import { Card, CardTitle, CardDescription } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import { createFileRoute } from '@tanstack/react-router'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

export const Route = createFileRoute('/private/')({
  component: RouteComponent,
  validateSearch: z.object({
    goal_id: z.string().min(1, "Goal ID is required")
  }),
})

const Base_URL = import.meta.env.VITE_BASE_URL

const formSchema = z.object({
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, { message: "Must contain at least one uppercase letter" })
    .regex(/[0-9]/, { message: "Must contain at least one number" })
    .regex(/[!@#$%^&*]/, { message: "Must contain at least one special character" })
})

function RouteComponent() {
  const { goal_id } = Route.useSearch()
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: { goal_id: string, password: string }) => {
      try {
        const response = await axios.post(`${Base_URL}/qrcode/verify-goal-access?goal_id=${data.goal_id}&password=${data.password}`)
        return response.data
      } catch (err) {
        if (axios.isAxiosError(err)) {
          throw new Error(err.response?.data?.message || "Authentication failed")
        }
        throw new Error("Network error occurred")
      }
    },
    onSuccess: (data) => {
      router.navigate({
        to: '/qrcodenew/view-plan',
        search: { token: data.token },
        replace: true
      })
    },
    onError: (err: Error) => {
      setError(err.message)
      toast.error(err.message)

    }
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: ""
    }
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setError(null)
    mutate({ ...values, goal_id })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <Card className="max-w-md w-full bg-white/90 backdrop-blur-sm border-none shadow-lg rounded-xl p-8">
        <div className="text-center space-y-2 mb-8">
          <CardTitle className="text-3xl font-bold text-gray-900">
            Secure Access
          </CardTitle>
          <CardDescription className="text-gray-600">
            Enter the password to view this goal
          </CardDescription>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error}
            </AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel className="text-sm font-medium text-gray-700">Password</FormLabel>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-sm text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? (
                        <span className="flex items-center gap-1">
                          <EyeOff className="h-4 w-4" /> Hide
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <Eye className="h-4 w-4" /> Show
                        </span>
                      )}
                    </button>
                  </div>
                  <FormControl>
                    <div className="relative">
                      <Input
                        className="h-12 bg-gray-50 border-gray-200 focus:ring-2 focus:ring-primary/50 focus:border-primary rounded-lg transition-all pr-10"
                        placeholder="Enter your password"
                        type={showPassword ? "text" : "password"}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full h-12 bg-primary hover:bg-primary/90 text-white rounded-lg transition-all"
              disabled={isPending}
            >
              {isPending ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verifying...
                </span>
              ) : (
                "Continue"
              )}
            </Button>
          </form>
        </Form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Contact the goal owner if you don't have access</p>
        </div>
      </Card>
    </div>
  )
}