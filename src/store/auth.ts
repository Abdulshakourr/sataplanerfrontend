
import { create } from "zustand"
import { persist, PersistStorage, StorageValue } from "zustand/middleware"
import Cookies from "js-cookie"
type authState = {
  access_token: string | null,
  refresh_token: string | null
  isAuthenticated: boolean
  expireTime: Date | null
  setToken: (token: string, refresh: string, expires: Date) => void
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
      setToken: (token, refresh, expires) => {
        set({ access_token: token, refresh_token: refresh, isAuthenticated: true, expireTime: expires })
      },
      SignOut: () => {
        set({ access_token: null, refresh_token: null, isAuthenticated: false, expireTime: null })
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
