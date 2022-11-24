import {
  useLoaderData,
  defer,
  Await,
  LoaderFunctionArgs,
} from 'react-router-dom';
import { Suspense } from 'react';
import axios from 'axios';
import { BASE, ROOM_API } from '../../api/consts';

import * as S from './styled';
import { useSocketInit, useVideoControl, useVideoSync } from '../../hooks';
import { PlayerTabs } from '../../components';

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
    useVideoControl(socket);

  const { syncVideo, currentVideo, setCurrentVideo, isHost } = useVideoSync(
    socket,
    playerRef
  );
  return (
    <S.PageContainer>
      <Suspense fallback={<S.SkeletonPlayerWrapper />}>
        <Await resolve={data}>
          {(resolvedData) => {
            console.log(resolvedData);
            return (
              <S.PlayerWrapper>
                <S.Player
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
      <S.TabsContainer>
        <PlayerTabs
          setCurrentVideo={setCurrentVideo}
          isHost={isHost}
          data={data}
          socket={socket}
        />
      </S.TabsContainer>
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
