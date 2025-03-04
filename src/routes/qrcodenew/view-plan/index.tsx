
import { Card } from '@/components/ui/card'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { Quote, } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { z } from "zod"
import Motivateview from '@/components/privateMotivationView'

const Base_URL = import.meta.env.VITE_BASE_URL

export const Route = createFileRoute('/qrcodenew/view-plan/')({
  component: RouteComponent,
  validateSearch: z.object({
    token: z.string()
  }),
})

function RouteComponent() {
  const search = Route.useSearch()
  console.log("SS", search.token)

  const router = useRouter()

  const { data, isError, isLoading } = useQuery({
    queryKey: ["private", search.token],
    queryFn: async () => {
      try {
        const response = await axios.get(`${Base_URL}/qrcode/view-goal?token=${search.token}`)
        console.log("res", response)
        return response.data
      } catch (error) {
        console.log("E", error)
        throw error
      }
    }
  })


  console.log("d", data)
  if (isError) {
    console.log("derder")
    router.navigate({ to: "/sign-in" })
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Goal Details  */}
        <Card className="bg-white/95 backdrop-blur-md border-teal-200 border shadow-md rounded-2xl overflow-hidden">
          <div className="p-6 space-y-4">
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-9 w-56 bg-teal-100" />
                <Skeleton className="h-5 w-full bg-teal-100" />
                <Skeleton className="h-5 w-3/4 bg-teal-100" />
              </div>
            ) : (
              <>
                <h1 className="text-3xl font-bold text-teal-800 leading-tight">{data?.goal_details.name}</h1>
                <p className="text-teal-600 text-sm leading-relaxed">{data?.goal_details.description}</p>
              </>
            )}
          </div>
        </Card>

        {/* Motivation Section */}
        <Card className="bg-white/95 backdrop-blur-md border-teal-200 border shadow-md rounded-2xl overflow-hidden">
          <div className="p-6 space-y-6">
            <div className="flex items-center gap-3 border-b border-teal-100 pb-4">
              <div className="bg-teal-100 p-2 rounded-full">
                <Quote className="h-5 w-5 text-teal-600" />
              </div>
              <h2 className="text-xl font-semibold text-teal-800">Your Motivations</h2>
            </div>
            <Motivateview motivation={data?.goal_details?.motivations} />
          </div>
        </Card>
      </div>
    </div>
  )
}
