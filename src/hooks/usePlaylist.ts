import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { useParams } from 'react-router-dom';

interface PlaylistParams {
  socket: Socket;
  setCurrentVideo: any;
}

export const usePlaylist = ({ socket, setCurrentVideo }: PlaylistParams) => {
  const { id: roomId } = useParams();
  const [playlist, setPlaylist] = useState<any>([]);
  const changeCurrentVideo = (videoId: string) => {
    socket.emit('playVideoFromPlaylist', { roomId, videoId });
  };

  const addVideoToPlaylist = (e: any, inputValue: string) => {
    e.preventDefault();
    socket.emit('addVideoToPlaylist', { roomId, videoLink: inputValue.trim() });
  };
  const deleteVideoFromPlaylist = (videoId: string) => {
    socket.emit('deleteVideoFromPlaylist', { roomId, videoId });
  };
  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('getPlaylist', { roomId });
    });
    socket.on('playVideoFromPlaylist', (msg) => {
      setCurrentVideo(msg.room.currentVideoLink);
      setPlaylist(msg.room.playList);
    });
    socket.on('getPlaylist', (msg) => {
      setPlaylist(msg.playlist);
    });
    socket.on('addVideoToPlaylist', (msg) => {
      setPlaylist(msg.playlist);
    });
    socket.on('deleteVideoFromPlaylist', (msg) => {
      setPlaylist(msg.playlist);
    });
    return () => {
      socket.off('connect');
      socket.off('playVideoFromPlaylist');
      socket.off('getPlaylist');
      socket.off('addVideoToPlaylist');
      socket.off('deleteVideoFromPlaylist');
    };
  }, []);
  return {
    playlist,
    changeCurrentVideo,
    deleteVideoFromPlaylist,
    addVideoToPlaylist,
  };
};
