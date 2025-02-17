import { useAuthStore } from '@/store/auth'
import { createFileRoute, Outlet, redirect, useRouter } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/(isAuthenticated)/_auth')({
  beforeLoad: () => {
    const { isAuthenticated } = useAuthStore.getState()
    if (!isAuthenticated) {
      throw redirect({
        to: "/sign-in"
      })
    }
  },
  component: Auth
})


function Auth() {

  const { isAuthenticated } = useAuthStore()
  const router = useRouter()
  useEffect(() => {
    if (!isAuthenticated) {
      router.navigate(({ to: "/sign-in" }))
    }
  }, [isAuthenticated])

  return (
    <>
      <Outlet />
    </>
  )
}

