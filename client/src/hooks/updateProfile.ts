import { apiClient } from "@/lib/api-client";
import { profileSchemaType } from "@/schema/profileSchema";
import { UPDATE_PROFILE_ROUTE } from "@/utils/constants";

export const updateProfile = async ({ email, firstName, lastName, color }: profileSchemaType) => {
    const response = await apiClient.put(UPDATE_PROFILE_ROUTE, { email, firstName, lastName, color }, { withCredentials: true });
    return response;
}

