import { FormEvent, RefObject, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { getCookie } from '../utils/common';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';

export const useVideoSync = (
  socket: Socket,
  playerRef: RefObject<ReactPlayer>,
  setPlaylist: any
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

  const changeCurrentVideo = (videoId: string) => {
    socket.emit('playVideoFromPlaylist', { roomId, videoId });
  };

  const deleteVideoFromPlaylist = (videoId: string) => {
    socket.emit('deleteVideoFromPlaylist', { roomId, videoId });
  };

  useEffect(() => {
    socket.on('playVideoFromPlaylist', (msg) => {
      console.log(msg);
      setCurrentVideo(msg.room.currentVideoLink);
      setPlaylist(msg.room.playList);
    });
    socket.on('deleteVideoFromPlaylist', (msg) => {
      setPlaylist(msg.playlist);
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
  return {
    syncVideo,
    currentVideo,
    changeCurrentVideo,
    isHost,
    deleteVideoFromPlaylist,
  };
};
