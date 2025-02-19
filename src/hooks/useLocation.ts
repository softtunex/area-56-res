import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../api/apiClient";
import { message } from "antd";

// ✅ Location API Response Type
interface Location {
  id: number;
  name: string;
  address: string;
  code: string;
}

// ✅ Fetch All Locations (For Super Admin)
export const useLocations = () => {
  return useQuery({
    queryKey: ["locations"],
    queryFn: async () => {
      const response = await apiClient.get<{
        status: boolean;
        data: Location[];
      }>("/location");
      return response.data.data; // ✅ Extract location data
    },
    staleTime: 1000 * 60 * 60, // ✅ Cache for 1 hour
    refetchOnWindowFocus: false,
  });
};

// ✅ Fetch Single User Location
export const useUserLocation = (locationId?: number) => {
  return useQuery({
    queryKey: ["userLocation", locationId],
    queryFn: async () => {
      if (!locationId) return null;
      const response = await apiClient.get<{ status: boolean; data: Location }>(
        `/location/${locationId}`
      );
      return response.data.data.name; // ✅ Extract location name
    },
    enabled: !!locationId, // ✅ Only run if locationId exists
  });
};

// ✅ Mutation Hook for Updating User Location
export const useUpdateLocation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (locationId: number) => {
      await apiClient.put(`/location/${locationId}`, { id: locationId }); // ✅ Send PUT request
    },
    onSuccess: () => {
      message.success("Location updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["currentUser"] }); // ✅ Refresh user data
      queryClient.invalidateQueries({ queryKey: ["userLocation"] }); // ✅ Refresh location data
    },
    onError: () => {
      message.error("Failed to update location");
    },
  });
};
