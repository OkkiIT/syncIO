import * as S from './styled';
import userImg from './../../assets/userImg.png';
import { MessageItem as MessageItemType } from '../../types';

interface MessageItemProps {
  messageItem: MessageItemType;
}

export const MessageItem = ({ messageItem }: MessageItemProps) => {
  const { userName, sendTime, message } = messageItem;
  return (
    <S.ItemContainer>
      <S.UserInfoContainer>
        <S.Avatar src={userImg} />
        <S.UserName>{userName}</S.UserName>
      </S.UserInfoContainer>
      <S.MessageContainer>
        <S.MessageTime>{sendTime}</S.MessageTime>
        <S.Message>{message}</S.Message>
      </S.MessageContainer>
    </S.ItemContainer>
  );
};
