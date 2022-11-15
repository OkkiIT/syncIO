import React from 'react';
import { ThemeProvider } from 'styled-components';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { PlayerPage } from './pages';
import { MainPage } from './pages';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/global-styles';
import { roomLoader } from './pages/PlayerPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainPage />} />
      <Route path="/room/:id" element={<PlayerPage />} loader={roomLoader} />
    </>
  )
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
