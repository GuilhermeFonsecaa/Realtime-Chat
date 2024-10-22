import { StateCreator } from "zustand"

interface UserInfo {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    image?: string;
    color?: number;
    profileSetup: boolean;
}

export interface AuthSlice {
    userInfo: UserInfo | undefined;
    setUserInfo: (userInfo: UserInfo | undefined) => void;
}

export const createAuthSlice: StateCreator<AuthSlice> = (set) => (
    {
        userInfo: undefined,
        setUserInfo: (userInfo) => set({ userInfo }),
    }
)