
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"


const formScheme = z.object({
  name: z.string(),
  description: z.string(),
})


export default function CreatePlan() {


  const form = useForm<z.infer<typeof formScheme>>({
    resolver: zodResolver(formScheme),
    defaultValues: {
      name: "",
      description: ""
    }
  })

  const onSubmit = (Value: z.infer<typeof formScheme>) => {
    console.log("added", Value)
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
            <Button size={`lg`} className="bg-purple-500 hover:bg-purple-600 transition-all ease-in-out mt-2">Create plan</Button>
          </form>
        </Form>

      </div>

    </>)
}
