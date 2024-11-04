import { apiClient } from "@/lib/api-client"
import { ADD_PROFILE_IMAGE_ROUTE } from "@/utils/constants";

export const addProfileImage = async (formData: FormData) => {

    const response = await apiClient.post(ADD_PROFILE_IMAGE_ROUTE, formData, {
        withCredentials: true
    })

    return response;
}