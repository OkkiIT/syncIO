import {
  useLoaderData,
  defer,
  Await,
  LoaderFunctionArgs,
  useParams,
} from 'react-router-dom';
import { FormEvent, Suspense, useEffect, useState } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import { BASE, ROOM_API } from '../../api/consts';

import * as S from './styled';
import './styles.css';
import {
  ChatForm,
  MessageItem,
  Playlist,
  SubmitVideoForm,
  TabsSwitcher,
  VideoCardPreview,
} from '../../components';
import {
  useSocketInit,
  useVideoChat,
  useVideoControl,
  useVideoPlaylist,
  useVideoSync,
} from '../../hooks';

interface LoaderData {
  data: {
    room: {
      currentVideoLink: string;
      key: string;
    };
    userName: string;
  };
}

export enum tabs {
  CHAT = 'CHAT',
  PLAYLIST = 'PLAYLIST',
}

export const PlayerPage = () => {
  const { data } = useLoaderData() as LoaderData;

  const [activeTab, setActiveTab] = useState<tabs>(tabs.CHAT);

  const { id: roomId } = useParams();

  const { socket } = useSocketInit();

  const { isPlaying, pauseVideo, playVideo, playerRef } =
    useVideoControl(socket);

  const { playlist, setPlaylist } = useVideoPlaylist(socket);

  const {
    syncVideo,
    currentVideo,
    changeCurrentVideo,
    isHost,
    deleteVideoFromPlaylist,
  } = useVideoSync(socket, playerRef, setPlaylist);
  const { messagesList, messageContainerRef } = useVideoChat(socket);

  return (
    <S.PageContainer>
      <Suspense fallback={<S.SkeletonPlayerWrapper />}>
        <Await resolve={data}>
          {(resolvedData) => {
            return (
              <S.PlayerWrapper>
                <ReactPlayer
                  className="react-player"
                  width="100%"
                  height="100%"
                  onProgress={syncVideo}
                  progressInterval={1000}
                  ref={playerRef}
                  onPause={pauseVideo}
                  onPlay={playVideo}
                  controls
                  playing={isPlaying}
                  url={
                    !!currentVideo
                      ? currentVideo
                      : resolvedData.room.currentVideoLink
                  }
                />
              </S.PlayerWrapper>
            );
          }}
        </Await>
      </Suspense>
      <S.ChatContainer>
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
            deleteVideoFromPlaylist={deleteVideoFromPlaylist}
            changeCurrentVideo={changeCurrentVideo}
            socket={socket}
            isHost={!!isHost}
            playlist={playlist}
          />
        )}
      </S.ChatContainer>
    </S.PageContainer>
  );
};

const dataFetch = async (key?: string) => {
  const { data } = await axios.get(`${BASE}${ROOM_API}`, {
    params: { key },
    withCredentials: true,
  });
  return data;
};

export const roomLoader = async ({
  params,
}: LoaderFunctionArgs): Promise<any> => {
  const { id } = params;
  return defer({ data: dataFetch(id) });
};
