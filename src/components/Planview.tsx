



type planView = {
  id: number,
  name: string,
  description: string
}


export default function Planview({ plan }: { plan: planView }) {

  const { id, name, description } = plan

  return (
    <>
      <div className="max-w-md py-4 px-4 bg-white my-12 rounded-md">
        <h1 className="text-xl font-medium mb-2 text-purple-600 hover:underline hover:cursor-pointer" >{name} </h1>
        <p className="text-sm text-gray-500 font-medium"> {description} </p>
      </div>

    </>
  )
}
