import styled, { css } from 'styled-components';
import { showUp } from '../../styles/animations';

export const InputForm = styled.form`
  border: 1px solid ${({ theme }) => theme.colors.primaryGray};

  display: flex;
  opacity: 0;
  animation: ${showUp} 1000ms forwards 500ms;
  padding: 10px 15px;
  gap: 8px;
  border-radius: 20px;
`;

export const Input = styled.input`
  border: none;
  outline: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.white};

  &::placeholder {
    color: ${({ theme }) => theme.colors.primaryGray};
  }

  &:focus::placeholder {
    color: ${({ theme }) => theme.colors.white};
  }
`;

interface ButtonProps {
  isYoutubeLink?: boolean;
}

export const Button = styled.button<ButtonProps>`
  width: 15px;
  height: 15px;
  color: red;
  font-size: 20px;
  background-color: transparent;
  font-weight: bolder;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 200ms;

  ${({ isYoutubeLink }) =>
    isYoutubeLink &&
    css`
      color: green;
      transform: rotate(180deg);
      transition: 200ms;
      padding-bottom: 7px;
    `}
`;
