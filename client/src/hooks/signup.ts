import { apiClient } from "@/lib/api-client"
import { SIGNUP_ROUTE } from "@/utils/constants"

interface SignupProps {
    email: string,
    password: string
}

export const signup = async ({ email, password }: SignupProps) => {
    const response = await apiClient.post(SIGNUP_ROUTE, { email, password });
    return response;
}