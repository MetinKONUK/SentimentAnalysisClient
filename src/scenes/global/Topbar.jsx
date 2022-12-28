/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import {
  Box, IconButton, useTheme, InputBase,
} from '@mui/material';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import { getAuth, signOut } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { ColorModeContext, tokens } from '../../theme';
import { unsaveUser } from '../../redux/user';

function Topbar() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const auth = getAuth();
  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        { null }
      </Box>
      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === 'dark' ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton onClick={() => {
          signOut(auth).then(() => {
            dispatch(unsaveUser());
          });
        }}
        >
          <LogoutIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default Topbar;
