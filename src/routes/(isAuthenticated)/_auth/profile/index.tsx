import { createFileRoute } from "@tanstack/react-router";
import { useAuthStore } from "@/store/auth";
import { Calendar, Mail, User, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import UserProfile from "@/components/Userprofile";

export const Route = createFileRoute("/(isAuthenticated)/_auth/profile/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user, } = useAuthStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getInitials = (username: string | null | undefined) => {
    if (!username) return "US";
    const parts = username.split(/[ -]/);
    return parts
      .slice(0, 2)
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase();
  };



  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="relative bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="relative group">
              <Avatar className="h-28 w-28 md:h-36 md:w-36 border-4 border-background shadow-lg">
                <AvatarImage src={null} />
                <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-4xl font-medium">
                  {getInitials(user?.username)}
                </AvatarFallback>
              </Avatar>

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute -bottom-2 -right-2 rounded-full bg-background shadow-md hover:bg-primary hover:text-white transition-all"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md rounded-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">
                      Edit Profile
                    </DialogTitle>
                  </DialogHeader>
                  <UserProfile />
                </DialogContent>
              </Dialog>
            </div>

            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                  {user?.username || "Anonymous User"}
                </h1>
                <Badge variant="secondary" className="text-xs md:text-sm">
                  Member
                </Badge>
              </div>

              <p className="text-muted-foreground text-pretty text-sm md:text-base">
                {user?.bio || "No bio added yet"}
              </p>

              <div className="flex flex-wrap gap-4 pt-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>{user?.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    Joined{" "}
                    {user?.created_at &&
                      format(new Date(user.created_at), "MMM yyyy")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Info Card */}
          <div className="bg-card rounded-xl p-6 shadow-sm border border-border/20">
            <div className="flex items-center gap-2 pb-4">
              <User className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">Personal Information</h2>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">First Name</p>
                <p
                  className={cn(
                    !user?.first_name && "text-muted-foreground",
                    "mt-1",
                  )}
                >
                  {user?.first_name || "Not provided"}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Last Name</p>
                <p
                  className={cn(
                    !user?.last_name && "text-muted-foreground",
                    "mt-1",
                  )}
                >
                  {user?.last_name || "Not provided"}
                </p>
              </div>
            </div>
          </div>

          {/* Account Info Card */}
          <div className="bg-card rounded-xl p-6 shadow-sm border border-border/20">
            <div className="flex items-center gap-2 pb-4">
              <User className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">Account Details</h2>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Username</p>
                <p className="mt-1">@{user?.username}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">User ID</p>
                <p className="text-sm font-mono text-muted-foreground mt-1">
                  {user?.id}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
