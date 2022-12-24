/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import {
  Routes, Route, useNavigate,
} from 'react-router-dom';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { SnackbarProvider } from 'notistack';
import { ColorModeContext, useMode } from './theme';
import Auth from './authentication/index';
import Topbar from './scenes/global/Topbar';
import Sidebar from './scenes/global/Sidebar';
import Dashboard from './scenes/dashboard';
import Team from './scenes/team/index';
import Invoices from './scenes/invoices';
import Contacts from './scenes/contacts';
import Form from './scenes/form';
import Calendar from './scenes/calendar';
import FAQ from './scenes/faq';
import Bar from './scenes/bar';
import Pie from './scenes/pie';
import Line from './scenes/line';
import Geography from './scenes/geography';
// mockdata
const loggedIn = false;

function App() {
  const [theme, colorMode] = useMode();
  const [authData, setAuthData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // eslint-disable-next-line no-console
        setAuthData(user);
        navigate('/');
      } else {
        setAuthData(null);
        navigate('/auth');
      }
    });
  }, []);
  return (
    <SnackbarProvider
      maxSnack={5}
      iconVariant={{
        success: '✅🦄🐬❤️️',
        error: '✖️🚩😱💔',
        warning: '⚠️😒',
        info: 'ℹ️🙈🙉🙊',
      }}
    >
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            {authData ? <Sidebar /> : null}
            {/* <Sidebar /> */}
            <main className="content">

              {authData ? <Topbar /> : null}
              <Routes>
                <Route exact path="/" element={<Dashboard />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/team" element={<Team />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/form" element={<Form />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/line" element={<Line />} />
                <Route path="/geography" element={<Geography />} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </SnackbarProvider>
  );
}
export default App;
