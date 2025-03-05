import expireDate from "@/lib/expireDate"
import { useAuthStore } from "@/store/auth"
import axios from "axios"

const BASE_URL = import.meta.env.VITE_BASE_URL




export const userDataInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Accept": "application/json",
  }
})


userDataInstance.interceptors.request.use(async (config) => {
  const { access_token, refresh_token, expireTime, setToken } = useAuthStore.getState();

  const currentTime = new Date();
  console.log("isj", expireTime && new Date(expireTime) >= currentTime)
  console.log("isj", expireTime && new Date(expireTime) <= currentTime)

  const isExpire = expireTime && new Date(expireTime) >= currentTime

  if (false) {
    console.log("Hi....")
  }


  // Check if token is expired
  if (!isExpire) {
    console.log("Token expired. Refreshing...");

    try {
      // Send refresh request
      const response = await axios.post(`${BASE_URL}/auth/refresh?refresh_token=${refresh_token}`);

      console.log("ref", response.data)


      // access_token_expires_in
      // Get new token and expiry time
      const { access_token: newToken, access_token_expires_in } = response.data;
      const newExpireTime = expireDate(access_token_expires_in); // Set new expiry time

      // Update auth store with new token
      setToken(newToken, String(refresh_token), newExpireTime);

      console.log("Token refreshed successfully!");

      // Use new token in request
      config.headers.Authorization = `Bearer ${newToken}`;
    } catch (error) {
      console.error("Failed to refresh token:", error);

      // If refresh fails, log out the user
      useAuthStore.getState().SignOut();
      return Promise.reject(error);
    }
  } else {
    // Token is valid, proceed with request
    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }
  }

  return config;
});

