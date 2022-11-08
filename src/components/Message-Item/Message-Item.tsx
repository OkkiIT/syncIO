import * as S from "./styled";
import userImg from "./../../assets/userImg.png";

interface MessageItemProps {
  messageData: {
    userName: string;
    message: string;
    sendingTime: string;
  };
}

export const MessageItem = ({ messageData }: MessageItemProps) => {
  return (
    <S.ItemContainer>
      <S.UserInfoContainer>
        <S.Avatar src={userImg} />
        <S.UserName>{messageData.userName}</S.UserName>
      </S.UserInfoContainer>
      <S.MessageContainer>
        <S.MessageTime>{messageData.sendingTime}</S.MessageTime>
        <S.Message>{messageData.message}</S.Message>
      </S.MessageContainer>
    </S.ItemContainer>
  );
};
