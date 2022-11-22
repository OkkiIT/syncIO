import styled from 'styled-components';
import { leftSideShowUp } from '../../styles/animations';

export const Container = styled.div`
  animation: ${leftSideShowUp(false)} 1000ms forwards;
  flex: 1;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const EmptyMessageContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const CardsContainer = styled.div`
  flex: 1;
  overflow-y: auto;
`;
