import { userDataInstance } from "./axiosInstance";




const BaseUrl = import.meta.env.VITE_BASE_URL


type usercreate = {
  username: string,
  email: string,
  password: string
}


type plan = {
  name: string,
  description: string
}


console.log(BaseUrl)
export const client = {
  async getExample() {
    const name = "abdulshakour";
    return name;
  },

  //User Authentication

  async createUser(userData: usercreate) {

    console.log("fetch::", userData)

    const response = await fetch(`${BaseUrl}/auth/signup`, {

      method: "POST",
      headers: {
        "accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    })
    if (!response.ok) {
      const resp = await response.json()
      console.log("DEEER", resp)
      console.log("DER", resp.detail[0]?.msg)
      throw new Error(resp?.detail?.[0].msg || resp.detail)
    }

    const data = response.json()
    return data
  },

  async userLogin(userInfo: { email: string, password: string }) {
    const response = await fetch(`${BaseUrl}/auth/token`, {
      method: "POST",
      headers: {
        "accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `grant_type=password&username=${userInfo.email}&password=${userInfo.password}&scope=&client_id=string&client_secret=string`
    })
    if (!response.ok) {
      const resp = await response.json()
      console.log("Logo", resp)
      throw new Error(resp.detail)
    }

    const data = await response.json()

    return data
  },

  //end of user

  // CreatePlan

  async getPlans() {
    try {
      const response = await userDataInstance.get("/plans/allplans")
      return response.data
    } catch (error) {
      if (error) {
        console.log("PL", error)
        throw new Error(error.response.data.detail)
      }
    }
  },

  async createPlan(plan: plan) {
    try {
      const response = await userDataInstance.post("/plans/add", plan)
      console.log("YYYY", response)
      return response.data
    } catch (error) {
      console.log("EEEEEEE", error)
      throw new Error(error.response.data.detail)
    }
  },

  async deletePlan(planId: string) {
    try {
      const response = await userDataInstance.delete(`/plans/delete/${planId}`)
      return response.data
    } catch (error) {
      if (error.response.data) {
        throw new Error(error.response.data.detail)
      }

    }
  },

  async getPlan(id: string) {
    console.log("getPlan", id)
    try {
      const response = await userDataInstance.get(`/plans/plan/${id}`)
      return response.data
    } catch (error) {
      if (error.response.data) {
        console.log("EE", error)
        throw new Error(error.response.data)
      }

    }
  },

  //motivations

  async createMotivation(data, id) {
    try {
      console.log("Client", data, id)
      const response = userDataInstance.post(`/motivations/${id}`, data)
      return (await response).data
    } catch (error) {
      console.log("ClE", error)
      throw new Error(error)

    }
  },


  async getMotivations(planId: string) {
    try {
      const response = userDataInstance.get(`/motivations/plan/${planId}`)
      console.log("cli", await response)
      return (await response).data.data
    } catch (error) {

      throw new Error(error)

    }
  },

  async deleteMotivation(id: string) {
    try {
      const response = userDataInstance.delete(`motivations/${id}`)
      return (await response).data
    } catch (error) {
      throw new Error(error)
    }
  }



};
