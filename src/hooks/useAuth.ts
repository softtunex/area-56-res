import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../api/apiClient";
import { message } from "antd";
import { User } from "./useUsers";

// ✅ Fetch Current User from LocalStorage
const fetchCurrentUser = async (): Promise<User | null> => {
  const userData = localStorage.getItem("user");
  return userData ? JSON.parse(userData) : null;
};

// ✅ React Query Hook for Auth
export const useAuth = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUser,
    staleTime: 1000 * 60 * 10,
    retry: false,
  });
};

// ✅ React Query Hook for Login
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation<
    { user: User; access_token: string; message: string }, // ✅ Returns user data
    Error,
    { email: string; password: string }
  >({
    mutationFn: async ({ email, password }) => {
      const response = await apiClient.post("/auth/login", { email, password });

      const { user, access_token } = response.data;
      localStorage.setItem("token", access_token);
      localStorage.setItem("user", JSON.stringify(user));
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["currentUser"], data.user);
      message.success(data?.message);

      window.location.href = "/dashboard";
    },
    onError: (error: any) => {
      message.error(
        error.response?.data?.message || "Login failed. Please try again."
      );
    },
  });
};

// ✅ React Query Hook for Logout
export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error>({
    mutationFn: async () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      window.location.href = "/login"; // ✅ Redirect to login
    },
  });
};
