import { QueryClient } from "@tanstack/react-query";

export const HOST = import.meta.env.VITE_SERVER_URL;

export const AUTH_ROUTES = "api/auth";
export const SIGNUP_ROUTE = `${AUTH_ROUTES}/signup`

export const queryClient = new QueryClient()