import { StateCreator } from "zustand";
import { UserInfo } from "./auth-slice";

export interface ChatSlice {
    selectedChatType: string | undefined;
    selectedChatData: UserInfo | undefined;
    selectedChatMessages: string[];
    setSelectedChatType: (selectedChatType: string | undefined) => void;
    setSelectedChatData: (selectedChatData: UserInfo | undefined) => void;
    setSelectedChatMessages: (selectedChatMessages: string[]) => void;
    closeChat: () => void;
  }
  
  export const createChatSlice: StateCreator<ChatSlice> = (set) => ({
    selectedChatType: undefined,
    selectedChatData: undefined,
    selectedChatMessages: [],
    setSelectedChatType: (selectedChatType) => set({ selectedChatType }),
    setSelectedChatData: (selectedChatData) => set({ selectedChatData }),
    setSelectedChatMessages: (selectedChatMessages) => set({ selectedChatMessages }),
    closeChat: () => set({ selectedChatData: undefined, selectedChatType: undefined }), // Corrigido para selectedChatType
  });