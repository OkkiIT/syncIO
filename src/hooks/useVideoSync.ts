import { RefObject, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { getCookie } from '../utils/common';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';
import { OnProgressProps } from 'react-player/types/base';

export const useVideoSync = (
  socket: Socket,
  playerRef: RefObject<ReactPlayer>
) => {
  const { id: roomId } = useParams();

  const [currentVideo, setCurrentVideo] = useState<string>('');
  const [isHost] = useState<boolean>(() => !!getCookie('roomId'));

  const syncVideo = (e: OnProgressProps) => {
    if (isHost) {
      socket.emit('syncVideo', {
        roomId,
        currentTimePlayed: e.playedSeconds,
        sendTime: Date.now(),
      });
    }
  };

  useEffect(() => {
    socket.on('syncVideo', (msg) => {
      if (!isHost) {
        const hostSendTime = msg.sendTime;
        const hostPlayerTime = +msg.currentTimePlayed;
        const currentPlayerTime = Number(
          playerRef?.current?.getCurrentTime() || 1
        );
        const receiveTime = Date.now();
        if (Math.abs(hostPlayerTime - currentPlayerTime) > 1) {
          playerRef?.current?.seekTo(
            hostPlayerTime + (Number(receiveTime) - Number(hostSendTime)) / 1000
          );
        }
      }
    });
    return () => {
      socket.off('syncVideo');
    };
  }, []);
  return {
    syncVideo,
    setCurrentVideo,
    currentVideo,
    isHost,
  };
};
