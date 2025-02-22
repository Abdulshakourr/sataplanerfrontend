import { Link } from "@tanstack/react-router"
import { useplanDelete } from "@/api/hooks/hook"
import toast from "react-hot-toast"
import { useQueryClient } from "@tanstack/react-query"
import { Trash } from "lucide-react"
import { Card, CardContent, CardTitle } from "./ui/card"

type planView = {
  id: string,
  name: string,
  description: string
}


export default function Planview({ plan }: { plan: planView }) {

  const { mutate, isSuccess, isError, error, data } = useplanDelete()
  const { id, name, description } = plan
  const queryClient = useQueryClient()

  const onDelete = () => {
    console.log("ID:", id)
    mutate(id)
  }

  if (isError) {
    console.log("onDelet", error)
    toast.error(error.message)
  }
  if (isSuccess) {
    queryClient.invalidateQueries({ queryKey: ["plans"] })
  }
  if (data) {
    console.log("su", data)
  }

  return (
    <>
      <Card className="">
        <div className="flex gap-8 py-4 px-6 items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold mb-2  hover:underline hover:cursor-pointer" >
              <Link to="/dashboard/plan/$planId" params={{ planId: id }}>
                {name}
              </Link></h1>
            <p className="font-medium text-sm"> {description} </p>
          </div>
          <div>
            <Trash className="text-red-300 w-8 h-8" onClick={onDelete} />
          </div>
        </div>
      </Card>

    </>
  )
}
