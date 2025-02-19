import { useQuery } from "@tanstack/react-query";
import apiClient from "../api/apiClient";

interface CategoryChild {
  id: number;
  category_id: number;
  child_id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
  children: CategoryChild[];
}

export interface CategoriesResponse {
  food: Category[];
  drinks: Category[];
}

export const useCategories = () => {
  return useQuery<CategoriesResponse>({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await apiClient.get<{ data: CategoriesResponse }>(
        "/category/by/parent"
      );
      return response.data.data;
    },
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
  });
};
