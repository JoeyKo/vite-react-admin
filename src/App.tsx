import * as React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Dashboard from "./routes/Dashboard";
import CssBaseline from '@mui/material/CssBaseline';
import ToggleColorMode from './components/ToggleColorMode';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Layout from './components/Layout';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

export default function App() {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout colorMode={colorMode} />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Root />,
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         path: "contacts/:contactId",
//         element: <Contact />,
//       },
//     ],
//   },
// ]);
