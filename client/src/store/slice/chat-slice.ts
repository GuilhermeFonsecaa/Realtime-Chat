import { StateCreator } from "zustand";
import { UserInfo } from "./auth-slice";

export interface Message {
  _id: string
  content: string;
  recipient: { _id: string } | string;
  sender: { _id: string } | string;
  timestamp: Date;
  messageType: string
}

export interface SelectedChatDataProps {
  _id: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  image?: string;
  color?: number;
  profileSetup: boolean;
}

export interface ChatSlice {
  selectedChatType: string | undefined;
  selectedChatData: SelectedChatDataProps | undefined;
  selectedChatMessages: Message[];
  setSelectedChatType: (selectedChatType: string | undefined) => void;
  setSelectedChatData: (selectedChatData: SelectedChatDataProps | undefined) => void;
  setSelectedChatMessages: (selectedChatMessages: Message[]) => void;
  closeChat: () => void;
  addMessage: (message: Message) => void;
}

export const createChatSlice: StateCreator<ChatSlice> = (set, get) => ({
  selectedChatType: undefined,
  selectedChatData: undefined,
  selectedChatMessages: [],
  setSelectedChatType: (selectedChatType) => set({ selectedChatType }),
  setSelectedChatData: (selectedChatData) => set({ selectedChatData }),
  setSelectedChatMessages: (selectedChatMessages) => set({ selectedChatMessages }),
  closeChat: () => set({ selectedChatData: undefined, selectedChatType: undefined }),
  addMessage: (message) => {
    const selectedChatMessages = get().selectedChatMessages;
    const selectedChatType = get().selectedChatType;
    set({
      selectedChatMessages: [
        ...selectedChatMessages, {
          ...message,
          recipient: selectedChatType === "channel" ? message.recipient : typeof message.recipient === "object" && message.recipient !== null
            ? message.recipient._id
            : message.recipient,

          sender: selectedChatType === "channel" ? message.sender : typeof message.sender === "object" && message.sender !== null
            ? message.sender._id
            : message.sender
        }
      ]
    })
  }
});