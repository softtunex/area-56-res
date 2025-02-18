import { useQuery } from "@tanstack/react-query";
import apiClient from "../api/apiClient";

export interface User {
  id: number;
  user_type_id: number | null;
  location_id: number | null;
  name: string;
  email: string;
  phone: string;
  status: number;
  created_at: string;
  user_type?: {
    id: number;
    name: string;
    description?: string;
    icon?: string;
  };
  location?: {
    id: number;
    name: string;
    address?: string;
    code?: string;
  };
}

export const useUsers = (page: number, filters: Record<string, any> = {}) => {
  return useQuery({
    queryKey: ["users", page, filters],
    queryFn: async () => {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        ...Object.fromEntries(
          Object.entries(filters).filter(([_, v]) => v !== null && v !== "")
        ), // ✅ Exclude null/empty filters
      }).toString();

      const response = await apiClient.get<{
        data: User[];
        meta: { total: number; current_page: number; last_page: number };
      }>(`/user?${queryParams}`);

      return response.data; // ✅ Return users + pagination meta
    },
    staleTime: 1000 * 60 * 10, // ✅ Cache for 10 minutes
  });
};

// ✅ Fetch All User Types Hook (returns a map)
export const useUserTypes = () => {
  return useQuery({
    queryKey: ["userTypes"],
    queryFn: async () => {
      const response = await apiClient.get<{
        data: { id: number; name: string }[];
      }>("/usertype");
      return response.data.data.reduce((acc: Record<number, string>, type) => {
        acc[type.id] = type.name;
        return acc;
      }, {}); // ✅ Returns a map { 1: "Admin", 2: "Staff", ... }
    },
    staleTime: 1000 * 60 * 10, // ✅ Cache for 10 minutes
  });
};

// ✅ Fetch **Specific** User Type Hook
export const useUserType = (userTypeId?: number) => {
  return useQuery({
    queryKey: ["userType", userTypeId],
    queryFn: async () => {
      if (!userTypeId) return null;
      const response = await apiClient.get<{ data: { name: string } }>(
        `/usertype/${userTypeId}`
      );
      return response.data.data.name; // ✅ Extract only the name
    },
    enabled: !!userTypeId, // ✅ Fetch only if `userTypeId` exists
    staleTime: 1000 * 60 * 10,
  });
};
