import { Socket } from 'socket.io-client';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { PauseVideoMessage, PlayVideoMessage } from '../types/socketMessages';

export const useVideoControl = (socket: Socket) => {
  const { id: roomId } = useParams() as { id: string };

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const playerRef = useRef<ReactPlayer>(null);

  const pauseVideo = (): void => {
    const message: PauseVideoMessage = {
      roomId,
      currentTimePlayed: playerRef?.current?.getCurrentTime(),
    };
    socket.emit('pauseVideo', message);
  };

  const playVideo = (): void => {
    const message: PlayVideoMessage = {
      roomId,
      currentTimePlayed: playerRef?.current?.getCurrentTime(),
    };
    socket.emit('playVideo', message);
  };

  useEffect(() => {
    socket.on('pauseVideo', () => {
      setIsPlaying(false);
    });

    socket.on('playVideo', () => {
      setIsPlaying(true);
    });

    return () => {
      socket.off('pauseVideo');
      socket.off('playVideo');
    };
  }, []);

  return { isPlaying, pauseVideo, playVideo, playerRef };
};
//
// socket.on('pauseVideo', (msg) => {
//   setIsPlaying(false);
//   playerRef?.current?.seekTo(msg.currentTimePlayed, 'seconds');
// });
