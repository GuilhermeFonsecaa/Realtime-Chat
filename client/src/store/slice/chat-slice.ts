import { StateCreator } from "zustand";

export interface Message {
  _id: string
  content: string;
  recipient: { _id: string } | string | null;
  sender: SelectedChatDataProps | string;
  timestamp: Date;
  messageType: string
  fileUrl?: string
  channelId?: string;
}

export interface SelectedChatDataProps {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  image?: string;
  color: number;
  profileSetup?: boolean;
}

export interface ChatSlice {
  selectedChatType: string | undefined;
  selectedChatData: SelectedChatDataProps | undefined;
  selectedChatMessages: Message[];
  setSelectedChatType: (selectedChatType: string | undefined) => void;
  setSelectedChatData: (selectedChatData: SelectedChatDataProps | undefined) => void;
  setSelectedChatMessages: (selectedChatMessages: Message[]) => void;
  closeChat: () => void;
  channels: any[];
  setChannels: (channel: any) => void;
  addChannel: (channel: any) => void;
  addMessage: (message: Message) => void;
  addChannelInChannelList: (message: Message) => void
}

export const createChatSlice: StateCreator<ChatSlice> = (set, get) => ({
  selectedChatType: undefined,
  selectedChatData: undefined,
  selectedChatMessages: [],
  setSelectedChatType: (selectedChatType) => set({ selectedChatType }),
  setSelectedChatData: (selectedChatData) => set({ selectedChatData }),
  setSelectedChatMessages: (selectedChatMessages) => set({ selectedChatMessages }),
  closeChat: () => set({ selectedChatData: undefined, selectedChatType: undefined }),
  channels: [],
  setChannels: (channels) => set({ channels }),
  addChannel: (channel) => {
    const channels = get().channels;
    set({ channels: [channel, ...channels] });
  },
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
  },
  addChannelInChannelList: (message) => {
    const channels = get().channels;
    console.log(channels)
    const data = channels.find(channel => channel._id === message.channelId);
    const index = channels.findIndex((channel) => channel._id === message.channelId);
    console.log(data)
    console.log(index)
    //Se o channel for encontrado -> findIndex retorna -1 quando o elemento não é encontrado.
    if (index !== -1 && index !== undefined) {
      channels.splice(index, 1); //remove o channel da posição atual
      channels.unshift(data); //adiciona o canal ao ínicio da lista
    }
  }
});