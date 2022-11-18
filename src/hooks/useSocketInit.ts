import io from 'socket.io-client';
import { BASE } from '../api/consts';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const useSocketInit = () => {
  const { id: roomId } = useParams();

  const [socket] = useState(() => io(BASE));

  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('connectRoom', { roomId });
    });

    socket.on('disconnect', () => {});

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  return { socket };
};
