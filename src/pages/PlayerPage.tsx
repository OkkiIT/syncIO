import {
  useLoaderData,
  defer,
  Await,
  LoaderFunctionArgs,
} from 'react-router-dom';
import { Suspense, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import { BASE, ROOM_API } from '../api/consts';
import io from 'socket.io-client';
import * as S from './styled';
import './styles.css';
import { ChatForm, MessageItem } from '../components';
import { useChatScroll } from '../hooks';
import { getCookie } from '../utils/common';
import { MessageItem as MessageItemType } from '../types/index';

export const socket = io(BASE);

interface LoaderData {
  data: {
    room: {
      currentVideoLink: string;
      key: string;
    };
    userName: string;
  };
  roomId: string;
}

export const PlayerPage = () => {
  const { data, roomId } = useLoaderData() as LoaderData;
  const [isHost] = useState<string>(() => getCookie('roomId'));
  const [isPlaying, setIsPlaying] = useState(true);
  const playerRef = useRef<ReactPlayer>(null);
  const [messagesList, setMessagesList] = useState<MessageItemType[]>([]);

  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('connectRoom', { roomId });
    });

    socket.on('disconnect', () => {});

    socket.on('chatMessage', (msg) => {
      setMessagesList((prev: any) => {
        return [...prev, msg];
      });
    });

    socket.on('pauseVideo', (msg) => {
      setIsPlaying(false);
      playerRef?.current?.seekTo(msg.currentTimePlayed, 'seconds');
    });

    socket.on('playVideo', () => {
      setIsPlaying(true);
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
      socket.off('syncVideo');
      socket.off('connect');
      socket.off('disconnect');
      socket.off('playVideo');
      socket.off('pauseVideo');
      socket.off('chatMessage');
    };
  }, []);

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

  const syncVideo = (e: any) => {
    if (isHost) {
      socket.emit('syncVideo', {
        roomId,
        currentTimePlayed: e.playedSeconds,
        sendTime: Date.now(),
      });
    }
  };
  const messageContainerRef = useChatScroll(messagesList);

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
                  url={resolvedData.room.currentVideoLink}
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
            <ChatForm />
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
  return defer({ data: dataFetch(id), roomId: id });
};
