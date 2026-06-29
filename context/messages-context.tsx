import { createContext, useContext, useState, ReactNode } from 'react';

export type Message = {
  id: string;
  text: string;
  sent: boolean;
};

type MessagesState = Record<string, Message[]>;

const INITIAL_MESSAGES: MessagesState = {
  '1': [
    { id: '1a', text: 'Hello Doc! Magtatanong lang po sana ako tungkol sa schedule niyo.', sent: true },
    { id: '1b', text: 'Good day! Libre ako mamayang 2:00 PM onwards.', sent: false },
    { id: '1c', text: 'Sige po Doc, copy po. Meeting tayo mamaya ah.', sent: true },
    { id: '1d', text: 'See you later!', sent: false },
  ],
  '2': [
    { id: '2a', text: 'Hello Doc! Magtatanong lang po sana ako tungkol sa schedule niyo.', sent: true },
    { id: '2b', text: 'Good day! Libre ako mamayang 2:00 PM onwards.', sent: false },
    { id: '2c', text: 'Sige po Doc, copy po. Meeting tayo mamaya ah.', sent: true },
    { id: '2d', text: 'See you later!', sent: false },
  ],
  '3': [
    { id: '3a', text: 'Hello Doc! Magtatanong lang po sana ako tungkol sa schedule niyo.', sent: true },
    { id: '3b', text: 'Good day! Libre ako mamayang 2:00 PM onwards.', sent: false },
    { id: '3c', text: 'Sige po Doc, copy po. Meeting tayo mamaya ah.', sent: true },
    { id: '3d', text: 'See you later!', sent: false },
  ],
};

type MessagesContextType = {
  getMessages: (contactId: string) => Message[];
  addMessage: (contactId: string, text: string, sent: boolean) => void;
};

const MessagesContext = createContext<MessagesContextType | null>(null);

export function MessagesProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<MessagesState>(INITIAL_MESSAGES);

  const getMessages = (contactId: string): Message[] => {
    return messages[contactId] || [];
  };

  const addMessage = (contactId: string, text: string, sent: boolean) => {
    setMessages((prev) => ({
      ...prev,
      [contactId]: [
        ...(prev[contactId] || []),
        { id: `${contactId}-${Date.now()}`, text, sent },
      ],
    }));
  };

  return (
    <MessagesContext.Provider value={{ getMessages, addMessage }}>
      {children}
    </MessagesContext.Provider>
  );
}

export function useMessages() {
  const context = useContext(MessagesContext);
  if (!context) throw new Error('useMessages must be used within MessagesProvider');
  return context;
}
