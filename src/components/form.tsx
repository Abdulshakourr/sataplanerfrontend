import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Link } from "@tanstack/react-router";
const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: "your username most be at least 2 character" })
    .max(20, { message: "username most not be longer than 20 character" }),
  email: z.string().email("invalid email address"),
  password: z
    .string()
    .min(8)
    .regex(/[A-Z]/, {
      message: "password most contain at least one uppercase letter",
    })
    .regex(/[1-9]/, {
      message: "password most contain at least one number",
    })
    .regex(/[!@#$%^&*]/, {
      message: "password most contain at least one special character",
    }),
});

export default function FormRegister({
  onCreate,
  loading,
}: {
  loading: boolean;
  onCreate: (data: z.infer<typeof formSchema>) => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (Value: z.infer<typeof formSchema>) => {
    onCreate(Value);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700 font-medium">
                Username
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="johndoe"
                  {...field}
                  className="h-11 rounded-md border-gray-300 focus:ring-goal-500 focus:border-goal-500"
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700 font-medium">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="your@email.com"
                  {...field}
                  className="h-11 rounded-md border-gray-300 focus:ring-goal-500 focus:border-goal-500"
                  type="email"
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700 font-medium">
                Password
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="••••••••"
                  type="password"
                  {...field}
                  className="h-11 rounded-md border-gray-300 focus:ring-goal-500 focus:border-goal-500"
                />
              </FormControl>
              <div className="mt-1">
                <p className="text-xs text-gray-500">
                  Password must contain at least 8 characters, including an
                  uppercase letter, a number, and a special character.
                </p>
              </div>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <Button
          disabled={loading}
          size={"lg"}
          className="w-full h-12 bg-goal-500 hover:bg-goal-600 transition-all ease-in-out rounded-md font-semibold mt-3"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Creating account...
            </span>
          ) : (
            "Create Account"
          )}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/sign-in"
            className="font-medium text-goal-600 hover:text-goal-500"
          >
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              By signing up, you agree to our
            </span>
          </div>
        </div>
        <div className="mt-1 text-center text-xs"></div>
      </div>
    </Form>
  );
}
