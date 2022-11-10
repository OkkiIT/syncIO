import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { PlayerPage, roomLoader } from "./pages/PlayerPage";
import { GlobalStyles } from "./styles/global-styles";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />} />
      <Route path="/room/:id" element={<PlayerPage />} loader={roomLoader} />
    </>
  )
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <RouterProvider router={router} />
  </ThemeProvider>
);
