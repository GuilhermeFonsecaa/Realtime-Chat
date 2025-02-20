import { apiClient } from "@/lib/api-client"
import { Message } from "@/store/slice/chat-slice";
import { GET_CHANNEL_MESSAGES } from "@/utils/constants"

interface ApiResponse {
    messages: Message[];
  }

export const getChannelMessages = async (channelId: string):Promise<ApiResponse> => {
    const response = await apiClient.get(`${GET_CHANNEL_MESSAGES}/${channelId}`, { withCredentials: true });
    return response.data;
}