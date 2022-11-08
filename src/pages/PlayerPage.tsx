import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import { BASE, ROOM_API } from "../api/consts";
import io from "socket.io-client";
import * as S from "./styled";
import "./kek.css";
import { ChatForm, MessageItem } from "../components";
import { useChatScroll } from "../hooks";
import { getCookie } from "../utils/common";
import { MessageItem as MessageItemType } from "../types/index";

export const socket = io(BASE);

export const PlayerPage = () => {
  const { id } = useParams();
  const [isHost] = useState<string>(() => getCookie("roomId"));
  const [isPlaying, setIsPlaying] = useState(true);
  const [userName, setUserName] = useState(() => getCookie("userName"));
  const [data, setData] = useState("");
  const [isSocketConnected, setIsSocketConnected] = useState(socket.connected);
  const playerRef = useRef<ReactPlayer>(null);
  const [messagesList, setMessagesList] = useState<MessageItemType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`${BASE}${ROOM_API}`, {
        params: { key: id },
        withCredentials: true,
      });
      setData(data.room.currentVideoLink);
      if (!userName) {
        setUserName(data.generatedUserName);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    socket.on("connect", () => {
      setIsSocketConnected(true);
      socket.emit("connectRoom", { roomId: id });
    });

    socket.on("disconnect", () => {
      setIsSocketConnected(false);
    });

    socket.on("chatMessage", (msg) => {
      setMessagesList((prev: any) => {
        return [...prev, msg];
      });
    });

    socket.on("pauseVideo", (msg) => {
      setIsPlaying(false);
      playerRef?.current?.seekTo(msg.currentTimePlayed, "seconds");
    });

    socket.on("playVideo", () => {
      setIsPlaying(true);
    });

    socket.on("syncVideo", (msg) => {
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
      socket.off("syncVideo");
      socket.off("connect");
      socket.off("disconnect");
      socket.off("msgToClient");
    };
  }, []);

  const pauseVideo = () => {
    socket.emit("pauseVideo", {
      roomId: id,
      currentTimePlayed: playerRef?.current?.getCurrentTime(),
    });
  };

  const playVideo = () => {
    socket.emit("playVideo", {
      roomId: id,
      currentTimePlayed: playerRef?.current?.getCurrentTime(),
    });
  };

  const syncVideo = (e: any) => {
    if (isHost) {
      socket.emit("syncVideo", {
        roomId: id,
        currentTimePlayed: e.playedSeconds,
        sendTime: Date.now(),
      });
    }
  };
  const containerRef = useChatScroll(messagesList);

  return (
    <S.PageContainer>
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
          url={data}
        />
      </S.PlayerWrapper>
      <S.ChatContainer>
        <S.MessageContainer ref={containerRef}>
          {messagesList?.map((item: any, index: number) => {
            return <MessageItem messageData={item} key={index} />;
          })}
        </S.MessageContainer>
        <ChatForm userName={userName} />
      </S.ChatContainer>
    </S.PageContainer>
  );
};
