
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import { useCreateplan } from "@/api/hooks/hook"
import { useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"


const formScheme = z.object({
  name: z.string().min(2, { message: "plan name should be greater then 2 characters" }),
  description: z.string().min(5, { message: "plan name should be greater then 5 characters" }),
})


export default function CreatePlan() {
  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["plans"] })
  }

  const { mutate, isPending, isError, error, data } = useCreateplan(onSuccess)

  const queryClient = useQueryClient()

  const form = useForm<z.infer<typeof formScheme>>({
    resolver: zodResolver(formScheme),
    defaultValues: {
      name: "",
      description: ""
    }
  })

  const onSubmit = (Value: z.infer<typeof formScheme>) => {
    console.log("added", Value)
    mutate(Value)
  }


  if (isError) {
    console.log("add,", error.message)
  }

  if (data) {
    console.log("dddddddd", data)
    toast.success(data.message)
  }




  return (
    <>

      <div className=" ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-medium">Plan name</FormLabel>
                  <FormControl>
                    <Input placeholder="plan name" type="text"  {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Plan description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="description of your plan" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isPending} size={`lg`} className="bg-purple-500 hover:bg-purple-600 transition-all ease-in-out mt-2">
              {
                isPending ? "Creating..." : "reate plan"
              }
            </Button>
          </form>
        </Form>

      </div>

    </>)
}
