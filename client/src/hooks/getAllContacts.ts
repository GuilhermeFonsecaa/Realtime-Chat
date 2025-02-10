import { apiClient } from "@/lib/api-client"
import { GET_ALL_CONTACTS } from "@/utils/constants";

export const getAllContacts = async () => {
    const response = await apiClient.get(GET_ALL_CONTACTS, {
        withCredentials: true
    })
    return response.data;
}