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
    userInfo: UserInfo | null;
    setUserInfo: (userInfo: UserInfo | null) => void;
}

export const createAuthSlice: StateCreator<AuthSlice> = (set) => (
    {
        userInfo: null,
        setUserInfo: (userInfo) => set({ userInfo }),
    }
)