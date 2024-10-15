import { apiClient } from "@/lib/api-client"
import { LOGIN_ROUTE } from "@/utils/constants"

interface LoginProps {
    email: string,
    password: string
}

export const login = async ({ email, password }: LoginProps) => {
    const response = await apiClient.post(LOGIN_ROUTE, { email, password }, { withCredentials: true })
    return response;
}