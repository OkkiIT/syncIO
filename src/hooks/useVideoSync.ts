import { FormEvent, RefObject, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { getCookie } from '../utils/common';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';

export const useVideoSync = (
  socket: Socket,
  playerRef: RefObject<ReactPlayer>
) => {
  const [currentVideo, setCurrentVideo] = useState<string>('');
  const [isHost] = useState(() => getCookie('roomId'));

  const { id: roomId } = useParams();

  const syncVideo = (e: any) => {
    if (isHost) {
      socket.emit('syncVideo', {
        roomId,
        currentTimePlayed: e.playedSeconds,
        sendTime: Date.now(),
      });
    }
  };

  const changeCurrentVideo = (e: FormEvent, inputValue: string) => {
    e.preventDefault();
    socket.emit('changeVideo', { roomId, videoLink: inputValue.trim() });
  };

  useEffect(() => {
    socket.on('changeVideo', (msg) => {
      setCurrentVideo(msg.videoLink);
    });
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
      socket.off('changeVideo');
      socket.off('syncVideo');
    };
  }, []);
  return { syncVideo, currentVideo, changeCurrentVideo, isHost };
};
