import { apiClient } from "@/lib/api-client"
import { GET_USER_CHANNELS_ROUTE } from "@/utils/constants"

export const userChannels = async () => {
    const response = await apiClient.get(`${GET_USER_CHANNELS_ROUTE}`, {
        withCredentials: true
    });
    return response.data;
}