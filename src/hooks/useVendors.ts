import { useQuery } from "@tanstack/react-query";
import apiClient from "../api/apiClient";

interface Vendor {
  id: number;
  name: string;
}

export const useVendors = () => {
  return useQuery({
    queryKey: ["vendors"],
    queryFn: async () => {
      const response = await apiClient.get<{ data: Vendor[] }>("/vendor");
      return response.data.data;
    },
    staleTime: 1000 * 60 * 60, // ✅ Cache for 1 hour
  });
};
