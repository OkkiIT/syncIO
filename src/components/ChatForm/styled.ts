import styled from 'styled-components';
import { leftSideShowUp } from '../../styles/animations';

export const ChatForm = styled.form`
  animation: ${leftSideShowUp()} 1000ms forwards;
  display: flex;
  gap: 10px;
  width: 100%;
  padding: 5px 10px;
  height: 40px;
`;

export const ChatInput = styled.input`
  flex: 1;
  color: white;
  border: none;
  outline: none;
  background: transparent;

  &::placeholder {
    ${({ theme }) => theme.colors.white}
  }
`;

export const SendMessageButton = styled.button`
  padding: 0 7px;
  height: 30px;
  border: 1px solid ${({ theme }) => theme.colors.primaryGray};
  border-radius: 20px;
  color: ${({ theme }) => theme.colors.primaryGray};
`;
