import { keyframes } from "styled-components";

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
