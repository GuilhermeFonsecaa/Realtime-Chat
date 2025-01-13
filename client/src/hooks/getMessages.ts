import { apiClient } from "@/lib/api-client"
import { Message } from "@/store/slice/chat-slice";
import { GET_ALL_MESSAGES_ROUTE } from "@/utils/constants"

interface ApiResponse {
    messages: Message[];
  }

export const getMessages = async (selectedChataDataId: string):Promise<ApiResponse> => {
    const response = await apiClient.post(GET_ALL_MESSAGES_ROUTE, { id: selectedChataDataId }, { withCredentials: true });
    return response.data;
}