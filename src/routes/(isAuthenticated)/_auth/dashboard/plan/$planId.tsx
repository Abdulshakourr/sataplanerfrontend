
import { usegetPlan } from '@/api/hooks/hook'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Plus, Quote, Download, QrCode, ArrowLeft } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { userDataInstance } from '@/api/client/axiosInstance'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import MotivationForm from '@/components/motivationForm'
import MotivationView from '@/components/motivationView'

export const Route = createFileRoute('/(isAuthenticated)/_auth/dashboard/plan/$planId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { planId } = Route.useParams()
  const { data, isError, error, isLoading } = usegetPlan(planId)
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)

  if (isError) {
    console.log("idplan", error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
        <Card className="w-full max-w-md border-none shadow-lg bg-white/90 backdrop-blur-sm p-6">
          <div className="text-center space-y-4">
            <div className="bg-red-100 text-red-600 p-3 rounded-full inline-flex">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Error Loading Plan</h2>
            <p className="text-gray-500">We couldn’t load the plan details. Please try again.</p>
            <Button
              variant="outline"
              asChild
              className="mt-4 h-11 px-6 border-gray-200 text-gray-700 hover:bg-gray-100 rounded-lg transition-all"
            >
              <Link to="/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Return to Dashboard
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  const generateQr = () => {
    setLoading(true)
    userDataInstance.get(`/qrcode/generate-permanent-qr/${planId}`, {
      responseType: "blob",
    })
      .then((data) => {
        const url = URL.createObjectURL(data.data)
        setLoading(false)
        setUrl(url)
      })
      .catch((err) => {
        console.error("QR generation failed:", err)
        setLoading(false)
      })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header with navigation and actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Button
            variant="ghost"
            asChild
            className="gap-2 px-0 text-gray-700 hover:text-purple-600 transition-colors"
          >
            <Link to="/dashboard" className="flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span>Back to Dashboard</span>
            </Link>
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="lg"
                className="h-11 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all gap-2"
              >
                <QrCode className="h-4 w-4" />
                Generate QR Code
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-white/90 backdrop-blur-sm border-none shadow-xl">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold text-center text-gray-900">
                  QR Code Generator
                </DialogTitle>
                <DialogDescription className="text-center text-gray-500 max-w-sm mx-auto">
                  Generate a QR code for quick access to this plan. Scan or download it.
                </DialogDescription>
              </DialogHeader>

              <div className="flex flex-col items-center justify-center p-6">
                <div className="h-64 w-64 my-4 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center bg-gray-50">
                  {url ? (
                    <img src={url} alt="QR Code" className="h-60 w-60 object-contain" />
                  ) : (
                    <div className="text-center p-4">
                      <QrCode className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                      <span className="text-sm text-gray-500">QR code will appear here</span>
                    </div>
                  )}
                </div>

                {loading && (
                  <div className="flex items-center justify-center gap-2 text-purple-600 mt-2">
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Generating...</span>
                  </div>
                )}

                {!url ? (
                  <Button
                    onClick={generateQr}
                    className="mt-4 h-11 px-6 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
                    disabled={loading}
                  >
                    {loading ? "Generating..." : "Generate QR Code"}
                  </Button>
                ) : (
                  <Button
                    asChild
                    className="mt-4 h-11 px-6 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all gap-2"
                  >
                    <a href={url} download="plan-qrcode.png">
                      <Download className="h-4 w-4" />
                      Download
                    </a>
                  </Button>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Plan Details Card */}
        <Card className="bg-white/90 backdrop-blur-sm border-none shadow-lg rounded-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-transparent border-b border-gray-100 pb-6">
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-8 w-3/4 bg-gray-200" />
                <Skeleton className="h-4 w-1/2 bg-gray-200" />
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Badge className="bg-purple-100 text-purple-700 border-purple-200 px-3 py-1 font-medium">
                    Goal
                  </Badge>
                </div>
                <CardTitle className="text-2xl sm:text-3xl font-semibold text-gray-900">
                  {data?.name}
                </CardTitle>
              </div>
            )}
          </CardHeader>

          <CardContent className="pt-6">
            {isLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-4 w-full bg-gray-200" />
                <Skeleton className="h-4 w-5/6 bg-gray-200" />
                <Skeleton className="h-4 w-4/6 bg-gray-200" />
              </div>
            ) : (
              <p className="text-gray-600 leading-relaxed">
                {data?.description || "No description available for this plan."}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Motivation Section */}
        <Card className="bg-white/90 backdrop-blur-sm border-none shadow-lg rounded-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-transparent border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-2 rounded-full">
                  <Quote className="h-5 w-5 text-purple-600" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">Motivations</CardTitle>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-11 px-4 border-gray-200 text-gray-700 hover:bg-gray-100 rounded-lg transition-all gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span className="hidden sm:inline">Add Motivation</span>
                    <span className="sm:hidden">Add</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-white/90 backdrop-blur-sm border-none shadow-xl">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-center text-gray-900">
                      Add New Motivation
                    </DialogTitle>
                    <DialogDescription className="text-center text-gray-500 max-w-sm mx-auto">
                      Add quotes or videos to stay motivated on your journey.
                    </DialogDescription>
                  </DialogHeader>
                  <MotivationForm planId={planId} />
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>

          <CardContent className="pt-6">
            <MotivationView id={planId} />
          </CardContent>

          <CardFooter className="bg-gray-50/50 border-t border-gray-100 px-6 py-4">
            <p className="text-sm text-gray-500 italic">
              "Stay inspired by adding motivational content regularly."
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
