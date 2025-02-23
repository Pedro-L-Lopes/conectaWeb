import { apiRequest } from "../../../lib/config";

export const getAvailableProperties = async (
  filters: Record<string, string>
) => {
  const queryParams = new URLSearchParams(filters).toString();

  return await apiRequest(`Property/available?${queryParams}`);
};
