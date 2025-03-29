import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLogin } from "@/api/hooks/hook";
import { useAuthStore } from "@/store/auth";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import toast from "react-hot-toast";
import FormLogin from "@/components/signInForm";
import { client } from "@/api/client/client";

export const Route = createFileRoute("/(auth)/sign-in/")({
  component: RouteComponent,
});

type userLogin = {
  email: string;
  password: string;
};

function RouteComponent() {
  const {
    mutate,
    data: detail,
    isPending,
    isError,
    error,
    isSuccess,
  } = useLogin();
  const onSignin = (data: userLogin) => {
    console.log("log", data);
    mutate(data);
  };
  const router = useRouter();
  const { setToken, setUser } = useAuthStore();

  useEffect(() => {
    if (isSuccess) {
      console.log(detail);
      const { access_token, refresh_token, access_token_expires_in } = detail;

      // Calculate expiry times
      const accessExpireTime = new Date(Date.now() + access_token_expires_in);
      //user profile
      if (access_token) {

        client.getUserProfile(access_token).then((data) => console.log("URR", setUser(data)))
      }
      // Update auth store
      setToken(access_token, refresh_token, accessExpireTime);
      setTimeout(() => {
        router.navigate({ to: "/dashboard" });
      }, 2000)
    }
  }, [isSuccess]);

  if (isError) {
    toast.error(error?.message);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <Card className="w-full max-w-md border-none shadow-lg bg-white/90 backdrop-blur-sm">
        <CardHeader className="space-y-1 pb-6">
          <CardTitle className="text-2xl font-semibold tracking-tight text-center text-gray-900">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-center text-gray-500">
            Sign in to access your account
          </CardDescription>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <FormLogin onLogin={onSignin} loading={isPending} />
        </CardContent>
      </Card>
    </div>
  );
}
