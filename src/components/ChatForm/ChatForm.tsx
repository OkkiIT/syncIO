import { ChangeEvent, FormEvent, useState } from 'react';

import * as S from './styled';
import { useAsyncValue, useParams } from 'react-router-dom';
import { getSendingTime } from '../../utils/common';
import { Socket } from 'socket.io-client';
import { ChatMessage } from '../../types/socketMessages';

interface ChatFormProps {
  socket: Socket;
}

export const ChatForm = ({ socket }: ChatFormProps) => {
  const { userName } = useAsyncValue() as { userName: string };
  const { id: roomId } = useParams() as { id: string };
  const [message, setMessage] = useState<string>('');

  const emptyMessage = !message.trim();

  const sendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (emptyMessage) {
      return;
    }
    const sendTime = getSendingTime();
    const chatMessage: ChatMessage = { roomId, message, userName, sendTime };
    socket.emit('chatMessage', chatMessage);
    setMessage('');
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return (
    <S.ChatForm onSubmit={sendMessage}>
      <S.ChatInput
        placeholder="Your Message"
        value={message}
        onChange={handleInputChange}
      />
      {!emptyMessage && (
        <S.SendMessageButton type="submit">Send</S.SendMessageButton>
      )}
    </S.ChatForm>
  );
};
