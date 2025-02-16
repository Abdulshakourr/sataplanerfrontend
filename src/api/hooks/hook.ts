
import { useMutation } from "@tanstack/react-query";
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


// user hooks
export const useCreateUser = () => useMutation({
  mutationFn: (userData: userDat) => client.createUser(userData)
})

export const useLogin = () => useMutation({
  mutationFn: (userInfo: userData) => client.userLogin(userInfo)
})


//end
