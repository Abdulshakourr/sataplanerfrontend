import { Button } from '@/components/ui/button'
import { Card, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import { createFileRoute } from '@tanstack/react-router'
import axios from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod' // Make sure you have Zod installed

export const Route = createFileRoute('/private/')({
  component: RouteComponent,
  // Add search param validation
  validateSearch: z.object({
    plan_id: z.number().catch(0) // Coerces to number, defaults to 0 if invalid
  }),
})


const Base_URL = "http://localhost:8000"


const formSchema = z.object({
  password: z.string().min(8).regex(/[A-Z]/, { message: "password most contain at least one uppercase letter" }).regex(/[1-9]/, {
    message: "password most contain at least one number"
  }).regex(/[!@#$%^&*]/, { message: "password most contain at least one special character" })
})

function RouteComponent() {
  // Now TypeScript will know about plan_id
  const { plan_id } = Route.useSearch()
  console.log("p", plan_id)

  const router = useRouter()

  const { mutate, isPending, isSuccess, data } = useMutation({
    mutationFn: async (data: { plan_id: number, password: string }) => {
      console.log("m", data.plan_id, data.password)
      const response = await axios.post(`${Base_URL}/qrcode/verify-plan-access?plan_id=${data.plan_id}&password=${data.password}`)

      return response.data
    }
  })

  if (data) {
    console.log("DD", data)
  }

  if (isSuccess) {
    console.log("s", data.redirect_url)
    router.navigate({ to: `/${data.redirect_url}` })
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: ""
    }
  })


  const onSubmit = (Value: z.infer<typeof formSchema>) => {
    console.log("v", Value)
    const data = { ...Value, plan_id }
    console.log(data)
    mutate(data)
  }


  return (
    <>
      <div className='min-h-screen  bg-white'>

        <div className=' '>
          <div className='flex justify-center items-center h-screen bg-black/90'>
            <Card className='max-w-md w-full py-4 px-3 text-center '>
              <CardTitle className='my-3 text-2xl '>not Authenticated</CardTitle>
              <Form {...form}>
                <form className='space-y-3' onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                    name='password'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Enter your password</FormLabel>
                        <FormControl>
                          <div className='max-w-[200px] mx-auto '>
                            <Input className='rounded-md' placeholder='**********' type='password' {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button className='py-3' disabled={isPending}> {isPending ? "Authenticating..." : "Authenticate"} </Button>
                </form>
              </Form>
            </Card>

          </div>

        </div>

      </div>


    </>
  )

}
