import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  html, body {
    width: 100%;
    height: 100%;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  button {
    cursor: pointer;
    outline: none;
    background-color: transparent;
  }

  #root {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
`;
