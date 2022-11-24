import { TabsSwitcher } from '../TabsSwitcher';
import * as S from '../../pages/PlayerPage/styled';
import { MessageItem } from '../MessageItem';
import { Suspense, useState } from 'react';
import { Await } from 'react-router-dom';
import { ChatForm } from '../ChatForm';
import { Playlist } from '../Playlist';
import { useChatScroll, usePlaylist, useVideoChat } from '../../hooks';
import { Socket } from 'socket.io-client';

interface Interface {
  isHost: any;
  setCurrentVideo: any;
  data: any;
  socket: Socket;
}

export enum tabs {
  CHAT = 'CHAT',
  PLAYLIST = 'PLAYLIST',
}

export const PlayerTabs = ({
  setCurrentVideo,
  isHost,
  data,
  socket,
}: Interface) => {
  const [activeTab, setActiveTab] = useState<tabs>(tabs.CHAT);
  const { messagesList, messageContainerRef } = useVideoChat(socket);
  const {
    playlist,
    deleteVideoFromPlaylist,
    addVideoToPlaylist,
    changeCurrentVideo,
  } = usePlaylist({ socket, setCurrentVideo });
  const playlistContainerRef = useChatScroll(playlist);

  return (
    <>
      <TabsSwitcher activeTab={activeTab} onClick={setActiveTab} />
      {activeTab === tabs.CHAT && (
        <>
          <S.MessageContainer ref={messageContainerRef}>
            {messagesList?.map((item: any, index: number) => {
              return <MessageItem messageData={item} key={index} />;
            })}
          </S.MessageContainer>
          <Suspense fallback={<S.SkeletonChatForm />}>
            <Await resolve={data}>
              <ChatForm socket={socket} />
            </Await>
          </Suspense>
        </>
      )}
      {activeTab === tabs.PLAYLIST && (
        <Playlist
          addVideoToPlaylist={addVideoToPlaylist}
          playlistContainerRef={playlistContainerRef}
          deleteVideoFromPlaylist={deleteVideoFromPlaylist}
          changeCurrentVideo={changeCurrentVideo}
          isHost={isHost}
          playlist={playlist}
        />
      )}
    </>
  );
};
