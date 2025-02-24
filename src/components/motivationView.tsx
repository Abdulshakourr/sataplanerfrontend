
import { usegetMotivation } from '@/api/hooks/hook'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Instagram, Quote, Trash2Icon, Youtube } from 'lucide-react'
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


  if (isPending) {

  }


  const renderMediaLink = (link: string) => {
    if (link.includes("youtube.com") || link.includes("youtu.be")) {
      const videoId = link.match(
        /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
      )?.[1];

      return (
        <div className="">
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
        <div className="">
          <blockquote
            className="tiktok-embed"
            cite={link}
            data-video-id={link.split("/video/")[1]}
          >
            <section>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={link}
                className="text-primary hover:underline"
              >
                View on TikTok
              </a>
            </section>
          </blockquote>
        </div>
      );
    } else if (link.includes("instagram.com")) {
      return (
        <div className="mt-4">
          <Button asChild variant="outline" className="gap-2">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={link}
              className="text-primary hover:underline"
            >
              <Instagram className="h-4 w-4" />
              View on Instagram
            </a>
          </Button>
        </div>
      );
    }

    return (
      <Button asChild variant="outline" className="mt-4">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={link}
          className="text-primary hover:underline"
        >
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

  return (
    <>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {
          data && (
            data?.map((motivation: Motivation) => (
              <>
                <Card className="hover:shadow-md transition-shadow  " key={motivation.quote}>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Trash2Icon className=' h-6 w-6 text-red-500' onClick={() => deleteMotivation(motivation.id)} />
                      <Quote className="h-5 w-5 text-primary" />
                      <CardTitle>Quotes</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 ">
                      {
                        motivation.quote ? (
                          <div className="text-muted-foreground italic  border-l-4 pl-2 ">
                            {motivation.quote}
                          </div>
                        ) : (
                          <div className="text-muted-foreground">
                            No quotes added yet
                          </div>

                        )
                      }
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow" key={motivation.link}>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Youtube className="h-5 w-5 text-primary" />
                      <CardTitle>Videos</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Placeholder for videos */}
                      {
                        motivation.link ? (
                          <div className="text-muted-foreground">
                            {
                              renderMediaLink(motivation.link)
                            }
                          </div>
                        ) : (
                          <div className="text-muted-foreground">
                            No videos added yet
                          </div>
                        )
                      }

                    </div>
                  </CardContent>
                </Card>
              </>
            ))
          )
        }

      </div>
    </>
  )
}
