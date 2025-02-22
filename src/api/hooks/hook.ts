
import { useMutation, useQuery } from "@tanstack/react-query";
import { client } from "../client/client";




type userDat = {
  username: string,
  email: string,
  password: string
}

type userData = {
  email: string,
  password: string
}
type plan = {
  name: string,
  description: string
}

// user hooks
export const useCreateUser = () => useMutation({
  mutationFn: (userData: userDat) => client.createUser(userData)
})

export const useLogin = () => useMutation({
  mutationFn: (userInfo: userData) => client.userLogin(userInfo)
})
//end
//

//getting and creating userData hooks

export const useUserPlans = () => useQuery({
  queryKey: ["plans"],
  queryFn: client.getPlans
})


export const useCreateplan = (onSuccess) => useMutation({
  mutationFn: (plan: plan) => client.createPlan(plan),
  onSuccess
})

export const useplanDelete = () => useMutation({
  mutationFn: (id: string) => client.deletePlan(id)
})

export const usegetPlan = (id) => useQuery({
  queryKey: ["plans", id],
  queryFn: () => client.getPlan(id)
})




// motivation

export const usegetMotivation = (id: string) => useQuery({
  queryKey: ["plans", "motivation"],
  queryFn: () => client.getMotivations(id)
})


export const usecreateMotivation = (id: string) => useMutation({
  mutationFn: (data: { link: string | undefined, quote: string | undefined }) => client.createMotivation(data, id)
})
