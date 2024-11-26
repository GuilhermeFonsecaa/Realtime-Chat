import { apiClient } from "@/lib/api-client"
import { SelectedChatDataProps } from "@/store/slice/chat-slice";
import { SEARCH_CONTACTS_ROUTE } from "@/utils/constants"

export const searchContacts = async (search: string):Promise<{contacts: SelectedChatDataProps[]}> => {
    const response = await apiClient.post(`${SEARCH_CONTACTS_ROUTE}`, { search }, { withCredentials: true });
    return response.data;
}

