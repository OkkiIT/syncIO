import { Socket } from 'socket.io-client';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';

export const useVideoControll = (socket: Socket) => {
  const { id: roomId } = useParams();

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const playerRef = useRef<ReactPlayer>(null);

  const pauseVideo = () => {
    socket.emit('pauseVideo', {
      roomId,
      currentTimePlayed: playerRef?.current?.getCurrentTime(),
    });
  };

  const playVideo = () => {
    socket.emit('playVideo', {
      roomId,
      currentTimePlayed: playerRef?.current?.getCurrentTime(),
    });
  };

  useEffect(() => {
    socket.on('pauseVideo', () => {
      setIsPlaying(false);
      console.log('pause');
    });

    socket.on('playVideo', () => {
      console.log('play');
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
