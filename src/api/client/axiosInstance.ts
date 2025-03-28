import expireDate from "@/lib/expireDate";
import { useAuthStore } from "@/store/auth";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const userDataInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
  },
});

userDataInstance.interceptors.request.use(async (config) => {
  const { access_token, refresh_token, expireTime, setToken } =
    useAuthStore.getState();

  const currentTime = new Date();
  console.log("Current time:", currentTime);
  console.log("Token expires at:", expireTime,);
if(expireTime){
  
  console.log("Token expires at local:", new Date(expireTime));
}


  console.log("Is token expired?", expireTime && new Date(expireTime) <= currentTime);

  // Check if token is expired
  if (expireTime && new Date(expireTime) <= currentTime) {
    console.log("Token expired. Attempting to refresh...");

    if (!refresh_token) {
      console.error("No refresh token available");
      useAuthStore.getState().SignOut();
      return Promise.reject(new Error("No refresh token available"));
    }

    try {
      // Send refresh request
      const response = await axios.post(
        `${BASE_URL}/auth/refresh?refresh_token=${refresh_token}`,
      );

      console.log("Refresh response:", response.data);

      // Get new token and expiry time
      const { access_token: newToken, access_token_expires_in } = response.data;
      
      if (!newToken || !access_token_expires_in) {
        useAuthStore.getState().SignOut()
        throw new Error("Invalid refresh response: missing token or expiry time");
      }

      const newExpireTime = expireDate(access_token_expires_in);
      console.log("New token expires at:", newExpireTime);

      // Update auth store with new token
      setToken(newToken, refresh_token, newExpireTime);

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
