import { create } from "zustand"
import { persist, PersistStorage, StorageValue } from "zustand/middleware"
import Cookies from "js-cookie"

interface User {
  id: number
  first_name: string
  last_name: string
  email: string
  username: string
  bio: string
  created_at: string
}


type authState = {
  access_token: string | null,
  refresh_token: string | null
  isAuthenticated: boolean
  expireTime: Date | null
  user: User | null
  setToken: (token: string, refresh: string, expires: Date) => void
  setUser: (userData: User) => void
  SignOut: () => void
  updateToken: (token: string) => void
}


const cookiesStorage: PersistStorage<authState> = {
  getItem: (key: string): StorageValue<authState> | null => {
    const value = Cookies.get(key);
    return value ? JSON.parse(value) : null;
  },
  setItem: (key: string, value: StorageValue<authState>) => {
    Cookies.set(key, JSON.stringify(value), { expires: 7 });
  },
  removeItem: (key: string) => {
    Cookies.remove(key);
  },
};

export const useAuthStore = create<authState>()(
  persist(

    (set) => ({
      access_token: null,
      refresh_token: null,
      isAuthenticated: false,
      expireTime: null,
      user: null,
      setToken: (token, refresh, expires) => {
        set({ access_token: token, refresh_token: refresh, isAuthenticated: true, expireTime: expires })
      },
      setUser: (userData) => {
        set({ user: userData })
      },
      SignOut: () => {
        Cookies.remove("auth");
        set({ access_token: null, refresh_token: null, isAuthenticated: false, expireTime: null, user: null })
      },
      updateToken: (token) => {
        set({ access_token: token })
      }
    })

    ,
    {
      name: "auth",
      storage: cookiesStorage
    }
  )
)
