import { MenuIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { cn } from "@/lib/utils";
import MobileNav from "./dashboarComponents/MobileNav";
import { Link } from "@tanstack/react-router";

export default function Navbar() {
  return (
    <nav
      className={cn(
        " md:hidden sticky top-0 z-50 py-3 px-4 border-b backdrop-blur-lg transition-all duration-300",
      )}
    >
      <div className="flex items-center justify-between ">
        {/* Mobile Navigation */}
        <Link to="/dashboard"><h1 className="uppercase font-bold text-goal-900 text-xl">goalset</h1></Link>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <MenuIcon className="h-8 w-8 cursor-pointer" />
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[280px] sm:w-[300px] flex flex-col"
            >
              <div className="hidden">
                <SheetTitle>d</SheetTitle>
                <SheetDescription>so</SheetDescription>
              </div>
              <MobileNav />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
