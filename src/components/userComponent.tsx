
import { Avatar, AvatarFallback } from "./ui/avatar"

import { EditIcon } from "lucide-react"



interface User {
  id: number
  first_name: string
  last_name: string
  email: string
  username: string
  bio: string
  created_at: string
}

export default function UserProfile({ user }: { user: User }) {

  const formattedDate = new Date(user.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-card rounded-lg  p-6">
        <div className="flex flex-col items-center space-y-4">
          {/* Profile Header */}
          <div>
            <Avatar className="w-24 h-24">
              <AvatarFallback className="text-3xl">{user.first_name && user?.first_name[0]}</AvatarFallback>
            </Avatar>
          </div>
          <div className="text-center py-6  w-full relative">
            <h1 className="text-2xl font-bold text-foreground">
              {user.first_name} {user.last_name}
            </h1>
            <p className="text-muted-foreground">@{user.username}</p>
            <EditIcon className="h-8 w-8 absolute right-0 top-0 text-green-500" />
          </div>

          {/* Profile Details */}
          <div className="w-full space-y-4">
            {/* Email */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-muted-foreground">
                Email
              </label>
              <div className="p-2 bg-muted rounded-md">
                <p className="text-foreground">{user.email}</p>
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-muted-foreground">
                Bio
              </label>
              <div className="p-2 bg-muted rounded-md">
                <p className="text-foreground">{user.bio}</p>

              </div>
            </div>

            {/* Member Since */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-muted-foreground">
                Member Since
              </label>
              <div className="p-2 bg-muted rounded-md">
                <p className="text-foreground">{formattedDate}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
