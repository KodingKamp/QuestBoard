import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { CssVarsProvider } from '@mui/joy';
import store from './store.js';
import { CreatorMode, LandingPage, GameMode } from './Pages';
import { theme } from './styles/theme.js';
import './index.scss';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />
  },
  {
    path: '/create',
    element: <CreatorMode />
  },
  {
    path: '/game',
    element: <GameMode />
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <CssVarsProvider theme={theme}>
      <RouterProvider router={router} />
    </CssVarsProvider>
  </Provider>
);
