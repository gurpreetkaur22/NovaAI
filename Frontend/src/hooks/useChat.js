import { useState } from 'react';
import axios from 'axios';

const useChat = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);

  const loadChatHistory = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/chat", {
        withCredentials: true,
      });

      if (response.data && response.data.length > 0) {
        const formattedChats = response.data.map((chat) => ({
          id: chat._id,
          title: chat.title,
          lastMessage: "Click to view messages",
          timestamp: new Date(chat.lastActivity || chat.updatedAt),
          isActive: false,
        }));

        setChatHistory(formattedChats);
      }
    } catch (error) {
      console.error("Error loading chat history:", error);
      setChatHistory([]);
    }
  };

  const loadChatMessages = async (chatId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/chat/${chatId}/messages`,
        {
          withCredentials: true,
        }
      );

      if (response.data && response.data.length > 0) {
        const formattedMessages = response.data.map((msg) => ({
          id: msg._id,
          text: msg.content,
          sender: msg.role === "user" ? "user" : "nova",
          timestamp: new Date(msg.createdAt),
        }));

        setMessages(formattedMessages);
      } else {
        setMessages([]);
      }
    } catch (error) {
      console.error("Error loading chat messages:", error);
      setMessages([]);
    }
  };

  const createNewChat = async (title) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/chat",
        { title },
        { withCredentials: true }
      );

      const newChat = {
        id: response.data._id,
        title: response.data.title,
        lastMessage: "New conversation started",
        timestamp: new Date(response.data.lastActivity),
        isActive: true,
      };

      setChatHistory((prev) => [
        newChat,
        ...prev.map((chat) => ({ ...chat, isActive: false })),
      ]);

      setCurrentChatId(response.data._id);
      setMessages([]);

      return response.data._id;
    } catch (error) {
      console.error("Error creating new chat:", error);
      throw error;
    }
  };

  const selectChat = (chatId) => {
    setChatHistory((prev) =>
      prev.map((chat) => ({
        ...chat,
        isActive: chat.id === chatId,
      }))
    );
    setCurrentChatId(chatId);
    loadChatMessages(chatId);
  };

  const updateChatHistory = (chatId, lastMessage) => {
    setChatHistory((prev) =>
      prev.map((chat) =>
        chat.id === chatId
          ? { ...chat, lastMessage, timestamp: new Date() }
          : chat
      )
    );
  };

  return {
    chatHistory,
    messages,
    currentChatId,
    setMessages,
    loadChatHistory,
    createNewChat,
    selectChat,
    updateChatHistory,
  };
};

export default useChat;