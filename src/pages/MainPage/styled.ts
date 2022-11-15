import styled, { css } from 'styled-components';
import { showUp } from '../../styles/animations';

export const Wrapper = styled.main`
  width: 100%;
  height: calc(100% - 60px);
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
export const DescriptionContainer = styled.div`
  animation: ${showUp} 1000ms forwards;
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  margin-left: 15px;
  background-color: ${(props) => props.theme.colors.black};
  color: ${(props) => props.theme.colors.primaryGray};
`;

export const Input = styled.input`
  border: none;
  outline: none;
  background: transparent;
  color: ${(props) => props.theme.colors.white};

  &::placeholder {
    color: ${(props) => props.theme.colors.primaryGray};
  }

  &:focus::placeholder {
    color: ${(props) => props.theme.colors.white};
  }
`;

export const InputForm = styled.form`
  border: 1px solid ${(props) => props.theme.colors.primaryGray};

  display: flex;
  opacity: 0;
  animation: ${showUp} 1000ms forwards 500ms;
  padding: 10px 15px;
  gap: 8px;
  border-radius: 20px;
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

  ${(props) =>
    props.isYoutubeLink &&
    css`
      color: green;
      transform: rotate(180deg);
      transition: 200ms;
      padding-bottom: 7px;
    `}
`;