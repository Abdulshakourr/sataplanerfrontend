import { usegetMotivation } from '@/api/hooks/hook'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Instagram, Quote, Trash2Icon, Youtube, ExternalLink } from 'lucide-react'
import { Button } from './ui/button'
import { userDataInstance } from '@/api/client/axiosInstance'
import { useQueryClient } from '@tanstack/react-query'

interface Motivation {
  id: number,
  link: string | null,
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
        /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
      )?.[1];

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
      );
    } else if (link.includes("tiktok.com")) {
      return (
        <div className="rounded-lg text-center">
          <blockquote
            className="tiktok-embed"
            cite={link}
            data-video-id={link.split("/video/")[1]}
          >
            <section>
              <Button asChild variant="outline" className="gap-2 hover:bg-gray-50 dark:hover:bg-gray-800">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={link}
                >
                  <ExternalLink className="h-4 w-4" />
                  View on TikTok
                </a>
              </Button>
            </section>
          </blockquote>
        </div>
      );
    } else if (link.includes("instagram.com")) {
      return (
        <div className="mt-4">
          <Button asChild variant="outline" className="gap-2 hover:bg-gray-50 dark:hover:bg-gray-800">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={link}
            >
              <Instagram className="h-4 w-4" />
              View on Instagram
            </a>
          </Button>
        </div>
      );
    }

    return (
      <Button asChild variant="outline" className="mt-4 gap-2">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={link}
        >
          <ExternalLink className="h-4 w-4" />
          View Content
        </a>
      </Button>
    );
  };

  function deleteMotivation<ElementType>(id: ElementType) {
    console.log("clicket", id)
    userDataInstance.delete(`/motivations/${id}`)
      .then((data) => {
        console.log("deleted", data)
        queryClient.invalidateQueries({ queryKey: ["plans", "motivation"] })
      }).catch((err) => console.log("E", err))
  }

  // Helper to render empty state
  const renderEmptyState = (type: 'quote' | 'media') => {
    if (type === 'quote') {
      return (
        <div className="flex flex-col items-center justify-center py-6 text-center text-gray-400">
          <div className="text-5xl mb-2 font-serif">"</div>
          <div className="text-sm">No quotes added yet</div>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col items-center justify-center py-6 text-center text-gray-400">
          <Youtube className="h-10 w-10 mb-2 opacity-30" />
          <div className="text-sm">No videos added yet</div>
        </div>
      );
    }
  };

  return (
    <>
      {isPending && (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-pulse h-8 w-8 rounded-full bg-gray-200"></div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data && data.map((motivation: Motivation) => (
          <>
            <Card className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow" key={`quote-${motivation.id}`}>
              <CardHeader className="py-3 px-4 flex flex-row items-center justify-between border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Quote className="h-4 w-4 text-gray-500" />
                  <CardTitle className="text-sm font-medium text-gray-700">Inspirational Quote</CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-50"
                  onClick={() => deleteMotivation(motivation.id)}
                >
                  <Trash2Icon className='h-3.5 w-3.5' />
                  <span className="sr-only">Delete</span>
                </Button>
              </CardHeader>
              <CardContent className="p-4">
                {motivation.quote ? (
                  <div className="py-2 px-3 bg-gray-50 rounded-md text-gray-600 text-sm">
                    "{motivation.quote}"
                  </div>
                ) : (
                  renderEmptyState('quote')
                )}
              </CardContent>
            </Card>

            <Card className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow" key={`media-${motivation.id}`}>
              <CardHeader className="py-3 px-4 flex flex-row items-center justify-between border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Youtube className="h-4 w-4 text-red-500" />
                  <CardTitle className="text-sm font-medium text-gray-700">Motivational Media</CardTitle>
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
        <div className="mt-4 text-center text-xs text-gray-400 italic">
          "Stay motivated by regularly adding inspirational content to keep your plan on track."
        </div>
      )}
    </>
  )
}
