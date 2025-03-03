import UserProfile from '@/components/userComponent'
import { useAuthStore } from '@/store/auth'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(isAuthenticated)/_auth/profile/')({
  component: RouteComponent,
})


function RouteComponent() {
  const { user } = useAuthStore()



  console.log("u", user)
  return (
    <>

      <div className='min-h-screen py-12 px-6 sm:px-8 lg:px-12 rounded-md' >
        {
          user && <UserProfile user={user} />

        }
      </div>

    </>
  )

}
