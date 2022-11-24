import * as S from './styled';
import userImg from './../../assets/userImg.png';

interface MessageItemProps {
  messageData: {
    userName: string;
    message: string;
    sendTime: string;
  };
}

export const MessageItem = ({ messageData }: MessageItemProps) => {
  console.log(messageData);
  return (
    <S.ItemContainer>
      <S.UserInfoContainer>
        <S.Avatar src={userImg} />
        <S.UserName>{messageData.userName}</S.UserName>
      </S.UserInfoContainer>
      <S.MessageContainer>
        <S.MessageTime>{messageData.sendTime}</S.MessageTime>
        <S.Message>{messageData.message}</S.Message>
      </S.MessageContainer>
    </S.ItemContainer>
  );
};
