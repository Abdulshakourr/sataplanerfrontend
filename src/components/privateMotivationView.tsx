
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Instagram, Quote, Youtube } from 'lucide-react'
import { Button } from './ui/button'


interface Motivation {
  id: number,
  link: string | null,
  quote: string | null
}

// Define props interface correctly
interface MotivateviewProps {
  motivation: Motivation[];
}



export default function Motivateview({ motivation }: MotivateviewProps) {


  console.log("m", motivation)


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

  return (
    <>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {
          motivation && (
            motivation?.map((motivations: Motivation) => (
              <>
                <div key={motivations.id} className="contents">
                  <Card className="hover:shadow-md transition-shadow  ">
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <Quote className="h-5 w-5 text-primary" />
                        <CardTitle>Quotes</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4 ">
                        {
                          motivations.quote ? (
                            <div className="text-muted-foreground italic  border-l-4 pl-2 ">
                              {motivations.quote}
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

                  <Card className="hover:shadow-md transition-shadow" key={motivations.link}>
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
                          motivations.link ? (
                            <div className="text-muted-foreground">
                              {
                                renderMediaLink(motivations.link)
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
                </div>
              </>
            ))
          )
        }

      </div>
    </>
  )
}
