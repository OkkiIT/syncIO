import { keyframes } from 'styled-components';

export const showUp = keyframes`
  0% {
    opacity: 0.1;
    filter: blur(5px);
    transform: translateX(-30px);
  }
  100% {
    transform: translateX(0);
    opacity: 1;
    filter: none;
  }
`;

export const leftSideShowUp = (leftSide = true) => {
  return keyframes`
    0% {
      opacity: 0.1;
      filter: blur(5px);
      transform: translateX(${leftSide ? '-30px' : '30px'});
    }
    100% {
      transform: translateX(0);
      opacity: 1;
      filter: none;
    }
  `;
};

export const skeletonAnimation = `animation: skeleton-loading 700ms linear infinite alternate;
  @keyframes skeleton-loading {
    0% {
      background-color: hsl(0, 1%, 15%);
    }
    100% {
      background-color: hsl(0, 0%, 18%);
    }
  }`;
