import { apiClient } from "@/lib/api-client"
import { REMOVE_PROFILE_IMAGE_ROUTE } from "@/utils/constants"

export const removeProfileImage = async () => {
    const response = await apiClient.delete(REMOVE_PROFILE_IMAGE_ROUTE, {
        withCredentials: true
    })

    return response;
}