
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { LogOut, User } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { useAuthStore } from '@/store/auth'

interface UserData {
  username: string
  email: string
}

export function UserPopover({ data, }: { data: UserData }) {
  const { SignOut } = useAuthStore()
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="p-3 rounded-full  hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-label="User menu"
        >
          <User className="h-6 w-6 text-foreground" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-6 space-y-4">
        {/* User Info Section */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-primary-foreground">
              <span className="text-lg font-medium">
                {data.username[0].toUpperCase()}
              </span>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">
                {data.username}
              </h1>
              <p className="text-sm text-muted-foreground">{data.email}</p>
            </div>
          </div>
        </div>

        {/* Actions Section */}
        <div className="flex flex-col gap-2">
          <Button
            asChild
            variant="outline"
            className="w-full justify-start gap-2 hover:bg-accent/50"
          >
            <Link to="/profile">
              <User className="h-4 w-4" />
              <span>View Profile</span>
            </Link>
          </Button>
          <Button
            onClick={SignOut}
            variant="ghost"
            className="w-full justify-start gap-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
