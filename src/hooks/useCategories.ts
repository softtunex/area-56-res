import { useQuery } from "@tanstack/react-query";
import apiClient from "../api/apiClient";

interface Category {
  id: number;
  name: string;
}

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await apiClient.get<{ data: Category[] }>("/category");
      return response.data.data;
    },
    staleTime: 1000 * 60 * 60, // ✅ Cache for 1 hour
  });
};
