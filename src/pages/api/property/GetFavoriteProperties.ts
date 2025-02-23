import { apiRequest } from "../../../lib/config";

export const getFavoriteProperties = async (
  filters: Record<string, string>,
  propertiesIds: string[]
) => {
  const queryParams = new URLSearchParams(filters).toString();

  return await apiRequest(
    `Property/favorites?${queryParams}`,
    "POST",
    propertiesIds
  );
};
