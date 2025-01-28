import { apiClient } from "@/lib/api-client";
import { UPLOAD_FILE_ROUTE } from "@/utils/constants";

export const UploadFile = async (file: File) => {
    if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const response = await apiClient.post(UPLOAD_FILE_ROUTE, formData, {
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data", 
            },
        });
        return response;
    }
}

