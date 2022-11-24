export interface BasicMessage {
  roomId: string;
}

export interface ChatMessage extends BasicMessage {
  message: string;
  userName: string;
  sendTime: string;
}

export interface PlayVideoFromPlaylistMessage extends BasicMessage {
  videoId: string;
}

export interface AddVideoToPlaylistMessage extends BasicMessage {
  videoLink: string;
}

export interface DeleteVideoFromPlaylistMessage extends BasicMessage {
  videoId: string;
}

export interface SyncVideoMessage extends BasicMessage {
  currentTimePlayed: number;
  sendTime: number;
}

export interface PauseVideoMessage extends BasicMessage {
  currentTimePlayed?: number;
}

export interface PlayVideoMessage extends BasicMessage {
  currentTimePlayed?: number;
}

export interface PlayVideoFromPlaylistData {
  room: {
    key: string;
    currentVideoLink: string;
    playList: {
      videoLink: string;
      imgSrc: string;
      key: string;
      title: string;
      channelName: string;
    }[];
  };
}

export interface GetPlaylistData {
  playlist: {
    channelName: string;
    imgSrc: string;
    key: string;
    title: string;
    videoLink: string;
  }[];
}

export interface SyncVideoData {
  sendTime: number;
  currentTimePlayed: number;
}
