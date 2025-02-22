import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/private/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/private/indext"!</div>
}
