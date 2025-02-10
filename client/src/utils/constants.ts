import { QueryClient } from "@tanstack/react-query";

export const HOST = import.meta.env.VITE_SERVER_URL;

export const AUTH_ROUTES = "api/auth";
export const SIGNUP_ROUTE = `${AUTH_ROUTES}/signup`;
export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`;
export const GET_USER_INFO = `${AUTH_ROUTES}/user-info`;
export const UPDATE_PROFILE_ROUTE = `${AUTH_ROUTES}/update-profile`;
export const ADD_PROFILE_IMAGE_ROUTE = `${AUTH_ROUTES}/add-profile-image`;
export const REMOVE_PROFILE_IMAGE_ROUTE = `${AUTH_ROUTES}/remove-profile-image`;
export const LOGOUT_ROUTE = `${AUTH_ROUTES}/logout`;

export const CONTACTS_ROUTES = "api/contacts";
export const SEARCH_CONTACTS_ROUTE = `${CONTACTS_ROUTES}/search`;
export const GET_DM_CONTACTS_ROUTES = `${CONTACTS_ROUTES}/get-contacts-for-dm`;
export const GET_ALL_CONTACTS = `${CONTACTS_ROUTES}/get-all-contacts`;

export const MESSAGE_ROUTE = `api/messages`;
export const GET_ALL_MESSAGES_ROUTE = `${MESSAGE_ROUTE}/get-messages`;
export const UPLOAD_FILE_ROUTE = `${MESSAGE_ROUTE}/upload-file`;

export const queryClient = new QueryClient();