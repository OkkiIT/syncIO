import styled from "styled-components";
import { device } from "../styles/media";

export const PageContainer = styled.div`
  background-color: ${(props) => props.theme.colors.black};
  color: ${(props) => props.theme.colors.primaryGray};
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  @media screen and ${device.lg}{
    flex-direction: row;
  }
}
`;

export const PlayerWrapper = styled.div`
  position: relative;
  padding-top: 56.25%;

  @media screen and ${device.lg} {
    flex: 1;
  }
`;

export const ChatContainer = styled.div`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  flex: 1;

  @media screen and ${device.lg} {
    max-width: 300px;
    border-left: 1px solid ${(props) => props.theme.colors.lightBlack};
  }
`;

export const MessageContainer = styled.div`
  overflow-y: auto;
  flex: 1;
`;

export const UserNameForm = styled.form`
  width: 275px;
  height: 100px;
  border: 1px solid white;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

export const UserNameFormWrapper = styled.div`
  flex: 1;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
`;
