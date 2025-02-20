
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
  queryFn: client.getPlan
})


export const useCreateplan = (onSuccess) => useMutation({
  mutationFn: (plan: plan) => client.createPlan(plan),
  onSuccess
})
