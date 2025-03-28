import DashboardSidebar from "@/components/dashboarComponents/DashboardSidebar";
import Navbar from "@/components/dashNavbar";
import { useAuthStore } from "@/store/auth";
import {
  createFileRoute,
  Outlet,
  redirect,
  useRouter,
} from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/(isAuthenticated)/_auth")({
  beforeLoad: () => {
    const { isAuthenticated } = useAuthStore.getState();
    if (!isAuthenticated) {
      throw redirect({
        to: "/sign-in",
      });
    }
  },
  component: Auth,
});

function Auth() {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  useEffect(() => {
    if (!isAuthenticated) {
      router.navigate({ to: "/sign-in" });
    }
  }, [isAuthenticated, router]);

  return (
    <>
      <div className=" flex min-h-screen bg-gray-50">
        <DashboardSidebar />
        <main className="flex-1  ml-0 md:ml-56">
          <Navbar />
          <Outlet />
        </main>
      </div>
    </>
  );
}
