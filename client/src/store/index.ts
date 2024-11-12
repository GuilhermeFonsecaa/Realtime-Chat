import { create } from "zustand"
import { AuthSlice, createAuthSlice } from "./slice/auth-slice"
import { ChatSlice, createChatSlice } from "./slice/chat-slice"

//cria uma store, passando três parâmetros: set, get e store, que seria o ...a
export const useAuthStore = create<AuthSlice>()((...a) => ({
    ...createAuthSlice(...a), //o estado e as funções retornadas por createAuthSlice são incorporados à store principal
}))

export const useChatStore = create<ChatSlice>()((...a) =>  ({
    ...createChatSlice(...a)
}));