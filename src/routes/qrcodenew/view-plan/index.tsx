import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import { StepBack, Quote, Youtube } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { z } from "zod"
import Motivateview from '@/components/privateMotivationView'





const Base_URL = "http://localhost:8000"

export const Route = createFileRoute('/qrcodenew/view-plan/')({
  component: RouteComponent,

  validateSearch: z.object({
    token: z.string()// Coerces to number, defaults to 0 if invalid
  }),
})

function RouteComponent() {
  const search = Route.useSearch()
  console.log("SS", search.token)


  const router = useRouter()

  const { data, isError, isLoading } = useQuery({
    queryKey: ["private"],
    queryFn: async () => {
      try {
        const response = await axios.get(`${Base_URL}/qrcode/view-plan?token=${search.token}`)
        console.log("res", response)
        return response.data
      } catch (erro) {
        console.log("E", erro)

      }
    }
  })

  if (isError) {
    console.log("derder")
    router.navigate({ to: "/sign-in" })
  }





  return (
    <div className="min-h-screen  py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Back Button */}

        <div className="flex justify-between">
          <Button variant="outline" asChild className="gap-2">
            <Link to="/dashboard">
              <StepBack className="h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>

        {/* Plan Details */}
        <Card className="p-6">
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ) : (
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-primary">{data?.plan_details.name}</h1>
              <p className="text-muted-foreground">{data?.plan_details.description}</p>
            </div>
          )}
        </Card>

        {/* Motivation Section */}
        <Card className="p-6">
          <div className="flex flex-col space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Quote className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold">Motivation</h2>
              </div>
            </div>
          </div>
          <Motivateview motivation={data?.plan_details?.motivations} />
        </Card>
      </div>
    </div>
  )
}
