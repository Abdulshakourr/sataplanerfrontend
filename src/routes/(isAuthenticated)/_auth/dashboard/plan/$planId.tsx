import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/(isAuthenticated)/_auth/dashboard/plan/$planId',
)({
  component: RouteComponent,
})

function RouteComponent() {

  const params = Route.useParams()
  console.log("Par", params)

  return <div>Hello "/(isAuthenticated)/_auth/dashboard/plan/$planId"!</div>
}
