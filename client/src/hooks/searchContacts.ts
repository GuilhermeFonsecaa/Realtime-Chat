import { apiClient } from "@/lib/api-client"
import { UserInfo } from "@/store/slice/auth-slice";
import { SEARCH_CONTACTS_ROUTE } from "@/utils/constants"

export const searchContacts = async (search: string):Promise<{contacts: UserInfo[]}> => {
    const response = await apiClient.post(`${SEARCH_CONTACTS_ROUTE}`, { search }, { withCredentials: true });
    return response.data;
}

