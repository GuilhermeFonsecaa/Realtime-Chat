import { apiClient } from "@/lib/api-client"
import { GET_DM_CONTACTS_ROUTES } from "@/utils/constants"

export const getContacts = async () => {
    const response = await apiClient.get(GET_DM_CONTACTS_ROUTES, {
        withCredentials: true
    });
    return response.data;
}
