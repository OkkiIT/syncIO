import io from 'socket.io-client';
import { BASE } from '../api/consts';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BasicMessage } from '../types/socketMessages';

export const useSocketInit = () => {
  const { id: roomId } = useParams() as { id: string };

  const [socket] = useState(() => io(BASE));

  useEffect(() => {
    socket.on('connect', () => {
      const message: BasicMessage = { roomId };
      socket.emit('connectRoom', message);
    });

    socket.on('disconnect', () => {});

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  return { socket };
};
