import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  padding: 0 15px;
`;

export const VideoPreviewImg = styled.img`
  width: 140px;
  height: 108px;
`;

export const InformationContainer = styled.div`
  padding: 10px;
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
`;

export const Button = styled.button`
  height: 20px;
  display: flex;
  gap: 10px;
  align-items: center;
  color: ${({ theme }) => theme.colors.subduedGrey};
  transition: 400ms;

  &:hover {
    color: ${({ theme }) => theme.colors.white};

    svg {
      fill: ${({ theme }) => theme.colors.white};
    }
  }

  svg {
    width: 15px;
    height: 15px;
    fill: ${({ theme }) => theme.colors.subduedGrey};
  }
`;

export const VideoName = styled.h4`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ChannelName = styled.h5`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.colors.subduedGrey};
`;
