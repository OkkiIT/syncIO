import { Socket } from 'socket.io-client';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const useVideoPlaylist = (socket: Socket) => {
  const { id: roomId } = useParams();

  const [playlist, setPlaylist] = useState<any>([]);

  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('getPlaylist', { roomId });
    });
    socket.on('getPlaylist', (msg) => {
      setPlaylist(msg.playlist);
    });
    socket.on('addVideoToPlaylist', (msg) => {
      setPlaylist(msg.playlist);
    });

    return () => {
      socket.off('addVideoToPlaylist');
    };
  }, []);
  return { playlist, setPlaylist };
};
