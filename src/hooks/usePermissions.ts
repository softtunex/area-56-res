import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import apiClient from "../api/apiClient";

// ✅ Permission Type
export interface Permission {
  id: number;
  name: string;
  description: string;
  status?: boolean; // Added to track role-specific assignment
}

export interface Role {
  id: number;
  name: string;
  description: string;
}

interface RolePermissionPayload {
  role_id: number;
  permission_id: number;
  status: boolean;
}

// ✅ Fetch All Permissions (Global List)
export const usePermissions = () => {
  return useQuery<Permission[]>({
    queryKey: ["permissions"],
    queryFn: async () => {
      const response = await apiClient.get<{ data: Permission[] }>(
        "/permission"
      );
      return response.data.data;
    },
    staleTime: 1000 * 60 * 10, // Cache for 10 minutes
  });
};

// ✅ Toggle Role Permissions
export const useToggleRolePermission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: RolePermissionPayload) => {
      await apiClient.post("/rolepermission/create", payload);
    },
    onSuccess: (_, variables) => {
      message.success("Permission updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["permissions"] }); // Refresh permissions
    },
    onError: () => {
      message.error("Failed to update permission.");
    },
  });
};
