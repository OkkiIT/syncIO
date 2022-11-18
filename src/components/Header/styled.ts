import styled from 'styled-components';
import { showUp } from '../../styles/animations';

export const Header = styled.header`
  height: 60px;
  color: ${({ theme }) => theme.colors.primaryGray};
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AppTitle = styled.h4`
  font-size: 30px;
  animation: ${showUp} 1000ms forwards;
`;
