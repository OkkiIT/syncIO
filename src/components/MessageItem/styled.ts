import styled from 'styled-components';

export const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightBlack};
  padding: 5px 0;
`;

export const Avatar = styled.img`
  width: 25px;
  height: 25px;
  margin-top: 2px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 20px;
`;

export const UserName = styled.span`
  font-size: 20px;
  font-weight: bolder;
  margin-left: 10px;
`;

export const Message = styled.span`
  font-size: 18px;
  overflow-wrap: anywhere;
`;

export const MessageContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex: 1;
  padding: 0 15px;
  gap: 11px;
`;

export const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 15px;
  gap: 10px;
`;

export const MessageTime = styled.span`
  font-size: 13px;
  margin-top: 4px;
`;
