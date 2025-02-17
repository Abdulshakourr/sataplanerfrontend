import { useAuthStore } from "@/store/auth"
import axios from "axios"

const BASE_URL = import.meta.env.VITE_BASE_URL

const { access_token, refresh_token, setToken } = useAuthStore.getState()



export const userDataInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Accept": "application/json",
    "Authorization": `Bearer ${access_token}`
  }
})


userDataInstance.interceptors.request.use(async (config) => {

  const respon = await fetch(`${BASE_URL}/auth/refresh?refresh_token=${refresh_token}`, { method: "POST" })
  if (!respon.ok) {
    const rep = await respon.json()
    console.log("REF_ERRor", rep)
    // throw new (respon.statusText)
  }
  const data = await respon.json()
  console.log("DATA_REF", data)
  setToken(data.access_token, data.refresh_token)
  console.log("INterced....")

  return config
})


// userDataInstance.interceptors.response.use((response) => {
//   console.log("RESPONSEEEJkl", response)
// })
