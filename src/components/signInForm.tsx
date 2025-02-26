
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Link } from "@tanstack/react-router"

const formSchema = z.object({
  // username: z.string().min(2, { message: "your username most be at least 2 character" }).max(20, { message: "username most not be longer than 20 character" }),
  email: z.string().email("invalid email address"),
  password: z.string().min(8).regex(/[A-Z]/, { message: "password most contain at least one uppercase letter" }).regex(/[1-9]/, {
    message: "password most contain at least one number"
  }).regex(/[!@#$%^&*]/, { message: "password most contain at least one special character" })
})


export default function FormLogin({ onLogin, loading }: { loading: boolean, onLogin: (data: z.infer<typeof formSchema>) => void }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const onSubmit = (Value: z.infer<typeof formSchema>) => {
    onLogin(Value)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
                  className="h-11 rounded-md border-gray-300 focus:ring-purple-500 focus:border-purple-500"
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
              <div className="flex justify-between items-center">
                <FormLabel className="text-gray-700 font-medium">Password</FormLabel>
                {/* <Link to="/forgot-password" className="text-xs text-purple-600 hover:text-purple-800"> */}
                {/*   Forgot password? */}
                {/* </Link> */}
              </div>
              <FormControl>
                <Input
                  placeholder="••••••••"
                  type="password"
                  {...field}
                  className="h-11 rounded-md border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <Button
          disabled={loading}
          size={"lg"}
          className="w-full h-12 bg-purple-500 hover:bg-purple-600 transition-all ease-in-out rounded-md font-semibold mt-3"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing in...
            </span>
          ) : (
            "Sign In"
          )}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/sign-up" className="font-medium text-purple-600 hover:text-purple-500">
            Sign up
          </Link>
        </p>
      </div>
    </Form>
  )
}
