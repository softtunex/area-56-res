import apiClient from "../api/apiClient";

// ✅ Fetch User Type by ID
export const getUserType = async (userTypeId: number | null) => {
  if (!userTypeId) return "Unknown";

  try {
    const response = await apiClient.get<{ data: { name: string } }>(
      `/usertype/${userTypeId}`
    );
    return response.data.data.name;
  } catch (error) {
    console.error("Failed to fetch user type:", error);
    return "Unknown";
  }
};

// ✅ Fetch Location by ID
export const getUserLocation = async (locationId: number | null) => {
  if (!locationId) return "Unknown";

  try {
    const response = await apiClient.get<{ data: { name: string } }>(
      `/location/${locationId}`
    );
    return response.data.data.name;
  } catch (error) {
    console.error("Failed to fetch location:", error);
    return "Unknown";
  }
};
