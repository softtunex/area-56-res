import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../api/apiClient";
import { message } from "antd";

interface RolePermissionPayload {
  role_id: number;
  permission_id: number;
  status: boolean;
}

// ✅ Hook to toggle role permission
export const useToggleRolePermission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: RolePermissionPayload) => {
      const response = await apiClient.post("/rolepermission/create", payload);
      return response.data;
    },
    onSuccess: () => {
      message.success("Permission updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["permissions"] });
    },
    onError: () => {
      message.error("Failed to update permission.");
    },
  });
};
