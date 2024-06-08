import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';

import AssignmentIcon from '@mui/icons-material/Assignment';
import { Alarm, History, HolidayVillage, Home, HowToReg, ManageAccounts, Payment } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';

const activeStyle = {
  backgroundColor: 'rgba(0, 0, 0, 0.1)',
  color: '#1976d2',
};

export const mainListItems = (
  <React.Fragment>
    <NavLink to="/dashboard" style={({ isActive }) => (isActive ? activeStyle : undefined)} end>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItemButton>
    </NavLink>
    <NavLink to="/" style={({ isActive }) => (isActive ? activeStyle : undefined)}  >
      <ListItemButton>
        <ListItemIcon>
          <Home />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItemButton>
    </NavLink>

    <NavLink to="/dashboard/addcamps" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
    <ListItemButton>
      <ListItemIcon>
        <HolidayVillage />
      </ListItemIcon>
      <ListItemText primary="Add Camps" />
    </ListItemButton>
    </NavLink>

    <NavLink to="/dashboard/managecamps" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
    <ListItemButton>
      <ListItemIcon>
     <Alarm />
      </ListItemIcon>
      <ListItemText primary="Manage Camps" />
    </ListItemButton>
    </NavLink>
    

    <NavLink to="/dashboard/manageregisteredcampsuser" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
    <ListItemButton>
      <ListItemIcon>
        <ManageAccounts />
      </ListItemIcon>
      <ListItemText primary="Registered Camps" />
    </ListItemButton>
    </NavLink>
   
    <NavLink to="/dashboard/manageregisteredcamps" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
    <ListItemButton>
      <ListItemIcon>
        <HowToReg />
      </ListItemIcon>
      <ListItemText primary="Your Registration" />
    </ListItemButton>
    </NavLink>
    <NavLink to="/dashboard/paymenthistory" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
    <ListItemButton>
      <ListItemIcon>
      <History />
      </ListItemIcon>
      <ListItemText primary="Payment History" />
    </ListItemButton>
    </NavLink>
    <NavLink to="/dashboard/allpayment" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
    <ListItemButton>
      <ListItemIcon>
        <Payment />
      </ListItemIcon>
      <ListItemText primary="All Payment" />
    </ListItemButton>
    </NavLink>
    
    
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);