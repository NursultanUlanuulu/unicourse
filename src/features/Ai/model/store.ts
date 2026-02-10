import { defineStore } from "pinia";
import { api } from "../api.ts";

interface Message {
  text: string;
  isUser: boolean;
}

interface Chat {
  id: number;
  title: string;
  messages: Message[];
}

interface ChatState {
  chats: Chat[];
  currentChatId: number;
  input: string;
  loading: boolean;
}

export const useChatStore = defineStore("chat", {
  state: (): ChatState => ({
    chats: [
      {
        id: 1,
        title: "Чат 1",
        messages: [{ text: "", isUser: false }],
      },
    ],
    currentChatId: 1,
    input: "",
    loading: false,
  }),
  getters: {
    currentChat(state): Chat | undefined {
      return state.chats.find((chat) => chat.id === state.currentChatId);
    },
  },
  actions: {
    setInput(value: string) {
      this.input = value;
    },
    setCurrentChatId(id: number) {
      this.currentChatId = id;
    },
    addMessage(chatId: number, message: Message) {
      const chat = this.chats.find((chat) => chat.id === chatId);
      if (chat) {
        chat.messages.push(message);
      }
    },
    addChat() {
      const newChat = {
        id: this.chats.length + 1,
        title: `Чат ${this.chats.length + 1}`,
        messages: [],
      };
      this.chats.push(newChat);
      this.currentChatId = newChat.id;
    },
    async sendMessageToOpenAI(apiKey: string, userMessage: string) {
      if (!userMessage.trim()) return;

      this.addMessage(this.currentChatId, { text: userMessage, isUser: true });
      this.setInput("");
      this.loading = true;

      try {
        const currentMessages = this.currentChat?.messages ?? [];
        const formattedMessages = currentMessages.map((msg) => ({
          role: msg.isUser ? "user" : "assistant",
          content: msg.text,
        }));

        const response = await api.sendMessageToOpenAI(
          apiKey,
          userMessage,
          formattedMessages
        );

        const botReply = response.data.choices[0].message.content;
        this.addMessage(this.currentChatId, { text: botReply, isUser: false });
      } catch (error) {
        console.error("Ошибка при запросе к OpenAI API:", error);
      } finally {
        this.loading = false;
      }
    },
    clearChat() {
      const chat = this.currentChat;
      if (chat) {
        chat.messages = [];
      }
    },
  },
});