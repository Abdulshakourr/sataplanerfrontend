

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useState } from "react"
import { Youtube, Quote, Instagram, Music } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { usecreateMotivation } from "@/api/hooks/hook"
import { useQueryClient } from "@tanstack/react-query"

const formSchema = z.object({
  link: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.string().url("Please enter a valid URL").optional()
  ),
  quote: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.string().min(10, "Quote must be at least 10 characters").optional()
  ),
}).refine(data => data.link || data.quote, {
  message: "Please provide either a video link or a quote",
})
type FormValues = z.infer<typeof formSchema>

export default function MotivationForm({ goalId }: { goalId: string }) {
  const [activeTab, setActiveTab] = useState<"video" | "quote">("video")
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  })
  const queryClient = useQueryClient()
  const { mutate, isPending, isError, data, error, isSuccess } = usecreateMotivation(goalId)

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      mutate({
        link: data.link ?? undefined,
        quote: data.quote ?? undefined,
      })


      toast({
        title: "Motivation submitted successfully!",
        description: data.link
          ? "Your video link has been added."
          : "Your quote has been added.",
      })
      setValue("link", "")
      setValue("quote", "")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit motivation. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (isError) {
    console.log("E", error)
  }

  if (isSuccess) {
    queryClient.invalidateQueries({ queryKey: ["goals", "motivation"] })
    console.log("DAT", data)
  }

  const videoLink = watch("link")

  const getPlatformIcon = (link: string) => {
    if (link.includes("youtube.com") || link.includes("youtu.be")) {
      return <Youtube className="h-5 w-5 text-red-500" />
    }
    if (link.includes("instagram.com")) {
      return <Instagram className="h-5 w-5 text-pink-500" />
    }
    if (link.includes("tiktok.com")) {
      return <Music className="h-5 w-5 text-black" />
    }
    return null
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as "video" | "quote")}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 bg-gray-100 p-1 rounded-lg">
          <TabsTrigger
            value="video"
            className="h-11 gap-2 text-gray-700 data-[state=active]:bg-white data-[state=active]:text-purple-600 data-[state=active]:shadow-sm rounded-md transition-all"
          >
            <Youtube className="h-4 w-4" />
            Video
          </TabsTrigger>
          <TabsTrigger
            value="quote"
            className="h-11 gap-2 text-gray-700 data-[state=active]:bg-white data-[state=active]:text-purple-600 data-[state=active]:shadow-sm rounded-md transition-all"
          >
            <Quote className="h-4 w-4" />
            Quote
          </TabsTrigger>
        </TabsList>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-6">
          <TabsContent value="video" className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Video Link (YouTube, Instagram, TikTok)
              </label>
              <div className="relative">
                <Input
                  {...register("link")}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="h-12 bg-gray-50 border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 rounded-lg pr-10 transition-all"
                />
                {videoLink && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {getPlatformIcon(videoLink)}
                  </div>
                )}
              </div>
              {errors.link && (
                <p className="text-xs text-red-500 mt-1">{errors.link.message}</p>
              )}
              {errors.root && (
                <p className="text-xs text-red-500 mt-1">{errors.root.message}</p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="quote" className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Motivational Quote
              </label>
              <Input
                {...register("quote")}
                placeholder="Enter your inspiring quote..."
                className="h-12 bg-gray-50 border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 rounded-lg transition-all"
              />
              {errors.quote && (
                <p className="text-xs text-red-500 mt-1">{errors.quote.message}</p>
              )}
            </div>
          </TabsContent>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setValue("link", "")
                setValue("quote", "")
              }}
              className="h-11 px-6 border-gray-200 text-gray-700 hover:bg-gray-100 rounded-lg transition-all"
            >
              Clear
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="h-11 px-6 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              {isPending ? (
                <span className="flex items-center">
                  <svg className="animate-spin mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </form>
      </Tabs>
    </div>
  )
}

