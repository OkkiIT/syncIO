import { MessageItem } from '../types';
import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { useChatScroll } from './useChatScroll';

export const useVideoChat = (socket: Socket) => {
  const [messagesList, setMessagesList] = useState<MessageItem[]>([]);

  const messageContainerRef = useChatScroll(messagesList);

  useEffect(() => {
    socket.on('chatMessage', (msg: MessageItem) => {
      setMessagesList((prev) => {
        return [...prev, msg];
      });
    });
    return () => {
      socket.off('chatMessage');
    };
  }, []);

  return { messagesList, messageContainerRef };
};
