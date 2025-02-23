import { apiRequest } from "../../../lib/config";

export const getPropertyByID = async (id: string) => {
  return await apiRequest(`Property/${id}`);
};
