import { usegetGoal } from '@/api/hooks/hook'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger
} from '@/components/ui/dialog'
import { Card, CardContent } from '@/components/ui/card'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Quote, ArrowLeft, Calendar, Check, Clock, Edit, Share2, Target } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { userDataInstance } from '@/api/client/axiosInstance'
import { useState } from 'react'
import { toast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'

export const Route = createFileRoute('/(isAuthenticated)/_auth/dashboard/goal/$goalId')({
  component: RouteComponent,
})

interface Motivation {
  id: number
  type: 'quote' | 'link'
  content: string
}

function RouteComponent() {
  const { goalId } = Route.useParams()
  const { data, isError, error, isLoading } = usegetGoal(goalId)
  const [loading, setLoading] = useState(false)
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)
  const [newMotivation, setNewMotivation] = useState('')
  const [motivationType, setMotivationType] = useState<'quote' | 'link'>('quote')
  const [motivations, setMotivations] = useState<Motivation[]>([
    { id: 1, type: 'quote', content: '"The only limit is the one you set yourself"' },
    { id: 2, type: 'link', content: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' }
  ])

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-medium">Goal Not Found</h1>
          <p className="text-muted-foreground">The goal you're looking for doesn't exist</p>
          <Button asChild>
            <Link to="/dashboard">Back to Dashboard</Link>
          </Button>
        </div>

      </div>
    )
  }

  const generateQr = () => {
    setLoading(true)
    userDataInstance.get(`/qrcode/generate-permanent-qr/${goalId}`, {
      responseType: "blob",
    })
      .then(() => {
        setLoading(false)
        toast({
          title: "QR Code Generated",
          description: "Share this goal with others using the QR code",
        })
        setIsShareDialogOpen(false)
      })
      .catch((err) => {
        console.error("QR generation failed:", err)
        setLoading(false)
      })
  }

  const handleCompleteGoal = () => {
    toast({
      title: "Goal Completed",
      description: "Congratulations on achieving your goal!",
    })
  }

  const handleAddMotivation = () => {
    if (!newMotivation.trim()) {
      toast({
        title: "Empty Motivation",
        description: "Please add some content",
        variant: "destructive",
      })
      return
    }

    setMotivations([
      ...motivations,
      {
        id: motivations.length + 1,
        type: motivationType,
        content: newMotivation
      }
    ])

    toast({
      title: "Motivation Added",
      description: "Your motivation has been saved",
    })
    setNewMotivation('')
  }

  const renderMotivationItem = (motivation: Motivation) => {
    if (motivation.type === 'quote') {
      return (
        <Card key={motivation.id} className="border-0 shadow-none bg-muted/10 hover:bg-muted/20 transition-colors">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Quote className="h-5 w-5 mt-0.5 text-muted-foreground flex-shrink-0" />
              <p className="text-sm">"{motivation.content}"</p>
            </div>
          </CardContent>
        </Card>
      )
    } else {
      // Extract YouTube video ID
      const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|youtu\.be\/)([^"&?\/\s]{11}))/
      const match = motivation.content.match(youtubeRegex)
      const videoId = match ? match[1] : null

      return (
        <Card key={motivation.id} className="border-0 shadow-none bg-muted/10 hover:bg-muted/20 transition-colors">
          <CardContent className="p-0 overflow-hidden rounded-lg">
            {videoId ? (
              <div className="aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}`}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="p-4">
                <div className="flex items-center gap-3">
                  <Share2 className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  <a
                    href={motivation.content}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline break-all"
                  >
                    {motivation.content}
                  </a>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )
    }
  }

  const isOverdue = data?.status === 'ACTIVE' && new Date(data?.due_date) < new Date()
  const daysRemaining = data?.due_date
    ? Math.ceil((new Date(data.due_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : 0

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="flex items-start justify-between">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground"
              asChild
            >
              <Link to="/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Link>
            </Button>

            <div className="flex gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link to={`/dashboard/goal/${goalId}/edit`}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Link>
              </Button>
              <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Share Goal</DialogTitle>
                    <DialogDescription>
                      Generate a QR code to share this goal with others
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex justify-center py-4">
                    <Target className="h-12 w-12 text-primary" />
                  </div>
                  <DialogFooter>
                    <Button onClick={generateQr} isLoading={loading}>
                      Generate QR Code
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Goal Title */}
          <div className="space-y-2">
            <h1 className="text-3xl font-medium tracking-tight">
              {isLoading ? <Skeleton className="h-9 w-64" /> : data?.name}
            </h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {data?.status === 'ACTIVE' && data?.due_date && (
                <>
                  <Clock className="h-4 w-4" />
                  <span className={isOverdue ? "text-destructive" : ""}>
                    {isOverdue
                      ? 'Overdue'
                      : `${daysRemaining} ${daysRemaining === 1 ? 'day' : 'days'} remaining`
                    }
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Cover Image */}
              <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                {data?.cover_image ? (
                  <img
                    src={data.cover_image}
                    alt={data.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Target className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}
              </div>

              {/* Description */}
              <Card className="border-0 shadow-none">
                <CardContent className="p-0">
                  <h2 className="text-lg font-medium mb-4">Description</h2>
                  {isLoading ? (
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-5/6" />
                      <Skeleton className="h-4 w-4/6" />
                    </div>
                  ) : (
                    <p className="text-muted-foreground">
                      {data?.description || "No description available"}
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Enhanced Motivation Section */}
              <div className="space-y-4">
                <h2 className="text-lg font-medium">Motivation</h2>

                {/* Motivations List */}
                <div className="space-y-3">
                  {motivations.length > 0 ? (
                    motivations.map(renderMotivationItem)
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Quote className="mx-auto h-8 w-8 mb-2" />
                      <p>No motivations added yet</p>
                    </div>
                  )}
                </div>

                {/* Add New Motivation */}
                <Card className="border-0 shadow-none">
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <Button
                          variant={motivationType === 'quote' ? 'default' : 'ghost'}
                          size="sm"
                          onClick={() => setMotivationType('quote')}
                        >
                          <Quote className="h-4 w-4 mr-2" />
                          Quote
                        </Button>
                        <Button
                          variant={motivationType === 'link' ? 'default' : 'ghost'}
                          size="sm"
                          onClick={() => setMotivationType('link')}
                        >
                          <Share2 className="h-4 w-4 mr-2" />
                          Video/Link
                        </Button>
                      </div>

                      {motivationType === 'quote' ? (
                        <div className="flex gap-2">
                          <Input
                            placeholder="Add an inspiring quote..."
                            value={newMotivation}
                            onChange={(e) => setNewMotivation(e.target.value)}
                          />
                          <Button
                            variant="outline"
                            onClick={handleAddMotivation}
                            disabled={!newMotivation.trim()}
                          >
                            Add Quote
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Input
                            placeholder="Paste a YouTube or video link..."
                            value={newMotivation}
                            onChange={(e) => setNewMotivation(e.target.value)}
                          />
                          <div className="flex justify-between items-center">
                            <p className="text-xs text-muted-foreground">
                              Supports YouTube, Vimeo, and other embeddable links
                            </p>
                            <Button
                              variant="outline"
                              onClick={handleAddMotivation}
                              disabled={!newMotivation.trim()}
                            >
                              Add Video
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Status */}
              <Card className="border-0 shadow-none">
                <CardContent className="p-0">
                  <h3 className="text-lg font-medium mb-4">Status</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Status</span>
                      <span className={cn(
                        "text-xs px-2 py-1 rounded-full",
                        data?.status === 'COMPLETED'
                          ? "bg-green-500/10 text-green-600"
                          : "bg-primary/10 text-primary"
                      )}>
                        {data?.status}
                      </span>
                    </div>

                    {data?.due_date && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Due Date</span>
                        <span className="text-sm">
                          {new Date(data.due_date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card className="border-0 shadow-none">
                <CardContent className="p-0">
                  <h3 className="text-lg font-medium mb-4">Actions</h3>
                  <div className="space-y-2">
                    {data?.status === 'ACTIVE' ? (
                      <>
                        <Button
                          variant="default"
                          className="w-full"
                          onClick={handleCompleteGoal}
                        >
                          <Check className="h-4 w-4 mr-2" />
                          Complete Goal
                        </Button>
                        <Button variant="outline" className="w-full">
                          Update Progress
                        </Button>
                      </>
                    ) : (
                      <Button variant="default" className="w-full" disabled>
                        <Check className="h-4 w-4 mr-2" />
                        Completed
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}