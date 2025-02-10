import { apiClient } from "@/lib/api-client"
import { HOST } from "@/utils/constants"

export const downloadFileHook = async (fileUrl: string, onProgress?: (progress: number) => void) => {

    const response = await apiClient.get(`${HOST}/${fileUrl}`, {
        responseType: "blob",
        onDownloadProgress: (progressEvent) => {
            if (progressEvent.total) {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                onProgress?.(percentCompleted); // Chama a função de callback passando a porcentagem
            }
        },
    });

    return response.data;
}
