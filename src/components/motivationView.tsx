
import { usegetMotivation } from '@/api/hooks/hook'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Instagram, Quote, Trash2Icon, Youtube, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { userDataInstance } from '@/api/client/axiosInstance'
import { useQueryClient } from '@tanstack/react-query'

interface Motivation {
  id: number
  link: string | null
  quote: string | null
}

export default function MotivationView({ id }: { id: string }) {
  const queryClient = useQueryClient()
  const { data, isError, error, isPending } = usegetMotivation(id)

  if (isError) {
    console.log("something went wrong", error)
  }

  const renderMediaLink = (link: string) => {
    if (link.includes("youtube.com") || link.includes("youtu.be")) {
      const videoId = link.match(
        /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
      )?.[1]
      return (
        <div className="rounded-lg overflow-hidden">
          <iframe
            className="w-full aspect-video rounded-lg"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )
    } else if (link.includes("tiktok.com")) {
      return (
        <Button
          asChild
          variant="outline"
          className="w-full h-11 border-gray-200 text-gray-700 hover:bg-gray-100 rounded-lg transition-all gap-2"
        >
          <a target="_blank" rel="noopener noreferrer" href={link}>
            <ExternalLink className="h-4 w-4" />
            View on TikTok
          </a>
        </Button>
      )
    } else if (link.includes("instagram.com")) {
      return (
        <Button
          asChild
          variant="outline"
          className="w-full h-11 border-gray-200 text-gray-700 hover:bg-gray-100 rounded-lg transition-all gap-2"
        >
          <a target="_blank" rel="noopener noreferrer" href={link}>
            <Instagram className="h-4 w-4 text-pink-500" />
            View on Instagram
          </a>
        </Button>
      )
    }
    return (
      <Button
        asChild
        variant="outline"
        className="w-full h-11 border-gray-200 text-gray-700 hover:bg-gray-100 rounded-lg transition-all gap-2"
      >
        <a target="_blank" rel="noopener noreferrer" href={link}>
          <ExternalLink className="h-4 w-4" />
          View Content
        </a>
      </Button>
    )
  }

  function deleteMotivation(id: number) {
    console.log("clicked", id)
    userDataInstance.delete(`/motivations/${id}`)
      .then((data) => {
        console.log("deleted", data)
        queryClient.invalidateQueries({ queryKey: ["plans", "motivation"] })
      })
      .catch((err) => console.log("E", err))
  }

  const renderEmptyState = (type: 'quote' | 'media') => {
    if (type === 'quote') {
      return (
        <div className="flex flex-col items-center justify-center py-6 text-gray-400">
          <Quote className="h-10 w-10 mb-2 opacity-30" />
          <span className="text-sm">No quotes added yet</span>
        </div>
      )
    } else {
      return (
        <div className="flex flex-col items-center justify-center py-6 text-gray-400">
          <Youtube className="h-10 w-10 mb-2 opacity-30" />
          <span className="text-sm">No media added yet</span>
        </div>
      )
    }
  }

  return (
    <div className="space-y-6">
      {isPending && (
        <div className="flex justify-center items-center min-h-[200px]">
          <svg className="animate-spin h-8 w-8 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data && data.map((motivation: Motivation) => (
          <>
            <Card
              className="bg-white/90 backdrop-blur-sm border-none shadow-md hover:shadow-lg rounded-xl overflow-hidden transition-all"
              key={`quote-${motivation.id}`}
            >
              <CardHeader className="py-3 px-4 flex items-center justify-between border-b border-gray-100 bg-gray-50/50">
                <div className="flex items-center gap-2">
                  <Quote className="h-4 w-4 text-purple-500" />
                  <CardTitle className="text-sm font-medium text-gray-700">Quote</CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                  onClick={() => deleteMotivation(motivation.id)}
                >
                  <Trash2Icon className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </CardHeader>
              <CardContent className="p-4">
                {motivation.quote ? (
                  <div className="py-2 px-3 bg-gray-50 rounded-lg text-gray-600 text-sm italic">
                    "{motivation.quote}"
                  </div>
                ) : (
                  renderEmptyState('quote')
                )}
              </CardContent>
            </Card>

            <Card
              className="bg-white/90 backdrop-blur-sm border-none shadow-md hover:shadow-lg rounded-xl overflow-hidden transition-all"
              key={`media-${motivation.id}`}
            >
              <CardHeader className="py-3 px-4 flex items-center justify-between border-b border-gray-100 bg-gray-50/50">
                <div className="flex items-center gap-2">
                  <Youtube className="h-4 w-4 text-red-500" />
                  <CardTitle className="text-sm font-medium text-gray-700">Media</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                {motivation.link ? (
                  <div>
                    {renderMediaLink(motivation.link)}
                  </div>
                ) : (
                  renderEmptyState('media')
                )}
              </CardContent>
            </Card>
          </>
        ))}
      </div>

      {data && data.length > 0 && (
        <div className="mt-4 text-center text-sm text-gray-500 italic">
          "Stay inspired by adding motivational content regularly."
        </div>
      )}
    </div>
  )
}
