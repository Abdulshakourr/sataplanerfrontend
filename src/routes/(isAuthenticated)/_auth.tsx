import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/(isAuthenticated)/_auth')({
  beforeLoad: () => {

    if (true) {
      // throw redirect({ to: "/sign-in" })
    }
  }
})

