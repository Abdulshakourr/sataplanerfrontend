
import { Card } from '@/components/ui/card'
import { Trash2 } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { useQueryClient } from '@tanstack/react-query'
import { usegoalDelete } from '@/api/hooks/hook'
import toast from 'react-hot-toast'
import { formatDistanceToNow } from "date-fns";


type goalView = {
  id: string
  name: string
  description: string
  created_at: string
}

export default function Goalview({ goal }: { goal: goalView }) {
  const { mutate, isSuccess, isError, error } = usegoalDelete()
  const { id, name, created_at, description } = goal
  const queryClient = useQueryClient()
  const onDelete = () => {
    console.log("ID:", id)
    mutate(id)
  }


  if (isError) {
    console.log("onDelete", error)
    toast.error(error.message)
  }
  if (isSuccess) {
    queryClient.invalidateQueries({ queryKey: ["goals"] })
  }
  console.log("t", created_at)
  return (
    <Card className="bg-white p-6 flex justify-between items-center gap-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100 rounded-lg">
      <div className="space-y-1">
        <h1 className="text-xl font-semibold text-gray-900 hover:text-purple-600 transition-colors">
          <Link to="/dashboard/goal/$goalId" params={{ goalId: id }}>
            {name}
          </Link>
        </h1>
        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
        <p className='text-sm pt-3 italic text-gray-400'>  {formatDistanceToNow(new Date(created_at), { addSuffix: true })}</p>
      </div>
      <button
        onClick={onDelete}
        className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
        aria-label={`Delete plan ${name}`}
      >
        <Trash2 className="h-5 w-5" />
      </button>
    </Card>
  )
}
