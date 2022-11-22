import * as S from './styled';

import { ReactComponent as PlayIcon } from '../../assets/playIcon.svg';
import { ReactComponent as DeleteIcon } from '../../assets/deleteIcon.svg';

interface VideoCardPreviewProps {
  imgSrc: string;
  videoTitle: string;
  channelName: string;
  videoLink: string;
  videoId: string;
  isHost: boolean;
  changeCurrentVideo: any;
  deleteVideoFromPlaylist: any;
}

export const VideoCardPreview = ({
  imgSrc,
  changeCurrentVideo,
  deleteVideoFromPlaylist,
  videoLink,
  videoId,
  videoTitle,
  channelName,
  isHost,
}: VideoCardPreviewProps) => {
  return (
    <S.Container>
      <S.VideoPreviewImg src={imgSrc} alt="VideoPreview" />
      <S.InformationContainer>
        <S.VideoName>{videoTitle}</S.VideoName>
        <S.ChannelName>{channelName}</S.ChannelName>
        {isHost && (
          <S.ButtonsContainer>
            <S.Button onClick={() => changeCurrentVideo(videoId)}>
              <PlayIcon />
              Play
            </S.Button>
            <S.Button onClick={() => deleteVideoFromPlaylist(videoId)}>
              <DeleteIcon />
              Delete
            </S.Button>
          </S.ButtonsContainer>
        )}
      </S.InformationContainer>
    </S.Container>
  );
};
