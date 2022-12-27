/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import {
  Routes, Route, useNavigate,
} from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { SnackbarProvider } from 'notistack';
import { useDispatch } from 'react-redux';
import { auth } from './firebase';
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
// self-coded
import ManagerRegisterRequests from './scenes/developer/ManagerRegisterRequests';
import ManagersList from './scenes/developer/ManagersList';
import DeveloperReports from './scenes/developer/Reports';
import DeveloperRegister from './scenes/developer/DeveloperRegister';
import DevelopersList from './scenes/developer/DevelopersList';
import EmployeesList from './scenes/manager/EmployeesList';
import EmployeeRegisterRequests from './scenes/manager/EmployeeRegisterRequests';
import { saveUser, savePosition } from './redux/user';

function App() {
  const dispatch = useDispatch();
  const [theme, colorMode] = useMode();
  const [authData, setAuthData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(saveUser(user));
        const position = localStorage.getItem('position');
        dispatch(savePosition(position));
        setAuthData(user);
        navigate('/');
      } else {
        setAuthData(null);
        navigate('/auth');
      }
    });
  }, [dispatch]);
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
                <Route path="/manager-movents" element={<ManagerRegisterRequests />} />
                <Route path="/employee-movents" element={<EmployeeRegisterRequests />} />
                <Route path="employees" element={<EmployeesList />} />
                <Route path="/managers" element={<ManagersList />} />
                <Route path="/developers" element={<DevelopersList />} />
                <Route path="/developer-reports" element={<DeveloperReports />} />
                <Route path="/developer-register" element={<DeveloperRegister />} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </SnackbarProvider>
  );
}
export default App;
