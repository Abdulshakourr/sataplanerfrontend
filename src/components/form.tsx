
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Link } from "@tanstack/react-router"
const formSchema = z.object({
  username: z.string().min(2, { message: "your username most be at least 2 character" }).max(20, { message: "username most not be longer than 20 character" }),
  email: z.string().email("invalid email address"),
  password: z.string().min(8).regex(/[A-Z]/, { message: "password most contain at least one uppercase letter" }).regex(/[1-9]/, {
    message: "password most contain at least one number"
  }).regex(/[!@#$%^&*]/, { message: "password most contain at least one special character" })
})



export default function FormRegister({ onCreate, loading }: { loading: boolean, onCreate: (data: z.infer<typeof formSchema>) => void }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: ""
    }
  })

  const onSubmit = (Value: z.infer<typeof formSchema>) => {
    // console.log("Hello", Value)
    onCreate(Value)

  }


  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (

              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="******" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={loading} size={"lg"} className={`w-full bg-purple-500 hover:bg-purple-600 transition-all ease-in-out`}> {loading ? "Creating..." : "Sign Up"} </Button>
        </form>

        <div className="my-4">
          <p className="text-gray-400 font-medium"> you already have a account?<span className="text-blue-600 underline italic pl-2"><Link to="/sign-in">Sign in</Link> </span></p>
        </div>

      </Form>
    </>
  )
}
