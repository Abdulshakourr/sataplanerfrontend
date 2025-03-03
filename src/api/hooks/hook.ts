
import { useMutation, useQuery } from "@tanstack/react-query";
import { client } from "../client/client";
import { useAuthStore } from "@/store/auth";




type userDat = {
  username: string,
  email: string,
  password: string
}

type userData = {
  email: string,
  password: string
}
type goal = {
  name: string,
  description: string
}

const { isAuthenticated } = useAuthStore.getState()


// user hooks
export const useCreateUser = () => useMutation({
  mutationFn: (userData: userDat) => client.createUser(userData)
})

export const useLogin = () => useMutation({
  mutationFn: (userInfo: userData) => client.userLogin(userInfo)
})

export const useGetuser = (token: string) => useQuery({
  queryKey: ["user"],
  queryFn: () => client.getUserProfile(token),
  enabled: isAuthenticated
})


//end
//

//getting and creating userData hooks

export const useUserGoals = () => useQuery({
  queryKey: ["plans"],
  queryFn: client.getGoals,
  select: (data) => data.reverse()
})


export const useCreategoal = (onSuccess: () => void) => useMutation({
  mutationFn: (goal: goal) => client.createGoal(goal),
  onSuccess
})

export const usegoalDelete = () => useMutation({
  mutationFn: (id: string) => client.deleteGoal(id)
})

export const usegetGoal = (id: string) => useQuery({
  queryKey: ["goals", id],
  queryFn: () => client.getGoal(id)
})




// motivation

export const usegetMotivation = (id: string) => useQuery({
  queryKey: ["goals", "motivation"],
  queryFn: () => client.getMotivations(id)
})


export const usecreateMotivation = (id: string) => useMutation({
  mutationFn: (data: { link: string | undefined, quote: string | undefined }) => client.createMotivation(data, id)
})


//
