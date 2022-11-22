import styled, { css } from 'styled-components';
import { leftSideShowUp, showUp } from '../../styles/animations';

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 10px;
  opacity: 0;
  animation: ${leftSideShowUp()} 1000ms forwards 500ms;
`;

interface SwitchButtonProps {
  isActive: boolean;
}

export const SwitchButton = styled.button<SwitchButtonProps>`
  color: ${({ theme }) => theme.colors.lightBlack};
  display: flex;
  justify-content: center;
  width: 120px;
  align-items: center;
  gap: 15px;
  padding: 5px;
  transition: 400ms;
  svg {
    transition: 400ms;
    width: 20px;
    height: 20px;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.white};

    svg {
      fill: ${({ theme }) => theme.colors.white};
    }
  }

  ${({ isActive, theme }) =>
    isActive
      ? css`
          color: ${theme.colors.white};
          border-bottom: 1px solid ${theme.colors.white};

          svg {
            fill: ${({ theme }) => theme.colors.white};
          }
        `
      : css`
          color: ${theme.colors.lightBlack};

          svg {
            fill: ${({ theme }) => theme.colors.lightBlack};
          }
        `}
`;
