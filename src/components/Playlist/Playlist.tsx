import * as S from './styled';
import { VideoCardPreview } from '../VideoCardPreview';
import { SubmitVideoForm } from '../SubmitVideoForm';
import { Socket } from 'socket.io-client';
import { useParams } from 'react-router-dom';
import { css } from 'styled-components';

interface PlaylistProps {
  playlist: any;
  isHost: boolean;
  changeCurrentVideo: any;
  deleteVideoFromPlaylist: any;
  addVideoToPlaylist: any;
  playlistContainerRef: any;
}

export const Playlist = ({
  playlist,
  isHost,
  changeCurrentVideo,
  deleteVideoFromPlaylist,
  playlistContainerRef,
  addVideoToPlaylist,
}: PlaylistProps) => {
  return (
    <S.Container>
      {!!playlist.length && (
        <>
          <S.CardsContainer ref={playlistContainerRef}>
            {playlist.map((item: any) => (
              <VideoCardPreview
                deleteVideoFromPlaylist={deleteVideoFromPlaylist}
                changeCurrentVideo={changeCurrentVideo}
                isHost={isHost}
                key={item.key}
                videoLink={item.videoLink}
                videoId={item.key}
                channelName={item.channelName}
                videoTitle={item.title}
                imgSrc={item.imgSrc}
              />
            ))}
          </S.CardsContainer>
          {isHost && (
            <SubmitVideoForm
              inputFormCss={css`
                border: none;
              `}
              inputCss={css`
                flex: 1;
              `}
              onSubmit={addVideoToPlaylist}
            />
          )}
        </>
      )}
      {!playlist.length && (
        <S.EmptyMessageContainer>
          <h2>Your playlist is empty.</h2>
          {isHost && (
            <SubmitVideoForm
              inputFormCss={css`
                min-width: 250px;
              `}
              inputCss={css`
                flex: 1;
              `}
              onSubmit={addVideoToPlaylist}
            />
          )}
        </S.EmptyMessageContainer>
      )}
    </S.Container>
  );
};
