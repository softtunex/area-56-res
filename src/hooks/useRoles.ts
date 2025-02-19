import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import apiClient from "../api/apiClient";

// ✅ Role Type
export interface Role {
  id: number;
  name: string;
  description: string;
}

// ✅ Fetch Roles Hook
export const useRoles = () => {
  return useQuery<Role[], Error>({
    queryKey: ["roles"],
    queryFn: async () => {
      const response = await apiClient.get<{ status: boolean; data: Role[] }>(
        "/role"
      );
      return response.data.data; // ✅ Extract role list
    },
    staleTime: 1000 * 60 * 10, // ✅ Cache for 10 minutes
  });
};

// ✅ Create Role Hook
export const useCreateRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newRole: { name: string; description: string }) => {
      await apiClient.post("/role/create", newRole);
    },
    onSuccess: () => {
      message.success("Role created successfully!");
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
    onError: () => {
      message.error("Failed to create role. Please try again.");
    },
  });
};

// ✅ Update Role Hook (PUT /role/:id)
export const useUpdateRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      roleId,
      updatedRole,
    }: {
      roleId: number;
      updatedRole: { name: string; description: string };
    }) => {
      await apiClient.put(`/role/${roleId}`, updatedRole);
    },
    onSuccess: () => {
      message.success("Role updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
    onError: () => {
      message.error("Failed to update role. Please try again.");
    },
  });
};

export const useDeleteRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (roleId: number) => {
      await apiClient.delete(`/role/${roleId}`);
    },
    onSuccess: () => {
      message.success("Role deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["roles"] }); // ✅ Refresh roles list
    },
    onError: () => {
      message.error("Failed to delete role. Please try again.");
    },
  });
};
