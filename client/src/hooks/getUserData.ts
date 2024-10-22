import { apiClient } from "@/lib/api-client"
import { GET_USER_INFO } from "@/utils/constants"

export const getUserData = async () => {
    const response = await apiClient.get(GET_USER_INFO, {
        withCredentials: true
    })
    return response.data;
}

