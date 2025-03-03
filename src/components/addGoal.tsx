

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useCreategoal } from "@/api/hooks/hook"
import { useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { DialogClose } from "@/components/ui/dialog"
import { useEffect } from "react"

const formScheme = z.object({
  name: z.string().min(2, { message: "Plan name should be at least 2 characters" }),
  description: z.string().min(5, { message: "Plan description should be at least 5 characters" }),
})

export default function CreatePlan() {
  const queryClient = useQueryClient()

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["plans"] })
  }

  const { mutate, isPending, isSuccess, isError, error, data } = useCreategoal(onSuccess)

  const form = useForm<z.infer<typeof formScheme>>({
    resolver: zodResolver(formScheme),
    defaultValues: {
      name: "",
      description: ""
    }
  })

  const onSubmit = (value: z.infer<typeof formScheme>) => {
    mutate(value) // Uncommented to send data to the API
  }

  if (isError) {
    console.log("add,", error.message)
    toast.error(error.message)
  }

  useEffect(() => {
    if (data) {
      console.log("dddddddd", data)
      toast.success(data.message)
    }
  }, [isSuccess])


  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">Goal Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter plan name"
                    type="text"
                    {...field}
                    className="h-12 bg-gray-50 border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 rounded-lg transition-all"
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe your plan"
                    {...field}
                    className="min-h-[100px] bg-gray-50 border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 rounded-lg transition-all"
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-3">
            <DialogClose asChild>
              <Button
                variant="outline"
                className="h-11 px-6 border-gray-200 text-gray-700 hover:bg-gray-100 rounded-lg transition-all"
              >
                Cancel
              </Button>
            </DialogClose>
            {/* <DialogClose asChild> */}
            <Button
              disabled={isPending}
              size="lg"
              className="h-11 px-6 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              {isPending ? (
                <span className="flex items-center">
                  <svg className="animate-spin mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating...
                </span>
              ) : (
                "Create Plan"
              )}
            </Button>
            {/* </DialogClose> */}
          </div>
        </form>
      </Form>
    </div>
  )
}
