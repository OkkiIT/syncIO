import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { useParams } from 'react-router-dom';
import {
  AddVideoToPlaylistMessage,
  BasicMessage,
  DeleteVideoFromPlaylistMessage,
  GetPlaylistData,
  PlayVideoFromPlaylistData,
  PlayVideoFromPlaylistMessage,
} from '../types/socketMessages';
import { Playlist } from '../types';

interface PlaylistParams {
  socket: Socket;
  setCurrentVideo: (value: string) => void;
}

export const usePlaylist = ({ socket, setCurrentVideo }: PlaylistParams) => {
  const { id: roomId } = useParams() as { id: string };
  const [playlist, setPlaylist] = useState<Playlist[]>([]);

  const changeCurrentVideo = (videoId: string): void => {
    const message: PlayVideoFromPlaylistMessage = { roomId, videoId };

    socket.emit('playVideoFromPlaylist', message);
  };

  const addVideoToPlaylist = (e: any, inputValue: string): void => {
    e.preventDefault();

    const message: AddVideoToPlaylistMessage = {
      roomId,
      videoLink: inputValue.trim(),
    };

    socket.emit('addVideoToPlaylist', message);
  };
  const deleteVideoFromPlaylist = (videoId: string): void => {
    const message: DeleteVideoFromPlaylistMessage = { roomId, videoId };

    socket.emit('deleteVideoFromPlaylist', message);
  };
  useEffect(() => {
    socket.on('connect', () => {
      const message: BasicMessage = { roomId };

      socket.emit('getPlaylist', message);
    });
    socket.on('playVideoFromPlaylist', (msg: PlayVideoFromPlaylistData) => {
      const {
        room: { currentVideoLink, playList },
      } = msg;

      setCurrentVideo(currentVideoLink);
      setPlaylist(playList);
    });
    socket.on('getPlaylist', (msg: GetPlaylistData) => {
      setPlaylist(msg.playlist);
    });
    socket.on('addVideoToPlaylist', (msg: GetPlaylistData) => {
      setPlaylist(msg.playlist);
    });
    socket.on('deleteVideoFromPlaylist', (msg: GetPlaylistData) => {
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
