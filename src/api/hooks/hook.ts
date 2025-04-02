import { useMutation, useQuery } from "@tanstack/react-query";
import { client } from "../client/client";
/* import { useAuthStore } from "@/store/auth" */ type userDat = {
  username: string;
  email: string;
  password: string;
};

type userData = {
  email: string;
  password: string;
};
export type goal = {
  name: string;
  description: string;
  status: string;
  due_date: Date;
  cover_image: File | null;
};

/* const { isAuthenticated } = useAuthStore.getState() */

// user hooks
export const useCreateUser = () =>
  useMutation({
    mutationFn: (userData: userDat) => client.createUser(userData),
  });

export const useLogin = () =>
  useMutation({
    mutationFn: (userInfo: userData) => client.userLogin(userInfo),
  });

//end
//

//getting and creating userData hooks

// Update your hook definition
export const useUserGoals = ({
  offset,
  limit,
  search,
}: {
  offset: number;
  limit: number;
  search?: string;
}) =>
  useQuery({
    queryKey: ["goals", { offset, limit, search }],
    queryFn: () => client.getGoals(offset, limit),
    select: (data) => ({
      // Filter active goals from the server response
      goals: data,
      // Keep original total count for pagination reference
      total: data.length,
    }),
  });
// export const useUserGoals = (offset, limit) =>
//   useQuery({
//     queryKey: ["goals"],
//     queryFn: () => client.getGoals(offset, limit),
//     // select: (data) => data.reverse(),
//   });
//
export const useCreategoal = (onSuccess: () => void) =>
  useMutation({
    mutationFn: (formData: FormData) => client.createGoal(formData),
    onSuccess,
  });

export const useGoalDelete = () =>
  useMutation({
    mutationFn: (id: string) => client.deleteGoal(id),
  });

export const useGetGoal = (id: string) =>
  useQuery({
    queryKey: ["goals", id],
    queryFn: () => client.getGoal(id),
  });

// motivation

export const useGetMotivation = (id: string) =>
  useQuery({
    queryKey: ["goals", "motivation"],
    queryFn: () => client.getMotivations(id),
  });

export const useCreateMotivation = (id: string) =>
  useMutation({
    mutationFn: (data: {
      link: string | undefined;
      quote: string | undefined;
    }) => client.createMotivation(data, id),
  });

//
