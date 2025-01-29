import { apiClient } from "@/lib/api-client"
import { HOST } from "@/utils/constants"

export const downloadFileHook = async (fileUrl: string) => {

    const response = await apiClient.get(`${HOST}/${fileUrl}`, {
        responseType: "blob"
    });

    return response.data;
}
