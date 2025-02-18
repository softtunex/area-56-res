import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "./apiClient";

// Define User type
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  user_type_id: number; // ✅ Ensure `user_type_id` is a number
}

// Define LoginResponse type
interface LoginResponse {
  status: boolean;
  message: string;
  access_token: string;
  token_type: string;
  user: User;
}

// ✅ Correctly typed login function
const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>("/auth/login", {
    email,
    password,
  });

  return {
    ...response.data,
    user: {
      ...response.data.user,
      user_type_id: response.data.user.user_type_id
        ? Number(response.data.user.user_type_id)
        : 1, // ✅ Default to Super Admin (1)
    },
  };
};

// ✅ Corrected `useMutation` usage
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation<LoginResponse, Error, { email: string; password: string }>(
    {
      mutationFn: loginUser, // ✅ Correct function reference
      onSuccess: (data: LoginResponse) => {
        // ✅ Explicitly type `data`
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("user", JSON.stringify(data.user));
        queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      },
    }
  );
};
