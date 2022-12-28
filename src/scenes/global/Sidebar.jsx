/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import {
  Box, IconButton, Typography, useTheme,
} from '@mui/material';
import { Link } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import PersonIcon from '@mui/icons-material/Person';
import CodeIcon from '@mui/icons-material/Code';
import BadgeIcon from '@mui/icons-material/Badge';
import DataObjectIcon from '@mui/icons-material/DataObject';
import 'react-pro-sidebar/dist/css/styles.css';
import { tokens } from '../../theme';
import developerIcon from './icons/developer.png';
import managerIcon from './icons/manager.png';
import employeeIcon from './icons/employee.png';

// eslint-disable-next-line react/prop-types, object-curly-newline
function Item({ title, to, icon }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      style={{ color: colors.grey[100] }}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
}
function DeveloperLinks() {
  return (
    <>
      <Item
        title="Account"
        to="/"
        icon={<AccountCircleIcon />}
      />
      <Item
        title="Dashboard"
        to="/"
        icon={<HomeOutlinedIcon />}
      />
      <Item
        title="Reports"
        to="/developer-reports"
        icon={<DocumentScannerIcon />}
      />
      <Item
        title="Manager Movents"
        to="/manager-movents"
        icon={<HowToRegIcon />}
      />
      <Item
        title="Managers"
        to="/managers"
        icon={<PersonIcon />}
      />
      <Item
        title="Developers"
        to="/developers"
        icon={<PersonIcon />}
      />
      <Item
        title="Register Developer"
        to="/developer-register"
        icon={<CodeIcon />}
      />
    </>
  );
}
function ManagerLinks() {
  return (
    <>
      <Item
        title="Account"
        to="/"
        icon={<AccountCircleIcon />}
      />
      <Item
        title="Dashboard"
        to="/"
        icon={<HomeOutlinedIcon />}
      />
      <Item
        title="Employee Movents"
        to="/employee-movents"
        icon={<HowToRegIcon />}
      />
      <Item
        title="Employees"
        to="/employees"
        icon={<BadgeIcon />}
      />
    </>
  );
}
function EmployeeLinks() {
  return (
    <>
      <Item
        title="Account"
        to="/account"
        icon={<AccountCircleIcon />}
      />
      <Item
        title="Dashboard"
        to="/"
        icon={<HomeOutlinedIcon />}
      />
      <Item
        title="Reports"
        to="/employee-reports"
        icon={<DocumentScannerIcon />}
      />
      <Item
        title="Data"
        to="/data"
        icon={<DataObjectIcon />}
      />
    </>
  );
}
function Sidebar() {
  const user = useSelector((state) => state.user);
  const { userData, position } = user;
  let avatar = null;
  if (position === 'developer') {
    avatar = developerIcon;
  } else if (position === 'manager') {
    avatar = managerIcon;
  } else {
    avatar = employeeIcon;
  }
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Box
      sx={{
        '& .pro-sidebar-inner': {
          background: `${colors.primary[400]}`,
        },
        '& .pro-icon-wrapper': {
          backgroundColor: 'transparent !important',
        },
        '& .pro-inner-item': {
          padding: '5px 35px 5px 20px !important',
        },
        '& .pro-inner-item:hover': {
          color: '#868dfb !important',
        },
        '& .pro-menu-item.active': {
          color: '#6870fa !important',
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: '10px 0 20px 0',
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  Crystalin
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {/* USER */}
          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={avatar}
                  style={{ cursor: 'pointer', borderRadius: '50%' }}
                />
              </Box>
              <Box textAlign="center">
                <Typography variant="h2" color={colors.greenAccent[500]} fontWeight="bold" sx={{ m: '10px 0 0 0' }}>
                  {' '}
                  { position }
                  {' '}
                </Typography>
              </Box>
            </Box>
          )}
          {/* MENU ITEMS */}
          <Box paddingLeft={isCollapsed ? undefined : '10%'}>
            { position === 'developer' ? DeveloperLinks() : null }
            { position === 'manager' ? ManagerLinks() : null }
            { position === 'employee' ? EmployeeLinks() : null }
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
}

export default Sidebar;
