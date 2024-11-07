import { apiClient } from "@/lib/api-client";
import { LOGOUT_ROUTE } from "@/utils/constants";

export const logOut = async () => {
    const response = await apiClient.post(LOGOUT_ROUTE, {}, { withCredentials: true });
    return response;
}
