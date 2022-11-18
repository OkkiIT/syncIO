import {
  useLoaderData,
  defer,
  Await,
  LoaderFunctionArgs,
} from 'react-router-dom';
import { Suspense } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import { BASE, ROOM_API } from '../../api/consts';

import * as S from './styled';
import './styles.css';
import { ChatForm, MessageItem, SubmitVideoForm } from '../../components';
import {
  useSocketInit,
  useVideoChat,
  useVideoControll,
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

export const PlayerPage = () => {
  const { data } = useLoaderData() as LoaderData;
  const { socket } = useSocketInit();

  const { isPlaying, pauseVideo, playVideo, playerRef } =
    useVideoControll(socket);

  const { syncVideo, currentVideo, changeCurrentVideo, isHost } = useVideoSync(
    socket,
    playerRef
  );

  const { messagesList, messageContainerRef } = useVideoChat(socket);

  return (
    <S.PageContainer>
      {isHost && (
        <SubmitVideoForm
          inputFormCss={`border:none`}
          inputCss={'flex:1'}
          onSubmit={changeCurrentVideo}
        />
      )}
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
