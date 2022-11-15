import { ChangeEvent, FormEvent, useState } from 'react';

import * as S from './styled';
import { socket } from '../../pages/PlayerPage/PlayerPage';
import { useAsyncValue, useParams } from 'react-router-dom';
import { getSendingTime } from '../../utils/common';

export const ChatForm = () => {
  const { userName } = useAsyncValue() as { userName: string };
  const { id: roomId } = useParams();
  const [message, setMessage] = useState<string>('');

  const emptyMessage = !message.trim();

  const sendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (emptyMessage) {
      return;
    }
    const sendingTime = getSendingTime();

    socket.emit('chatMessage', { roomId, message, userName, sendingTime });
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
