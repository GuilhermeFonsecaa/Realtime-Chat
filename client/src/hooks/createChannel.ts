import { apiClient } from "@/lib/api-client";
import { createNewChannelType } from "@/schema/createNewChannel";
import { CREATE_CHANNEL } from "@/utils/constants";

export const createChannel = async ({ name, members }: createNewChannelType) => {
    const response = await apiClient.post(CREATE_CHANNEL, { name, members }, {
        withCredentials: true
    });

    return response;
}